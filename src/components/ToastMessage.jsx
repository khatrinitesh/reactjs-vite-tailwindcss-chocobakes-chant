import React from "react";

const ToastMessage = ({ text }) => {
  return (
    <div className="w-full relative">
      <p className="text-[#6242b1] text-center font-bold w-full md:text-[14px] text-[12px]">
        {text}
      </p>
    </div>
  );
};

export default ToastMessage;
