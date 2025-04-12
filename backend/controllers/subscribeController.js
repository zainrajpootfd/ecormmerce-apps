// controllers/subscribeController.js
const Subscriber = require("../models/subscriber");
const nodemailer = require("nodemailer");

const subscribeUser = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email." });
  }

  try {
    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "You’re already subscribed." });
    }

    // Save new subscriber
    await Subscriber.create({ email });

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "You're Subscribed!",
      html: `
        <h2>Thanks for joining us!</h2>
        <p>Here’s your discount code: <strong>WELCOME10</strong></p>
        <p>Stay tuned for more deals 🎉</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Subscription successful!" });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = { subscribeUser };
