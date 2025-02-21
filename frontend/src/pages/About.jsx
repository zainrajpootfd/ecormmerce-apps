import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className=" py-12 px-6">
      {/* About Us Section */}
      <section className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-2 mt-5">
          <p className="text-3xl font-medium ">
            <span className="text-gray-400 font-light"> ABOUT</span> US
          </p>
          <hr className="w-8 h-[1.5px] bg-[#141414]" />
        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center gap-8">
          <img
            src={assets.about_img}
            alt="About Us"
            className="w-full md:w-1/2 rounded"
          />
          <div className="md:w-1/2 text-gray-400 space-y-8 ">
            <p>
              Forever was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with a
              simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes.
            </p>
            <br />
            <p>
              Since our inception, we've worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </p>
            <p className="mt-4">
              <span className="font-bold">Our Mission</span>
              <br />
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-6xl mx-auto mt-16">
        <h2 className="text-3xl font-semibold text-gray-900 text-center">
          WHY <span className="font-bold">CHOOSE US</span>
          <hr className="w-16 h-1 bg-black mx-auto mt-2" />
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <h3 className="font-semibold text-lg">QUALITY ASSURANCE</h3>
            <p className="text-gray-600 mt-2">
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <h3 className="font-semibold text-lg">CONVENIENCE</h3>
            <p className="text-gray-600 mt-2">
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <h3 className="font-semibold text-lg">
              EXCEPTIONAL CUSTOMER SERVICE
            </h3>
            <p className="text-gray-600 mt-2">
              Our team of dedicated professionals is here to assist you,
              ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="max-w-4xl mx-auto mt-16 text-center bg-white p-8 shadow-md rounded-lg">
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

export default About;
