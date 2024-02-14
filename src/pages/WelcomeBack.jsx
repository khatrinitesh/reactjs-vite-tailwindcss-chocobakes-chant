import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles

// BELOW COMPONENTS
import HeadTitleGolden from "../components/HeadTitleGolden";
import BtnPrimaryPurpleArrow from "../components/BtnPrimaryPurpleArrow";
import HeadTitlePurple from "../components/HeadTitlePurple";
import Cookies from "js-cookie";

const WelcomeBack = () => {
  const assetsBucketUrl = import.meta.env.VITE_ASSETS_BUCKET_URL;
  //COOKIE VALUES
  const name = Cookies.get("name");

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <>
      <div className="mainContent min-h-[calc(100vh-90px)] w-full relative  pb-[450px] md:pb-[150px] bgRadial">
        <div className="curvePurpleBlockWoShadow relative z-[9] md:pb-[300px] lg:pb-[300px] xl:pb-[250px] 2xl:pb-[400px]">
          <div
            className="leftLeave absolute top-[10px] left-[10px] md:left-[80px] "
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
          <div className="max-w-[320px] md:max-w-[600px] w-full h-full mx-auto flex items-start flex-col relative justify-center gap-[20px] py-[30px]">
            <div className="w-full logoBlock relative flex items-center justify-center flex-col mt-[-50px]">
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
                <p
                  data-aos="zoom-in"
                  className="desc hidden text-center md:block txtShadowWhiteLight text-white md:text-[1.05vw] font-proximanovaEB"
                >
                  You have already claimed your reward
                </p>
              </div>
            </div>
            <div className="wallpaper md:hidden absolute xxs:top-[180%] xs:top-[190%] left-[50%] flex items-center justify-center flex-col w-full translate-x-[-50%] translate-y-[-50%] xxs:pt-[80px] xxs4:pt-[50px] md:pt-0">
              <HeadTitlePurple style="leading-none mb-[10px] block md:hidden">
                You have already claimed your reward
              </HeadTitlePurple>
              <img
                src={`${assetsBucketUrl}/img/cookies/triplechocolate-v1.png`}
                alt=""
                className="max-w-full mx-auto block w-[300px]"
              />
              <BtnPrimaryPurpleArrow style="btnPrimaryOne block md:hidden z-[999] leading-tight">
                <span className="relative">Thanks for chanting</span>
              </BtnPrimaryPurpleArrow>
            </div>
          </div>
        </div>
        {/* S > DESKTOP */}
        <div className="hidden md:block">
          <div className="w-full h-full relative top-[-120px] lg:top-[-150px] z-[99]">
            <div className="wallpaper absolute top-[50%] left-[50%] flex items-center justify-center flex-col w-full translate-x-[-50%] translate-y-[-50%] ">
              <img
                src={`${assetsBucketUrl}/img/cookies/triplechocolate-v1.png`}
                alt=""
                className="max-w-full mx-auto block w-[600px] lg:w-[350px] 2xl:w-[600px]"
              />
              <BtnPrimaryPurpleArrow style="btnPrimaryOne hidden md:block z-[999] leading-tight">
                <span className="relative">Thanks for chanting</span>
              </BtnPrimaryPurpleArrow>
            </div>
          </div>
        </div>
        {/* E > DESKTOP */}
      </div>
    </>
  );
};

export default WelcomeBack;
