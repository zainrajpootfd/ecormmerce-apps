import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 texr-sm">
        <div>
          <img
            src={assets.logo}
            alt="logo"
            className="w-32 mb-5 cursor-pointer"
          />
          <p className="text-xl text-gray-400 w-full md:w-2/3 ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="text-gray-400 mt-10 space-y-3 cursor-pointer ">
            <li className="hover:text-black">Home</li>
            <li className="hover:text-black">About us</li>
            <li className="hover:text-black">Delivery</li>
            <li className="hover:text-black">Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="text-gray-400 mt-10 space-y-3 ">
            <li> +1 234 567 8900</li>
            <li> Support@forever.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="text-center py-5 text-sm text-gray-400">
          Copyright 2024 © Zain.dev - All Right Reserved.
        </p>
      </div>
    </div>
  );
};
export default Footer;
