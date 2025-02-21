import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className=" py-12 px-6">
      {/* Contact Us Section */}
      <section className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-2 mt-5">
          <p className="text-3xl font-medium ">
            <span className="text-gray-400 font-light"> CONTACT</span> US
          </p>
          <hr className="w-8 h-[1.5px] bg-[#141414]" />
        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8">
          <img
            src={assets.contact_img}
            alt="About Us"
            className="w-full md:w-1/2 rounded"
          />
          <div className="md:w-1/2 text-gray-400 space-y-8 ">
            <h2>OUT STORE</h2>
            <br />
            <p>54709 Willms Station Suite 350, Washington, USA</p>
            <p className="mt-4">Tel: (415) 555‑0132</p>
            <p>Email: zain.dev@gmail.com</p>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="max-w-4xl mx-auto mt-24 text-center bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold">
          Subscribe now & get <span className="font-bold">20% off</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-0 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 px-4 py-2 rounded-l-md outline-none  sm:w-2/3"
          />
          <button className="bg-black text-white px-6 py-2 rounded-r-md hover:bg-gray-800 transition">
            SUBSCRIBE
          </button>
        </div>
      </section>
    </div>
  );
};
export default Contact;
