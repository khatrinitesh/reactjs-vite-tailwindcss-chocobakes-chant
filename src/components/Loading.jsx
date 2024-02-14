import React from "react";

const Loading = () => {
  return (
    <>
      <div className="h-screen fixed  inset-[0] flex flex-col gap-[12px] items-center justify-center z-[9999] bg-tertiarycolor">
        <div className="loader-animation"></div>

        <p className="font-proximanovaB text-[#6242b1] text-[2vh]">
          Loading, Please Wait...
        </p>
      </div>
    </>
  );
};

export default Loading;
