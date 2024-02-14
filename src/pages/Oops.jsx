import React, { useEffect } from "react";
import AOS from "aos";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import { IconMoodSad } from "@tabler/icons-react";

// BELOW COMPONENTS
import HeadTitle from "../components/HeadTitle";
import TextDescYellow from "../components/TextDescYellow";
import BtnSecondary from "../components/BtnSecondary";
import Header from "../components/Header";

const Oops = () => {
  const assetsBucketUrl = import.meta.env.VITE_ASSETS_BUCKET_URL;
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth > 992;
      document.body.classList.toggle("overflow-hidden", isMobile);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="mainContent h-[calc(100vh-90px)] w-full relative bg-oopsCongratsGradient">
        <>
          <div
            className="leftLeave absolute top-[10px] left-[10px]"
            data-aos="fade-down"
          >
            <img
              src={`${assetsBucketUrl}/img/leaves/icon1-v1.png`}
              alt=""
              className="max-w-full block mx-auto rotate-[-80deg] relative w-[50px] md:w-[70px]"
            />
          </div>
          <div
            className="rightLeave absolute top-[10px] right-[10px]"
            data-aos="fade-down"
          >
            <img
              src={`${assetsBucketUrl}/img/leaves/icon2-v1.png`}
              alt=""
              className="max-w-full block rotate-[80deg] relative w-[50px] md:w-[70px]"
            />
          </div>
          <div className="leftLeave absolute bottom-[10px] left-[10px] ">
            <img
              src={`${assetsBucketUrl}/img/leaves/icon1-v1.png`}
              alt=""
              className="max-w-full block mx-auto rotate-[180deg] relative w-[50px] md:w-[70px]"
            />
          </div>
          <div className="rightLeave absolute bottom-[10px] right-[10px]">
            <img
              src={`${assetsBucketUrl}/img/leaves/icon2-v1.png`}
              alt=""
              className="max-w-full block rotate-[180deg] relative w-[50px] md:w-[70px]"
            />
          </div>
        </>
        <div className="flex flex-col gap-8 justify-center items-center w-full h-full">
          <div className="flex flex-col gap-4">
            <div className="text-center justify-center flex flex-col items-center md:flex-row gap-[5px] md:gap-[20px]">
              <div className="face" data-aos="zoom-in">
                <IconMoodSad color="#ffffff" size={64} />
              </div>
              <HeadTitle style="text-[5vh] md:text-[4vw]" data="Oh no!" />
            </div>
            <h3
              data-aos="fade-up"
              className="text-center text-[3vh] leading-none md:text-[1.56vw] subtitle txtShadowWhiteLight text-white font-proximanovaEB"
            >
              Your submission has been unsuccessful.
            </h3>
          </div>
          <div>
            <BtnSecondary onClick={() => navigate(-1)}>
              <p>Retry</p>
            </BtnSecondary>
          </div>
        </div>
      </div>
    </>
  );
};

export default Oops;
