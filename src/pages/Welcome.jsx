import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles

// BELOW COMPONENTS
import HeadTitleGolden from "../components/HeadTitleGolden";
import BtnPrimaryPurpleArrow from "../components/BtnPrimaryPurpleArrow";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const assetsBucketUrl = import.meta.env.VITE_ASSETS_BUCKET_URL;

  //COOKIE VALUES
  const name = Cookies.get("name");
  const coupon = JSON.parse(
    Cookies.get("coupon") ? Cookies.get("coupon") : null
  );
  const grandPrize = JSON.parse(
    Cookies.get("grandPrize") ? Cookies.get("grandPrize") : null
  );

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (coupon !== null && grandPrize) {
        navigate("/welcome-back", { replace: true });
      }
    }, 100);
  }, [coupon, grandPrize]);

  return (
    <>
      <div className="mainContent min-h-[calc(100vh-90px)] w-full relative  pb-[450px] md:pb-[150px] bgRadial">
        <div className="curvePurpleBlockWoShadow relative z-[9] md:pb-[300px] xl:pb-[250px] 2xl:pb-[400px]">
          <div
            className="leftLeave absolute top-[10px] left-[10px] md:left-[80px]"
            data-aos="fade-down"
          >
            <img
              src={`${assetsBucketUrl}/img/leaves/icon1-v1.png`}
              alt=""
              className="max-w-full block mx-auto rotate-[-80deg] relative w-[50px]"
            />
          </div>
          <div
            className="rightLeave absolute top-[10px] right-[10px] md:right-[80px]"
            data-aos="fade-down"
          >
            <img
              src={`${assetsBucketUrl}/img/leaves/icon2-v1.png`}
              alt=""
              className="max-w-full block rotate-[80deg] relative w-[50px]"
            />
          </div>
          <div className="max-w-[320px]  md:max-w-[600px] w-full h-full mx-auto flex items-start flex-col relative justify-center gap-[30px] py-[30px]">
            <div className="w-full logoBlock  relative flex items-center justify-center flex-col mt-[-50px]">
              <div
                className="flex items-center justify-center  text-center relative flex-col"
                data-aos="zoom-in"
              >
                <img
                  src={`${assetsBucketUrl}/img/logos/logo1-v1.png`}
                  alt=""
                  className="max-w-full block mx-auto object-cover h-[130px] xs1:h-[150px]"
                />
                <HeadTitleGolden
                  style="!text-[4.2vh] !md:text-[2vw]"
                  data={`Welcome back, ${name}!`}
                />
              </div>
              <div className="flex items-center justify-center w-full md:hidden flex-col">
                <BtnPrimaryPurpleArrow
                  onClick={() => {
                    navigate("/select-chant");
                  }}
                  style="btnPrimaryOne relative top-[50px] z-[999] leading-tight"
                >
                  <span className="relative">Continue</span>
                </BtnPrimaryPurpleArrow>
              </div>
            </div>
            <div className="md:hidden absolute wallpaper xxs:top-[170%] xs:top-[190%] left-[50%] flex items-center justify-center flex-col w-full translate-x-[-50%] translate-y-[-80%]">
              <img
                src={`${assetsBucketUrl}/img/cookies/triplechocolate-v1.png`}
                alt=""
                className="max-w-full mx-auto block w-full"
              />
            </div>
          </div>
        </div>
        {/* S > DESKTOP */}
        <div className="hidden md:block">
          <div className=" w-full h-full relative top-[-120px] lg:top-[-250px] xl:top-[-160px]  z-[99] ">
            <div className="wallpaper absolute top-[50%] left-[50%] flex items-center justify-center flex-col w-full translate-x-[-50%] translate-y-[-50%]">
              <img
                src={`${assetsBucketUrl}/img/cookies/triplechocolate-v1.png`}
                alt=""
                className="max-w-full mx-auto block w-[600px] lg:w-[350px] 2xl:w-[600px]"
              />
              <BtnPrimaryPurpleArrow
                disabled={coupon && grandPrize}
                onClick={() => {
                  navigate("/select-chant");
                }}
                style="btnPrimaryOne hidden md:block z-[999] leading-tight"
              >
                <span className="relative">Continue</span>
              </BtnPrimaryPurpleArrow>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
