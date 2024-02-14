const BiscuitOption = ({ style, children, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`${style} boxOption w-full flex flex-col md:flex-row items-center justify-center cursor-pointer duration-300`}
      >
        <span
          className={`${style} w-full text-white inline-block relative z-[9] font-proximanovaEB text-[90%] md:text-[1.25vw] bg-primaryGradient1 bgOption  px-[10px] py-[8px] rounded-[30px] text-center`}
        >
          {children}
        </span>
      </button>
    </>
  );
};

export default BiscuitOption;
