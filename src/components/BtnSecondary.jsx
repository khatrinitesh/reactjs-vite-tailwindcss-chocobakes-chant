import React, { useEffect } from "react";
import ClickLoading from "./ClickLoading";

const BtnSecondary = ({ onClick, style, children, loading }) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={loading}
        className={`${style} min-w-[120px] btnSecondary text-primarycolor bg-tertiarycolor3 flex items-center justify-center font-proximanovaEB font-bold border-solid border-[2px] border-primarycolor2  rounded-[12px] text-[2.1vh] md:text-[1.25vw] px-[10px] md:px-[20px] py-[10px] text-center relative shadow-btnPrimaryBlackShadow`}
      >
        <span className="arrowtrianglel arrowtriangle"></span>
        <span className="arrowtriangler arrowtriangle"></span>
        {loading ? <ClickLoading /> : <>{children}</>}
      </button>
    </>
  );
};

export default BtnSecondary;
