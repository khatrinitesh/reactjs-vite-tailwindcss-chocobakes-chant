import React, { useRef, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { handleApiRequests } from "../utils/handleApiRequests";
import { toast } from "sonner";
import ToastMessage from "../components/ToastMessage";

const CopyCodeButtonWithVerification = ({
  onClick,
  couponType,
  couponObj,
  verified,
  mantraType,
  uid,
  setCouponObj,
  setVerified,
  setAskQuestions,
}) => {
  const assetsBucketUrl = import.meta.env.VITE_ASSETS_BUCKET_URL;
  const recaptchaKey = import.meta.env.VITE_RECAPTCHA_KEY;
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const captchaRef = useRef(null);

  const handleVerifyCaptcha = () => {
    setRecaptchaToken(captchaRef.current.getValue());
  };

  useEffect(() => {
    if (recaptchaToken) {
      handleApiRequests(
        {
          uid: uid,
          chant: mantraType,
          couponCat: couponType,
          token: recaptchaToken,
        },
        "/unlock-coupon"
      )
        .then((res) => {
          if (res.success) {
            setAskQuestions(res.askQues);
            setCouponObj(res.coupon);
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

  return (
    <>
      {verified ? (
        <button
          onClick={onClick}
          className="w-full min-w-[200px] active:scale-[0.9] duration-200 bg-white copy-button-grid items-center justify-center p-2 rounded-[12px] relative top-[20px] shadow-inputField"
        >
          <div className="txt border-r pr-2 border-[#ececec] justify-center items-center gap-[2px] flex flex-col">
            <img
              src={`${assetsBucketUrl}/img/icons/icon-promcode-v1.svg`}
              alt=""
              className="w-full h-[20px]"
            />
            <p className="text-primarycolor font-proximanovaEB font-bold text-[1.4vh] md:text-[1.25vw]">
              {couponType === "MMT" ? "MakeMyTrip" : couponType}
            </p>
          </div>
          <div className="grid-cols-2 justify-center items-center">
            <p className="txt text-primarycolor text-[12px] font-proximanovaB">
              Code: {couponObj?.code}
            </p>

            {couponObj?.pin && (
              <p className="txt text-primarycolor text-[12px] font-proximanovaB">
                Pin: {couponObj?.pin}
              </p>
            )}
          </div>
        </button>
      ) : (
        <ReCAPTCHA
          ref={captchaRef}
          sitekey={recaptchaKey}
          onChange={handleVerifyCaptcha}
        />
      )}
    </>
  );
};

export default CopyCodeButtonWithVerification;
