import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles;
import GoldenConfettiDesk from "../assets/lottie/golden_confettidesk.json";
import GoldenConfetti from "../assets/lottie/golden_confetti.json";

// BELOW COMPONENTS
import BtnSecondary from "../components/BtnSecondary";
import HeadTitlePurple from "../components/HeadTitlePurple";
import LottieAnimateComponent from "../components/LottieAnimateComponent";
import { useRedeemModalStore } from "../zustand/handleRedeemModal";
import { toast } from "sonner";
import ToastMessage from "../components/ToastMessage";
import { handleApiRequests } from "../utils/handleApiRequests";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import CopyCodeButtonWithVerification from "../components/CopyCodeButtonWithVerification";
import { useDataEnrichmentStore } from "../zustand/handleDataEnrichment";

const Congratulations = () => {
  const assetsBucketUrl = import.meta.env.VITE_ASSETS_BUCKET_URL;

  const { changeDataEnrichmentState } = useDataEnrichmentStore();

  const { changeRedeemModalState } = useRedeemModalStore();
  const [couponObj, setCouponObj] = useState(null);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const [askQuestions, setAskQuestions] = useState(false);

  //COOKIE VALUES
  const uid = Cookies.get("uid");
  const couponType = Cookies.get("couponType");
  const mantraType = Cookies.get("mantraType");
  const completed_chanting = Cookies.get("completed_chanting");

  const handleSharing = async () => {
    if (!navigator.share) {
      return;
    }

    try {
      const formattedText = `Chant Cadbury Chocobakes and win amazing offers for your entire family. Chant on ${window.location.origin} & fulfill all your desires - Mondelez India`;
      await navigator.share({
        text: formattedText,
      });
    } catch (error) {
      toast(<ToastMessage text="Failed to Share" />);
    }
    handleApiRequests({ type: "share", uid }, "/set-flag")
      .then((res) => {})
      .catch((err) => {});
  };

  const copyTextToClipboard = async () => {
    handleApiRequests({ type: "coupon-copy", uid }, "/set-flag")
      .then((res) => {})
      .catch((err) => {});

    try {
      const { code, pin, termsLink, validity } = couponObj;

      const formattedText =
        `${couponType === "MMT" ? "MakeMyTrip" : couponType}\n` +
        `Code: ${code}\n` +
        `${pin?.length !== 0 ? `Pin: ${pin}\n` : ""}` +
        `Terms: ${termsLink}\n` +
        `Validity: ${validity}`;

      await navigator.clipboard.writeText(formattedText);
      toast(<ToastMessage text="Text copied to clipboard" />);
    } catch (err) {
      toast(<ToastMessage text="Failed to copy text" />);
    }
  };

  const handleHowToRedeemContent = () => {
    if (couponType === "Amazon") {
      return (
        <>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            To add your GC to your Amazon Pay balance, visit{" "}
            <a
              target="_blank"
              className="text-blue-600"
              href="https://www.amazon.in/gp/css/gc/payment/view-gc-balance"
            >
              www.amazon.in/addgiftcard
            </a>
          </p>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            Customer can apply the 14 digit code (under scratch card) on
            amazon.in/addgiftcard and add the Gift Card balance in his/her
            Amazon.in account.
          </p>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            Customer can add multiple Gift Cards to an account.
          </p>
        </>
      );
    } else if (couponType === "Nykaa") {
      return (
        <>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            This Nykaa E-Gift Card is redeemable on the online ecommerce
            platforms of Nykaa group entities to include Nykaa.com,
            NykaaMan.com, NykaaFashion.com, and used at Nykaa Retail stores (Lux
            and On Trend formats).
          </p>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            Select the items you want to purchase and proceed to check out.
          </p>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            Choose Gift Card as the payment mode.
          </p>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            Enter your Card Number and PIN. The Gift Card amount will be
            deducted from the payable amount.
          </p>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            Pay any balance amount using available payment modes.
          </p>
        </>
      );
    } else if (couponType === "Flipkart") {
      return (
        <>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            Go to{" "}
            <a
              target="_blank"
              className="text-blue-600"
              href="https://www.flipkart.com"
            >
              flipkart.com
            </a>{" "}
            and select the items you want to purchase. When you are ready to
            checkout, click ""Proceed To Pay"".
          </p>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            Select the ""Pay By Gift Card"" option.
          </p>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            Enter your 16-digit gift card number and PIN number.
          </p>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            Pay balance amount using other available payment modes.
          </p>
        </>
      );
    } else if (couponType === "MMT") {
      return (
        <>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            Visit{" "}
            <a
              target="_blank"
              className="text-blue-600"
              href="https://www.makemytrip.com"
            >
              www.makemytrip.com
            </a>{" "}
            or on MakeMyTrip Android & IOS app.
          </p>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            Select your Holiday and fill required details till you reach the
            payment page.
          </p>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            On Website, click on "More options" and Select "Gift Card" as your
            Payment Mode.
          </p>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            On Android and IOS app, choose Gift Card as the payment option.
          </p>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            Enter your Gift Card/ Card No. (16 Digit) and 6 Digit Pin No.
          </p>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            Click on "Make Payment" and Pay the Balance amount (if any) using
            other Payment Modes Listed.
          </p>
        </>
      );
    } else if (couponType === "Uber") {
      return (
        <>
          <p className="font-proximanova-regular text-black text-[1.54vh] md:text-[0.73vw]">
            Go to the Payment section in the Uber app Tap Add Payment Method and
            select Gift Card Enter Gift Code
          </p>
        </>
      );
    }
  };

  const handleHowToRedeem = () => {
    changeRedeemModalState(handleHowToRedeemContent());
    handleApiRequests({ type: "how-to-redeem", uid }, "/set-flag")
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
    const handleResize = () => {
      document.body.classList.add("overflow-hidden");
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      Cookies.set("coupon", "");
      Cookies.set("couponType", "");
    };
  }, []);

  useEffect(() => {
    if (couponType === "" || mantraType === "" || !completed_chanting) {
      navigate("/");
    }
  }, [couponType, mantraType, completed_chanting]);

  return (
    <>
      <div className="mainContent overflow-hidden w-full min-h-screen  relative bg-oopsCongratsGradient">
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
            {/* E > CONFETTI LEFT TOP */}
            <div className="bgPattern w-full aspect-square p-[30px] relative z-[9]">
              <div
                className="logoBlock flex items-center justify-center mb-[10px]"
                data-aos="zoom-in"
              >
                <img
                  src={`${assetsBucketUrl}/img/logos/logo2-v1.png`}
                  className="max-w-full mx-auto w-[100px]"
                />
              </div>
              <div className="captionBlock text-center">
                <HeadTitlePurple>Congratulations</HeadTitlePurple>
                <p
                  data-aos="fade-up"
                  className="desc text-primarycolor text-[1.75vh] md:text-[0.78vw] font-proximanovaB font-bold leading-none mb-[10px]"
                >
                  You have successfully <br />
                  unlocked your reward.
                </p>
                <img
                  src={`${assetsBucketUrl}/img/cookies/triplechocolate-v1.png`}
                  className="w-[250px] mx-auto block"
                  data-aos="flip-left"
                />
              </div>
            </div>
            <div className="justify-center items-center flex flex-col w-full mt-[-20%] z-[9999]">
              <div className="flex  items-center justify-evenly px-[12px]">
                <CopyCodeButtonWithVerification
                  mantraType={mantraType}
                  setAskQuestions={setAskQuestions}
                  uid={uid}
                  verified={verified}
                  setVerified={setVerified}
                  couponType={couponType}
                  couponObj={couponObj}
                  onClick={copyTextToClipboard}
                  setCouponObj={setCouponObj}
                />
              </div>
              {verified && (
                <div className="flex items-center justify-center gap-[30px] pt-[40px] pb-[30px] flex-row relative z-[9999]">
                  <BtnSecondary onClick={handleSharing} style=" w-auto mx-auto">
                    <span className="relative whitespace-nowrap">Share</span>
                  </BtnSecondary>
                  <BtnSecondary
                    onClick={handleHowToRedeem}
                    style="w-auto mx-auto"
                  >
                    <span className="relative whitespace-nowrap">
                      How to redeem
                    </span>
                  </BtnSecondary>
                </div>
              )}
              {askQuestions && (
                <div className="flex items-center justify-center">
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
        <div className="hidden md:flex items-center w-full  h-[calc(100vh-90px)]">
          <div className="md:max-w-[850px] xl:max-w-[1000px] container mx-auto relative flex items-center">
            <div className="bgConfetti absolute top-0 left-0 w-full z-[999]">
              <div className="lottieBlock lottieBlockDesk flex items-center justify-center absolute left-0 z-[9]">
                <LottieAnimateComponent loop={true} data={GoldenConfettiDesk} />
              </div>
            </div>
            <div className="flex items-center w-full justify-center h-[calc(100vh-90px)]">
              <div className="bgPattern aspect-square relative flex items-center justify-center flex-col h-[70%] z-[9]">
                <div
                  className="logoBlock flex items-center justify-center"
                  data-aos="zoom-in"
                >
                  <img
                    src={`${assetsBucketUrl}/img/logos/logo2-v1.png`}
                    className="max-w-full mx-auto w-[150px]"
                  />
                </div>
                <div className="captionBlock text-center md:px-[50px] relative">
                  <HeadTitlePurple>Congratulations!</HeadTitlePurple>
                  <p
                    data-aos="fade-up"
                    className="desc text-primarycolor text-[1.25vw]  font-proximanovaB font-bold leading-none mb-[10px]"
                  >
                    You have successfully <br />
                    unlocked your reward.
                  </p>
                  <img
                    src={`${assetsBucketUrl}/img/cookies/triplechocolate-v1.png`}
                    className="md:max-w-[300px] lg:max-w-[400px] mx-auto block"
                    data-aos="flip-left"
                  />
                </div>
              </div>

              <div className="rightContent relative z-[999] ">
                <div className="flex items-center justify-evenly">
                  <CopyCodeButtonWithVerification
                    mantraType={mantraType}
                    setAskQuestions={setAskQuestions}
                    uid={uid}
                    verified={verified}
                    setVerified={setVerified}
                    couponType={couponType}
                    couponObj={couponObj}
                    onClick={copyTextToClipboard}
                    setCouponObj={setCouponObj}
                  />
                </div>
                {verified && (
                  <div className="flex items-center justify-center gap-[30px] pt-[40px] flex-row pb-[40px]">
                    <BtnSecondary
                      onClick={handleSharing}
                      style=" w-auto mx-auto"
                    >
                      <span className="relative whitespace-nowrap">Share</span>
                    </BtnSecondary>
                    <BtnSecondary
                      onClick={handleHowToRedeem}
                      style="w-auto mx-auto"
                    >
                      <span className="relative whitespace-nowrap">
                        How to redeem
                      </span>
                    </BtnSecondary>
                  </div>
                )}
                {askQuestions && (
                  <div className="flex justify-center ">
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
        <div className="bottomCurve fixed md:absolute bottom-0  w-full left-0 ">
          <div className="leftLeave absolute bottom-[10px] md:bottom-[140px] left-[10px] ">
            <img
              src={`${assetsBucketUrl}/img/leaves/icon1-v1.png`}
              alt=""
              className="max-w-full block mx-auto rotate-[180deg] relative w-[50px] md:w-[70px]"
            />
          </div>
          <div className="rightLeave absolute bottom-[10px] md:bottom-[140px] right-[10px]">
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

export default Congratulations;
