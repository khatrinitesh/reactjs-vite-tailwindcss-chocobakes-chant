import React, { useEffect, useState } from "react";
import Home from "./Home";

// BELOW LIBRARY
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles
import { toast } from "sonner";

// BELOW IMAGES FILES

// BELOW COMPONENTS
import BtnPrimary from "../components/BtnPrimaryWoBorderGolden";
import HeadTitleGolden from "../components/HeadTitleGolden";
import InputField from "../components/InputField";
import { blockedWords } from "../abusive-words";
import ToastMessage from "../components/ToastMessage";
import { useOtpModalStore } from "../zustand/handleOtpModal";
import { Link } from "react-router-dom";
import { handleApiRequests } from "../utils/handleApiRequests";
import { useEnterNumberModalStore } from "../zustand/handleEnterNumberModal";

const Register = ({ personData, setPersonData }) => {
  const [loading, setLoading] = useState(false);
  const [slideAnimation, setSlideAnimation] = useState(false);
  const assetsBucketUrl = import.meta.env.VITE_ASSETS_BUCKET_URL;

  //ZUSTAND STATES
  const { changeOtpModalState } = useOtpModalStore();
  const { enterNumberModalState } = useEnterNumberModalStore();

  const { name, mobile, email, terms } = personData;

  const handleSlideAnimation = () => {
    setSlideAnimation(!slideAnimation);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleKeyPress = (e) => {
    const isNumeric = /^[0-9]*$/;
    if (!isNumeric.test(e.key) && e.keyCode !== 8 && e.keyCode !== 9) {
      e.preventDefault();
    }
  };

  const handleKeyPressChar = (e) => {
    const isNumeric = /^[a-z,A-Z ]*$/;
    if (!isNumeric.test(e.key) && e.keyCode !== 8 && e.keyCode !== 9) {
      e.preventDefault();
    }
  };

  const handleOnChange = (type, value) => {
    setPersonData((draft) => {
      return { ...draft, [type]: value };
    });
  };

  const handleSubmit = () => {
    if (name === "") {
      toast(<ToastMessage text="Enter your name" />);
      return;
    }

    const nameSplit = name.split(" ");
    for (const part of nameSplit) {
      if (blockedWords.includes(part.toLowerCase())) {
        toast(<ToastMessage text="Enter appropriate name" />);
        return;
      }
    }

    if (mobile === "") {
      toast(<ToastMessage text="Enter your mobile number" />);
      return;
    }

    if (mobile.length !== 10) {
      toast(<ToastMessage text="Enter valid mobile number" />);
      return;
    }

    if (email === "") {
      toast(<ToastMessage text="Enter your email" />);
      return;
    }

    if (!isValidEmail(email)) {
      toast(<ToastMessage text="Enter a valid email" />);
      return;
    }

    if (!terms) {
      toast(<ToastMessage text="Accept terms & condition" />);
      return;
    }

    let timeoutExpired = false;
    let locationTimeout;

    const updateAndLogData = (latitude, longitude) => {
      handleOnChange("latitude", latitude);
      handleOnChange("longitude", longitude);
      handleSendOtp();
    };

    const handleLocationSuccess = (position) => {
      if (timeoutExpired) return;
      clearTimeout(locationTimeout);
      updateAndLogData(position.coords.latitude, position.coords.longitude);
    };

    const handleLocationError = () => {
      if (timeoutExpired) return;
      clearTimeout(locationTimeout);
      updateAndLogData("0", "0");
    };

    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError
      );

      locationTimeout = setTimeout(() => {
        timeoutExpired = true;
        updateAndLogData("", "");
      }, 10000);
    } else {
      handleLocationError();
    }
  };

  const handleSendOtp = () => {
    setLoading(true);
    handleApiRequests({ mobile }, "/send-reg-otp").then((res) => {
      if (res.success) {
        changeOtpModalState();
        setLoading(false);
        handleOnChange("token", res.token);
      } else {
        setLoading(false);
        if (res.message === "Mobile no. already registered. Kindly login.") {
          toast(
            <ToastMessage text="Mobile number already registered. Kindly login." />
          );
        } else {
          toast(
            <ToastMessage text="Something went wrong, please try again later" />
          );
        }
      }
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (!slideAnimation) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.classList.remove("overflow-hidden");
    };
  }, [slideAnimation]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSlideAnimation(true);
    }, 1500);
  }, []);

  return (
    <>
      <Home
        handleSlideAnimation={handleSlideAnimation}
        slideAnimation={slideAnimation}
      />
      <div className="mainContent min-h-[calc(100vh-90px)] w-full relative bg-tertiarycolor2 ">
        <div className="curvePurpleBlock pb-[80px] md:pb-[250px] lg:pb-[300px] xl:pb-[250px] relative">
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
          <div className="max-w-[320px] md:max-w-[700px] lg:max-w-[800px] w-full h-full mx-auto flex items-start flex-col relative justify-center p-[20px] md:py-0">
            <div
              className="w-full flex items-center justify-center  text-center flex-col py-[10px] "
              data-aos="zoom-in"
            >
              <img
                src={`${assetsBucketUrl}/img/logos/parameter-v1.png`}
                alt=""
                className="block mx-auto object-contain md:h-[180px] h-[130px] md:py-[20px]"
              />
              <HeadTitleGolden data="Let's get to know you better" />
            </div>
            <div className="fillForm flex flex-col gap-[30px] w-full relative items-center">
              <InputField
                type="text"
                onChange={(e) => {
                  handleOnChange("name", e.target.value);
                }}
                placeholder="Enter your name*"
                maxLength={20}
                onKeyDown={handleKeyPressChar}
              />
              <InputField
                type="tel"
                onChange={(e) => {
                  handleOnChange("mobile", e.target.value);
                }}
                placeholder="Enter your mobile number*"
                maxLength={10}
                minLength={10}
                onKeyDown={handleKeyPress}
              />
              <InputField
                type="email"
                onChange={(e) => {
                  handleOnChange("email", e.target.value);
                }}
                placeholder="Enter your email ID*"
                maxLength={50}
              />
            </div>
            <div className="btnBlock hidden w-full p-[10px] md:p-[30px] md:flex items-center justify-center flex-col">
              <div className="checkbox_block w-full flex items-center justify-center">
                <ul className="w-full list-unstyled list_checkbox text-left relative flex z-[9] justify-center items-center flex-col mb-[20px]">
                  <li>
                    <label className="field_chk relative cursor-pointer flex items-start justify-center">
                      <input
                        onChange={(e) => {
                          handleOnChange("terms", e.target.checked);
                        }}
                        type="checkbox"
                        name="condition1"
                        className="field_input_chk hidden"
                        id="condition1"
                      />
                      <span className="dot_chk w-[15px] h-[15px] border-solid border-[2px] border-white flex items-center justify-center mr-[10px] float-left bg-white relative top-[3px]" />
                      <span className="txt_chk  text-tertiarycolor font-proximanovaR text-[1.64vh] md:text-[0.78vw] w-[calc(100%-30px)] float-right pointer-events-none">
                        I accept &nbsp;
                        <Link
                          to="/terms"
                          target="_blank"
                          className="text-tertiarycolor font-semibold pointer-events-auto"
                        >
                          T&Cs
                        </Link>{" "}
                        and{" "}
                        <a
                          href="https://privacy.mondelezinternational.com/in/en-IN/privacy-policy/"
                          target="_blank"
                          className="text-tertiarycolor font-semibold pointer-events-auto"
                        >
                          Privacy Policy
                        </a>{" "}
                        of Mondelez (Cadbury).*
                      </span>
                    </label>
                    <span className="labelError checkbox" />
                  </li>
                </ul>
              </div>
              <BtnPrimary
                style=" w-[30%] !px-[0px] !text-[1.23vw] !py-[5px]"
                onClick={handleSubmit}
                data="Get OTP"
                loading={loading}
              />
            </div>
          </div>
          <div className="hidden md:block absolute left-[50%] translate-x-[-50%] md:bottom-[150px]"></div>
        </div>
        <div className="relative top-[-20px]  md:top-[-100px] lg:top-[-150px] xl:top-[-50px] 2xl:top-[0] max-w-[340px] md:max-w-[600px] mx-auto w-full flex items-start flex-col justify-center gap-[20px]  md:py-[30px]">
          <div className="checkbox_block !max-w-full w-full md:px-[20px] md:hidden flex justify-center items-center">
            <ul className="list-unstyled list_checkbox w-[70%] relative flex z-[9] justify-center items-center">
              <li>
                <label className="field_chk relative cursor-pointer flex items-start w-full justify-center gap-[12px]">
                  <input
                    onChange={(e) => {
                      handleOnChange("terms", e.target.checked);
                    }}
                    type="checkbox"
                    name="condition1"
                    className="field_input_chk hidden"
                    id="condition1"
                  />
                  <span className="dot_chk w-[15px] h-[15px] border-solid border-[2px] border-white flex items-center justify-center mr-[10px] float-left bg-white relative top-[3px]" />
                  <span className="txt_chk  text-black font-proximanovaR text-[1.64vh] md:text-[0.78vw] w-[calc(100%-30px)] float-right pointer-events-none">
                    I accept &nbsp;
                    <Link
                      to="/terms"
                      target="_blank"
                      className="text-black font-semibold pointer-events-auto"
                    >
                      T&Cs
                    </Link>{" "}
                    and{" "}
                    <a
                      href="https://privacy.mondelezinternational.com/in/en-IN/privacy-policy/"
                      target="_blank"
                      className="text-black font-semibold pointer-events-auto"
                    >
                      Privacy Policy
                    </a>{" "}
                    of Mondelez (Cadbury).*
                  </span>
                </label>
                <span className="labelError checkbox" />
              </li>
            </ul>
          </div>
          <div className="grid justify-center items-center w-full relative xl:top-[-100px] 2xl:top-[-150px]">
            <div className="btnBlock flex items-center justify-center w-full md:hidden pb-[20px] md:pb-[30px]">
              <BtnPrimary
                style="py-[5px]"
                data="Get OTP"
                onClick={handleSubmit}
                loading={loading}
              />
            </div>
            <div className="flex items-center justify-center w-full pb-[30px] relative z-[9]">
              <button
                onClick={enterNumberModalState}
                className="text-primarycolor underline text-[1.48vh] md:text-[0.83vw] font-proximanovaB"
              >
                Already registered
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
