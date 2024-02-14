import React, { useEffect } from "react";

const BtnSecondaryArrow = ({ onClick, style, children }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`${style} btnSecondaryArrow text-primarycolor bg-white flex items-center justify-center font-proximanovaB font-bold border-solid border-[2px] border-tertiarycolor rounded-[12px] text-[2.3vh] md:text-[.9vw] px-[10px] md:px-[20px] py-[5px] text-center relative shadow-btnPrimaryBlackShadow`}
      >
        <span className="arrowtrianglel arrowtriangle"></span>
        <span className="arrowtriangler arrowtriangle"></span>
        {children}
      </button>
    </>
  );
};

export default BtnSecondaryArrow;
