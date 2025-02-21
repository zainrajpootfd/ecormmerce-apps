import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row  border border-gray-400">
      {/* lEFT SIDE */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="text-sm font-medium md:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className="text-3xl  font-light lg:text-4xl py-5 prata-regular">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <img src={assets.hero_img} alt="" className="w-full sm:w-1/2" />
    </div>
  );
};
export default Hero;
