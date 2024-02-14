import React, { useRef, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles;
import GoldenConfettiDesk from "../assets/lottie/golden_confettidesk.json";
import GoldenConfetti from "../assets/lottie/golden_confetti.json";
import Cookies from "js-cookie";

import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";
import ToastMessage from "../components/ToastMessage";

// BELOW COMPONENTS
import BtnSecondary from "../components/BtnSecondary";
import LottieAnimateComponent from "../components/LottieAnimateComponent";
import { useNavigate } from "react-router-dom";
import { handleApiRequests } from "../utils/handleApiRequests";
import { useDataEnrichmentStore } from "../zustand/handleDataEnrichment";

const CongratulationsLakshadweep = () => {
  const assetsBucketUrl = import.meta.env.VITE_ASSETS_BUCKET_URL;
  const recaptchaKey = import.meta.env.VITE_RECAPTCHA_KEY;
  const captchaRef = useRef(null);
  const uid = Cookies.get("uid");
  const navigate = useNavigate();

  const { changeDataEnrichmentState } = useDataEnrichmentStore();

  const [askQuestions, setAskQuestions] = useState(false);

  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [verified, setVerified] = useState(false);

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 768);

  //cookies
  const completed_chanting = Cookies.get("completed_chanting");

  const handleSharing = async () => {
    if (!navigator.share) {
      return;
    }

    try {
      await navigator.share({
        text: `Chant Cadbury Chocobakes and win amazing offers for your entire family. Chant on ${window.location.origin} & fulfill all your desires - Mondelez India`,
      });
    } catch (error) {}

    handleApiRequests({ type: "share", uid }, "/set-flag")
      .then((res) => {})
      .catch((err) => {});
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    const updateBodyClass = () => {
      setIsWideScreen(window.innerWidth > 768);
    };
    updateBodyClass();
    window.addEventListener("resize", updateBodyClass);
    return () => {
      window.removeEventListener("resize", updateBodyClass);
    };
  }, []);

  useEffect(() => {
    if (isWideScreen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isWideScreen]);

  const handleVerifyCaptcha = () => {
    setRecaptchaToken(captchaRef.current.getValue());
  };

  useEffect(() => {
    if (recaptchaToken) {
      handleApiRequests(
        {
          uid: uid,
          token: recaptchaToken,
        },
        "/unlock-grand-prize"
      )
        .then((res) => {
          if (res.success) {
            setAskQuestions(res.askQues);
            setVerified(true);
          } else {
            toast(<ToastMessage text={res.message} />);
            setVerified(false);
          }
        })
        .catch((err) => {
          toast(<ToastMessage text="Somthing went wrong" />);
        });
    }
  }, [recaptchaToken]);

  useEffect(() => {
    if (!completed_chanting) {
      navigate("/");
    }
  }, [completed_chanting]);

  return (
    <>
      <div className="mainContent w-full min-h-[calc(100vh-90px)] overflow-hidden relative bg-oopsCongratsGradient">
        <div className="h-full w-full relative z-[9]">
          <div
            className="leftLeave absolute top-[10px] left-[10px] "
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
        </div>

        {/* S > MOBILE */}
        <div className="block md:hidden w-auto min-h-full">
          <div className="px-[20px] max-w-[100%] w-full h-full mx-auto flex items-start flex-col md:flex-row justify-center py-[50px] relative bgConfetti">
            <>
              {/* S > CONFETTI LEFT TOP */}
              <div className="lottieBlock flex items-start justify-center absolute !top-[-30px] left-[-30px] z-[9]">
                <LottieAnimateComponent
                  loop={true}
                  data={GoldenConfetti}
                  style={{
                    height: 150,
                    width: 150,
                  }}
                />
              </div>
              {/* E > CONFETTI LEFT TOP */}
              {/* S > CONFETTI RIGHT BOTTOM */}
              <div className="lottieBlock flex items-center justify-center absolute bottom-[20px] right-[-30px] z-[9] rotate-[90deg]">
                <LottieAnimateComponent
                  loop={true}
                  data={GoldenConfetti}
                  style={{
                    height: 150,
                    width: 150,
                  }}
                />
              </div>
            </>
            {/* E > CONFETTI LEFT TOP */}
            <div className="bgCongrats w-full max-w-full aspect-square p-[30px] relative z-[9] flex justify-center items-end h-full">
              <img
                src={`${assetsBucketUrl}/img/cookies/triplechocolate-v1.png`}
                className="w-[70%] object-contain mb-[20%]"
                data-aos="flip-left"
              />
            </div>
            <div>
              <div className="flex gap-[10px] mt-[12px] relative z-[9999] justify-center items-center flex-col text-center">
                <p className="txt text-white font-proximanovaB text-[1.90vh]">
                  You and your family are now one step closer to winning a trip
                  to Lakshadweep
                </p>
                {verified ? (
                  <p className="txt text-tertiarycolor font-proximanovaB text-[1.90vh]">
                    Lucky draw winners will be announced on XX/XX/2024. <br />
                    Stay tuned!
                  </p>
                ) : (
                  <ReCAPTCHA
                    ref={captchaRef}
                    sitekey={recaptchaKey}
                    onChange={handleVerifyCaptcha}
                  />
                )}

                {verified && (
                  <BtnSecondary onClick={handleSharing} style=" w-auto mx-auto">
                    <span className="relative whitespace-nowrap">Share</span>
                  </BtnSecondary>
                )}
              </div>
              {askQuestions && (
                <div className="flex items-center justify-center mt-[16px]">
                  <button
                    onClick={changeDataEnrichmentState}
                    className="txtKnow inline-block text-center xl:text-left font-proximanovaB  text-white text-[2.54vh] md:text-[1.25vw] border-b-[2px] border-white border-solid"
                  >
                    Let's get to know you better.
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* E > MOBILE */}

        {/* S > DESKTOP */}
        <div className="hidden md:block w-full h-screen">
          <div className="md:max-w-[850px] xl:max-w-[1000px] container mx-auto relative h-screen">
            <div className="bgConfetti absolute top-0 left-0 w-full z-[999]">
              <div className="lottieBlock lottieBlockDesk flex items-center justify-center absolute top-[0px] left-0 z-[9]">
                <LottieAnimateComponent loop={true} data={GoldenConfettiDesk} />
              </div>
            </div>
            <div className="flex items-center md:flex-col xl:flex-row  w-full justify-center gap-[40px] h-[calc(100vh-90px)]">
              <div className="bgCongratulations relative w-full  max-w-full aspect-square  z-[9]">
                <div className="captionBlock text-center">
                  <img
                    src={`${assetsBucketUrl}/img/cookies/triplechocolate-v1.png`}
                    className="tripleChocolate md:w-[180px] lg:w-[200px] xl:w-[250px] md:mt-[290px] lg:mt-[150px] xl:mt-[250px] 2xl:mt-[200px] mx-auto"
                    data-aos="flip-left"
                  />
                </div>
              </div>
              <div className="rightContent  relative z-[999] max-w-[300px] xl:max-w-full mx-auto md:top-[-150px] lg:top-[-50px] xl:top-0">
                <div className="flex-col flex justify-center md:text-center xl:text-left gap-[20px] ">
                  <p className="txt text-white font-proximanovaB text-[3.17vh] md:text-[1.56vw]">
                    You and your family are now one step closer to winning a
                    trip to Lakshadweep
                  </p>
                  {verified ? (
                    <p className="txt text-tertiarycolor font-proximanovaB text-[3.17vh] md:text-[1.56vw]">
                      Lucky draw winners will be announced on XX/XX/2024. <br />
                      Stay tuned!
                    </p>
                  ) : (
                    <ReCAPTCHA
                      ref={captchaRef}
                      sitekey={recaptchaKey}
                      onChange={handleVerifyCaptcha}
                    />
                  )}
                </div>
                {verified && (
                  <div className="flex items-center xl:items-start justify-center xl:justify-start w-full gap-[30px] pt-[20px] flex-row pb-[40px]">
                    <BtnSecondary onClick={handleSharing} style="">
                      <span className="relative whitespace-nowrap">Share</span>
                    </BtnSecondary>
                  </div>
                )}
                {askQuestions && (
                  <div className="flex items-center justify-start">
                    <button
                      onClick={changeDataEnrichmentState}
                      className="txtKnow inline-block text-center xl:text-left font-proximanovaB  text-white text-[2.54vh] md:text-[1.25vw] border-b-[2px] border-white border-solid"
                    >
                      Let's get to know you better.
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* E > DESKTOP */}
        <div className="bottomCurve absolute bottom-0  w-full left-0 ">
          <div className="leftLeave absolute bottom-[10px] lg:bottom-[140px] left-[10px] ">
            <img
              src={`${assetsBucketUrl}/img/leaves/icon1-v1.png`}
              alt=""
              className="max-w-full block mx-auto rotate-[180deg] relative w-[50px] md:w-[70px]"
            />
          </div>
          <div className="rightLeave absolute bottom-[10px] lg:bottom-[140px] right-[10px]">
            <img
              src={`${assetsBucketUrl}/img/leaves/icon2-v1.png`}
              alt=""
              className="max-w-full block rotate-[180deg] relative w-[50px] md:w-[70px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CongratulationsLakshadweep;
