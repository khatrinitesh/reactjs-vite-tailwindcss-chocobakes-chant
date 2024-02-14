import React from "react";
import ClickLoading from "./ClickLoading";

const BtnPrimaryWithBorderGolden = ({ style, data, onClick, loading }) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={loading}
        className={`${style} min-w-[120px] disabled:opacity-50 tracking-[1px] text-tertiarycolor shadow-btnPrimaryWhiteGoldenArrow border-solid border-[1px] border-[#ffc945] btnPrimaryWithBorder text-[2.63vh] md:text-[1.25vw] outline-none font-proximanovaEB px-[60px] py-[10px] rounded-[30px] text-center`}
      >
        {loading ? <ClickLoading /> : <p>{data}</p>}
      </button>
    </>
  );
};

export default BtnPrimaryWithBorderGolden;
