import { useEffect, useState } from "react";
import Lottie from "lottie-react";

import Loadingtest1 from "./assets/lottie/Loadingtest1.json";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { toast } from "sonner";
import ToastMessage from "./components/ToastMessage";

const SpeechToText = ({
  setTranscript,
  counter,
  startRecording,
  setStartRecording,
  setPermissionGranted,
  timer,
  couponType,
  mantraType,
}) => {
  const assetsBucketUrl = import.meta.env.VITE_ASSETS_BUCKET_URL;
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const [recog, setRecog] = useState(null);

  useEffect(() => {
    if (startRecording === true) {
      if (recog) {
        recog.lang = "en-IN";
        recog.continuous = true;

        recog.onaudiostart = () => setPermissionGranted(true);

        recog.onresult = (event) => {
          let interimTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcriptPart = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              setTranscript(
                (prevTranscript) => prevTranscript + transcriptPart + " "
              );
            } else {
              interimTranscript += transcriptPart;
            }
          }
        };

        recog.onerror = (event) => {
          if (event.error === "not-allowed") {
            setPermissionGranted(false);
            setStartRecording(false);
          }
        };

        recog.onend = () => {
          setTimeout(() => {
            if (timer !== 0 || couponType === "Lakshadweep") {
              recog.start();
            } else {
              recog.stop();
              setRecog(null);
            }
          }, 200);
        };

        recog.start();
      }
    } else {
      recog?.stop();
      setRecog(null);
    }
  }, [startRecording]);

  useEffect(() => {
    if (SpeechRecognition) {
      setRecog(new SpeechRecognition());
    } else {
      toast(
        <ToastMessage text="This feature is not available in this Browser" />
      );
    }

    return () => {
      if (recog) {
        recog.stop();
        setRecog(null);
      }
    };
  }, []);

  return (
    <div className="AudioWallpaperBlock relative flex items-center gap-[12px] justify-center w-auto h-full rounded-[50%]">
      <button
        disabled={startRecording}
        onClick={() => {
          setStartRecording(true);
        }}
        className="AudioWallpaperBlock relative  flex items-center justify-center w-auto h-full rounded-[50%]"
      >
        {!startRecording && (
          <img
            src={`${assetsBucketUrl}/img/icons/iconaudio-v1.svg`}
            className="max-w-auto mx-auto w-[50px] absolute left-[50%] translate-x-[-50%] z-[2]"
          />
        )}
        <img
          src={`${assetsBucketUrl}/img/cookies/${
            mantraType() === "Cadbury Chocobakes Choc Filled Cookies"
              ? "cookie-chant-v1.png"
              : mantraType() === "Cadbury Chocobakes Choc Layered Cakes"
                ? "cake-chant-v1.png"
                : mantraType() === "Cadbury Chocobakes Choco Chip Cookies"
                  ? "chocochip-cookie-chant-v1.png"
                  : ""
          }`}
          className={`max-w-auto block mx-auto h-[200px] xxs:h-[150px] 2xl:h-[200px] max-w-[500px]  object-contain  relative z-[1]`}
        />
        {couponType !== "Lakshadweep" && (
          <span className="txtNum text-white font-proximanovaEB  text-[3vh] z-[1] absolute bottom-[5px]">
            {timer}s
          </span>
        )}
      </button>
      {startRecording && (
        <>
          <Lottie
            animationData={Loadingtest1}
            style={{
              zIndex: 9,
              position: "absolute",
              width: 100,
            }}
          />
          <CircularProgressbar
            value={
              couponType !== "Lakshadweep"
                ? (10 - counter) * 10
                : ((222 - counter) / 222) * 100
            }
            maxValue={100}
            className="absolute h-[60px] z-[99]"
            counterClockwise
            strokeWidth={5}
            styles={buildStyles({
              trailColor: "#ffffff50",
              pathColor: "#fff",
            })}
          />
        </>
      )}
    </div>
  );
};

export default SpeechToText;
