import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// BELOW COMPONENTS
import MediumHeadTitle from "./MediumHeadTitle";
import OtpNum from "./OtpNum";
import BtnPrimaryWithBorderGolden from "./BtnPrimaryWithBorderGolden";
import ToastMessage from "./ToastMessage";
import SharedModal from "./SharedModal";
import { handleApiRequests } from "../utils/handleApiRequests";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

//ZUSTAND STATES
import { useEnterNumberModalStore } from "../zustand/handleEnterNumberModal";
import { useOtpModalStore } from "../zustand/handleOtpModal";

const EnterOTPNum = ({
  personData,
  handleOnChange,
  setShouldNavigateToWelcomePage,
}) => {
  const navigate = useNavigate();
  const [otpEntered, setOtpEntered] = useState(["", "", "", ""]);
  const joinedOtp = otpEntered.join("");
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [resendSendBefore, setResendSendBefore] = useState(false);

  const hscKey = import.meta.env.VITE_HUBSPOT_HSC_KEY;

  //ZUSTAND STATES
  const { changeOtpModalState } = useOtpModalStore();
  const { enterNumberModal, enterNumberModalState } =
    useEnterNumberModalStore();

  const handleSubmit = () => {
    if (joinedOtp.length !== 0) {
      if (joinedOtp.length === 4) {
        if (timeRemaining > 0) {
          if (enterNumberModal) {
            handleSubmitLogin();
          } else {
            handleSubmitRegistration();
          }
        } else {
          toast(<ToastMessage text="Time's up, try Resend" />);
        }
      } else {
        toast(<ToastMessage text="Enter valid OTP" />);
      }
    } else {
      toast(<ToastMessage text="Enter OTP" />);
    }
  };

  const handleSubmitLogin = () => {
    const { mobile, token, otp } = personData;

    setLoading(true);
    handleApiRequests({ mobile, token, otp }, "/login")
      .then((res) => {
        if (res.success) {
          Cookies.set("uid", res.uid);
          Cookies.set("name", res.name);
          Cookies.set("coupon", JSON.stringify(res.category));
          Cookies.set("grandPrize", res.grandPrize);

          setTimeout(() => {
            setShouldNavigateToWelcomePage(true);
            if (res.category && res.grandPrize) {
              navigate("/welcome-back", { replace: true });
            } else {
              navigate("/select-chant", { replace: true });
            }
            changeOtpModalState();
            enterNumberModalState();
            setLoading(false);
          }, 2000);
        } else {
          setLoading(false);
          toast(<ToastMessage text={res.message} />);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast(<ToastMessage text="Something went wrong" />);
      });
  };

  const handleSubmitRegistration = () => {
    setLoading(true);
    handleApiRequests(personData, "/register")
      .then((res) => {
        if (res.success) {
          gtag("event", "conversion", {
            send_to: "AW-10872599357/qos7CPywkYkZEL3musAo",
          });
          Cookies.set("uid", res.uid);
          Cookies.set("name", personData.name);
          setShouldNavigateToWelcomePage(false);
          _hsq.push([
            "trackCustomBehavioralEvent",
            {
              name: hscKey,
              properties: {
                event_name: "form_submission",
              },
            },
          ]);

          setTimeout(() => {
            navigate("/select-chant", { replace: true });
            setLoading(false);
            changeOtpModalState();
          }, 2000);
        } else {
          setLoading(false);
          if (res.message === "Invalid OTP!") {
            toast(<ToastMessage text="Invalid OTP!" />);
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        toast(<ToastMessage text="Something went wrong" />);
      });
  };

  const handleResendOtp = () => {
    setResendSendBefore(true);
    setTimeRemaining(30);

    const { token, mobile } = personData;

    handleApiRequests({ token, mobile }, "/resend-otp")
      .then((res) => {
        if (!res.success) {
          setResendSendBefore(false);
          setTimeRemaining(0);
        }
      })
      .catch((err) => {
        toast(<ToastMessage text="Something went wrong" />);
      });
  };

  useEffect(() => {
    if (otpEntered) {
      handleOnChange("otp", otpEntered.join(""));
    }
  }, [otpEntered]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <>
      <SharedModal
        changeState={changeOtpModalState}
        style="z-[99999]"
        showCancelBtn={true}
      >
        <>
          <div className="fillForm w-full flex justify-center items-center flex-col gap-[30px] mb-[30px]">
            <MediumHeadTitle data="Enter OTP" />
            <OtpNum otpEntered={otpEntered} setOtpEntered={setOtpEntered} />
            <BtnPrimaryWithBorderGolden
              onClick={handleSubmit}
              data="Submit now"
              loading={loading}
            />
          </div>
          <div className="flex flex-col gap-[20px] items-center justify-center">
            <div className="text-white font-proximanovaR  text-[1.4270032930845225vh]">
              {!resendSendBefore && (
                <button
                  disabled={timeRemaining !== 0}
                  onClick={() => {
                    handleResendOtp();
                  }}
                >
                  <strong>Resend OTP</strong>
                </button>
              )}
              {timeRemaining > 0 && (
                <>
                  {!resendSendBefore && <span> in </span>}
                  <span className="txtResendNum font-extralight">
                    {timeRemaining}s
                  </span>
                </>
              )}
            </div>
            <button
              onClick={changeOtpModalState}
              className="text-white font-proximanovaB underline underline-offset-[5px]  text-[1.4270032930845225vh]"
            >
              Entered the wrong number?
            </button>
          </div>
        </>
      </SharedModal>
    </>
  );
};

export default EnterOTPNum;
