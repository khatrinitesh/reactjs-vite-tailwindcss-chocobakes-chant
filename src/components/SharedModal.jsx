import React, { useEffect } from "react";

const SharedModal = ({ children, changeState, style, showCancelBtn }) => {
  const assetsBucketUrl = import.meta.env.VITE_ASSETS_BUCKET_URL;

  useEffect(() => {
    const handleResize = () => {
      document.body.classList.add("overflow-hidden");
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        onClick={changeState}
        className={`${style} overlay fixed bg-bgTransparent inset-[0] w-full h-full`}
      ></div>
      <div
        className={`max-w-[350px] w-[90%] rounded-[20px] p-[20px] bg-primaryGradient1 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-tertiarycolor btnPrimaryWhiteGoldenArrow border-[1.2px] ${style} `}
      >
        {showCancelBtn && (
          <button
            onClick={changeState}
            className="absolute top-[-10px] border-[1.2px] border-tertiarycolor right-[-10px] bg-primarycolor w-[40px] h-[40px] rounded-[50%] flex items-center justify-center p-[10px]"
          >
            <img
              src={`${assetsBucketUrl}/img/icons/icon-white-close-v1.png`}
              alt=""
            />
          </button>
        )}
        {children}
      </div>
    </>
  );
};

export default SharedModal;
