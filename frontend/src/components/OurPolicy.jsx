import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-12 sm:gap-2 items-center justify-around py-28">
      <div className=" flex flex-col  items-center justify-between">
        <img
          src={assets.exchange_icon}
          alt="exchange-icon"
          className="w-12 pb-5"
        />
        <p className="text-base sm:text-xl font-medium">Easy Exchange Policy</p>
        <p className="text-gray-400 ">We offer hassle free exchange policy</p>
      </div>
      <div className=" flex flex-col  items-center justify-between">
        <img
          src={assets.quality_icon}
          alt="exchange-icon"
          className="w-12 pb-5"
        />
        <p className="text-base sm:text-xl font-medium">7 Days Return Policy</p>
        <p className="text-gray-400 ">We provide 7 days free return policy </p>
      </div>
      <div className=" flex flex-col  items-center justify-between">
        <img
          src={assets.support_img}
          alt="exchange-icon"
          className="w-12 pb-5"
        />
        <p className="text-base sm:text-xl font-medium">
          Best Customer Support
        </p>
        <p className="text-gray-400 ">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};
export default OurPolicy;
