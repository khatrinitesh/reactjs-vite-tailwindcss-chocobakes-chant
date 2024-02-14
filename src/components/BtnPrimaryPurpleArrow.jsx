import React from "react";
import ClickLoading from "./ClickLoading";

const BtnPrimaryPurpleArrow = ({
  onClick,
  style,
  children,
  disabled,
  loading,
}) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`${style} min-w-[120px] disabled:opacity-50 btnPrimaryPurple bg-primarycolor text-white flex items-center justify-center font-proximanovaEB font-bold  rounded-[12px] text-[2.23vh] md:text-[2.73vh] border-[2px] border-solid border-tertiarycolor px-[20px] py-[15px] text-center relative txtShadowWhiteLight tracking-wide shadow-btnPrimaryBlackShadow`}
      >
        <span className="arrowtrianglel arrowtriangle"></span>
        <span className="arrowtriangler arrowtriangle"></span>
        {loading ? <ClickLoading /> : <>{children}</>}
      </button>
    </>
  );
};

export default BtnPrimaryPurpleArrow;
