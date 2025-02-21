const Title = ({ text1, text2 }) => {
  return (
    <div className="flex items-center flex-col gap-2 pt-2">
      <div className="inline-flex  items-center gap-2 ">
        <p className=" text-xl sm:text-3xl text-gray-500 py-2 ">
          {text1} <span className="text-gray-900 font-bold">{text2}</span>
        </p>
        <p className="w-8 sm:w-11 h-[2px] bg-[#414141]"></p>
      </div>
      {/* <p className="w-3/4 text-center text-base  font-light text-gray-400">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the.
      </p> */}
    </div>
  );
};
export default Title;
