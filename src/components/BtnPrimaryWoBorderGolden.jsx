import React from "react";
import ClickLoading from "./ClickLoading";

const BtnPrimary = ({ style, data, onClick, loading }) => {
  return (
    <>
      <button
        disabled={loading}
        onClick={onClick}
        className={`${style} min-w-[120px] disabled:opacity-50 shadow-btnPrimaryShadow bg-btnPrimaryRounded text-white text-[2.73vh] md:text-[1.14vw] font-proximanovaEB font-semibold flex items-center justify-center px-[80px] md:py-[15px] py-[10px] !rounded-[50px] text-center txtShadowWhiteLight`}
      >
        {loading ? <ClickLoading /> : <p>{data}</p>}
      </button>
    </>
  );
};

export default BtnPrimary;
