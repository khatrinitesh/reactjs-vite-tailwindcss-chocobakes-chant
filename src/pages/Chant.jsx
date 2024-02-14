import React, { useEffect, useState } from "react";
// BELOW CODE LIBRARY
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles
import { stringSimilarity } from "string-similarity-js";
import { useLocation, useNavigate } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import Cookies from "js-cookie";

// BELOW COMPONENTS

// BELOW IMAGES FILES
import ChantMantraSectionTitle from "../components/ChantMantraSectionTitle";
import SpeechToText from "../SpeechToText";
import PermissionDenied from "../components/PermissionDenied";
import ScreentimeOutPopup from "../components/ScreentimeOutPopup";

const Chant = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const assetsBucketUrl = import.meta.env.VITE_ASSETS_BUCKET_URL;

  const couponType = Cookies.get("couponType");
  const [similarity, setSimilarity] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [counter, setCounter] = useState(
    couponType === "Lakshadweep" ? 222 : 10
  );
  const [startRecording, setStartRecording] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(null);
  const [displayPermissionModal, setDisplayPermissionModal] = useState(false);
  const [showScreentimeOutPopup, setShowScreentimeOutPopup] = useState(false);
  const [timer, setTimer] = useState(75);

  const acceptedRate = 50;

  const mantraType = location.pathname.slice(7);

  const handleMantraType = () => {
    if (mantraType === "choc-filled") {
      return "Cadbury Chocobakes Choc Filled Cookies";
    } else if (mantraType === "choc-layered") {
      return "Cadbury Chocobakes Choc Layered Cakes";
    } else if (mantraType === "choco-chip") {
      return "Cadbury Chocobakes Choco Chip Cookies";
    } else {
      return "";
    }
  };

  const handleCheckSimilarity = () => {
    if (timer !== 0) {
      const similarityScore = stringSimilarity(handleMantraType(), transcript);
      setSimilarity((similarityScore * 100).toFixed(2));
      setTranscript("");
    }
  };

  const handleDecreamentCounter = () => {
    if (timer !== 0) {
      setCounter(counter - 1);
    }
  };

  const handleUnlockCoupon = () => {
    Cookies.set("mantraType", handleMantraType());
    window.location.replace(`${window.location.origin}/congratulations`);
  };

  const handleUnlockCouponForLakshadweep = () => {
    Cookies.set("mantraType", handleMantraType());
    window.location.replace(
      `${window.location.origin}/congratulations-lakshadweep`
    );
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
    const handleResize = () => {
      if (window.innerWidth < 768) {
        document.body.classList.remove("overflow-hidden");
      } else {
        document.body.classList.add("overflow-auto");
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      setStartRecording(false);
    };
  }, []);

  useEffect(() => {
    if (transcript !== "") {
      handleCheckSimilarity();
    }
  }, [transcript]);

  useEffect(() => {
    if (similarity >= acceptedRate && counter > 0) {
      handleDecreamentCounter();
    }
  }, [similarity]);

  useEffect(() => {
    if (permissionGranted === false) {
      setDisplayPermissionModal(true);
    } else if (permissionGranted === true) {
      setDisplayPermissionModal(false);
    } else {
      return;
    }
  }, [permissionGranted]);

  useEffect(() => {
    if (counter === 0) {
      setStartRecording(false);
      setTimer(0);
    }

    if (timer === 0) {
      setStartRecording(false);
    }

    if (counter === 0) {
      const minutes = 3;
      const expires = minutes / (24 * 60);

      Cookies.set("completed_chanting", true, { expires });

      if (couponType === "Lakshadweep") {
        handleUnlockCouponForLakshadweep();
      } else {
        handleUnlockCoupon();
      }
    }
  }, [counter, timer]);

  useEffect(() => {
    if (startRecording && permissionGranted && couponType !== "Lakshadweep") {
      const timerInterval = setInterval(() => {
        setTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [startRecording, permissionGranted, couponType]);

  useEffect(() => {
    if (startRecording && permissionGranted) {
      const intervalId = setInterval(() => {
        setShowScreentimeOutPopup(true);
      }, 30000);

      return () => clearInterval(intervalId);
    }
  }, [startRecording, permissionGranted]);

  useEffect(() => {
    if (timer === 0 && counter !== 0) {
      window.location.assign(`${window.location.origin}/oops`);
    }
  }, [timer, counter]);

  return (
    <>
      <div className="mainContent min-h-[calc(100dvh-90px)] overflow-hidden w-full relative bgChantWallpaper">
        <div className="curveChant  w-full relative z-[9] py-[10px]">
          <div
            className="leftLeave absolute top-[10px] left-[10px] "
            data-aos="fade-down"
          >
            <img
              src={`${assetsBucketUrl}/img/leaves/iconleaveyellow-v1.svg`}
              alt=""
              className="hidden md:block max-w-full mx-auto rotate-[-80deg] relative w-[50px] md:w-[70px] "
            />
            <img
              src={`${assetsBucketUrl}/img/leaves/icon1-v1.png`}
              alt=""
              className="max-w-full block md:hidden mx-auto rotate-[-80deg] relative w-[50px] md:w-[70px] "
            />
          </div>
          <div
            className="rightLeave absolute top-[10px] right-[10px]"
            data-aos="fade-down"
          >
            <img
              src={`${assetsBucketUrl}/img/leaves/iconleaveyellow-v1.svg`}
              alt=""
              className="max-w-full hidden md:block rotate-[360deg] relative w-[50px] md:w-[70px] "
            />
            <img
              src={`${assetsBucketUrl}/img/leaves/icon2-v1.png`}
              alt=""
              className="max-w-full block md:hidden rotate-[-260deg] relative w-[50px] md:w-[70px] "
            />
          </div>

          {/* S > SECTION TITLE  */}
          <div className="max-w-[360px] py-[10px] md:py-[30px] md:p-0 md:max-w-[600px] xl:max-w-[1000px] w-full h-full mx-auto flex items-start flex-col relative justify-center">
            <ChantMantraSectionTitle
              startRecording={startRecording}
              counter={counter}
              couponType={couponType}
              timer={timer}
            />
          </div>
          {/* E > SECTION TITLE  */}
        </div>

        <div className="max-w-full gap-[20px] pt-[20px] md:pt-0 md:gap-[10px] md:max-w-[600px] xl:max-w-[1000px] w-full h-full mx-auto flex items-center flex-col relative justify-center">
          <p className="text-center font-proximanovaEB text-[#6543b0] text-[3.5vh] md:text-[5vh]">
            {counter} chants to go
          </p>

          <div className="w-full gap-[40px] h-full relative items-center flex flex-col justify-center md:py-[20px]">
            <SpeechToText
              setTranscript={setTranscript}
              counter={counter}
              startRecording={startRecording}
              setStartRecording={setStartRecording}
              setPermissionGranted={setPermissionGranted}
              timer={timer}
              setTimer={setTimer}
              couponType={couponType}
              setCounter={setCounter}
              mantraType={handleMantraType}
            />

            <div className="flex w-full flex-col justify-center items-center gap-[8px]">
              <div className="text-center bg-[#ffffff] shadow-btnPrimaryShadow clipped-div marqueeBlock md:rounded-[50px] px-[10px] py-[10px] w-full flex items-center justify-center">
                <span
                  data-text={handleMantraType()}
                  className={`font-proximanovaEB text-[2.1039671682626535vh] md:text-[3.1039671682626535vh] text-[#ceced0] ${
                    similarity >= acceptedRate && "green_blink"
                  } ${
                    similarity < acceptedRate && similarity > 0 && "red_blink"
                  } white_blink ${setTimeout(() => {
                    setSimilarity(0);
                  }, 1500)}`}
                >
                  {handleMantraType()}
                </span>
              </div>
              <div className="px-2 text-center text-[3.5vw] sm1:text-[16px]">
                <span className="text-[#7647b1] font-proximanovaEB">
                  Wait for above chant to turn red or green before you repeat.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bottomCurve fixed md:absolute  bottom-[0]  w-full left-0 z-[999]">
          <div className="leftLeave absolute bottom-[10px] left-[10px] z-[9] hidden md:block">
            <img
              src={`${assetsBucketUrl}/img/leaves/iconleaveyellow-v1.svg`}
              alt=""
              className="max-w-full block mx-auto rotate-[180deg] relative md:w-[70px] w-[50px]"
            />
          </div>

          <div className="rightLeave absolute bottom-[10px] right-[10px]  z-[9] hidden md:block">
            <img
              src={`${assetsBucketUrl}/img/leaves/iconleaveyellow-v1.svg`}
              alt=""
              className="max-w-full block rotate-[-280deg] relative md:w-[70px] w-[50px]"
            />
          </div>
        </div>
      </div>

      {displayPermissionModal && <PermissionDenied />}

      {showScreentimeOutPopup && (
        <ScreentimeOutPopup
          changeState={() => {
            setShowScreentimeOutPopup(false);
          }}
        />
      )}
    </>
  );
};

export default Chant;
