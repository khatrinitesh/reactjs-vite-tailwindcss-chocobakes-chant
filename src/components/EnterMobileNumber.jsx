import React, { useState } from "react";

// BELOW IMAGES FILES

// BELOW COMPONENTS
import MediumHeadTitle from "./MediumHeadTitle";
import InputFieldMobNum from "./InputFieldMobNum";
import BtnPrimaryWithBorderGolden from "./BtnPrimaryWithBorderGolden";
import SharedModal from "./SharedModal";
import { useHowToModalStore } from "../zustand/handleHowToModal";
import { useOtpModalStore } from "../zustand/handleOtpModal";
import { useEnterNumberModalStore } from "../zustand/handleEnterNumberModal";
import { toast } from "sonner";
import ToastMessage from "./ToastMessage";
import { handleApiRequests } from "../utils/handleApiRequests";

const EnterMobileNumber = ({ handleOnChange }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

  //ZUSTAND STATES
  const { enterNumberModalState } = useEnterNumberModalStore();
  const { changeOtpModalState } = useOtpModalStore();

  const handleMobileNumberChange = (e) => {
    // Ensure that the entered value doesn't exceed the maximum length
    const maxLength = 10;
    const enteredValue = e.target.value;

    if (enteredValue.length <= maxLength) {
      setMobileNumber(enteredValue);
    }
  };

  const handleKeyPress = (e) => {
    const isNumeric = /^[0-9]*$/;
    if (!isNumeric.test(e.key) && e.keyCode !== 8 && e.keyCode !== 9) {
      e.preventDefault();
    }
  };

  const handleSubmit = () => {
    if (mobileNumber.length === 0) {
      toast(<ToastMessage text="Enter mobile number" />);
      return;
    }
    if (mobileNumber.length > 0 && mobileNumber.length < 10) {
      toast(<ToastMessage text="Enter valid mobile number" />);
      return;
    }

    if (mobileNumber.length === 10) {
      handleOnChange("mobile", mobileNumber);
      handleSendOtp();
    }
  };

  const handleSendOtp = () => {
    setLoading(true);
    handleApiRequests({ mobile: mobileNumber }, "/send-login-otp").then(
      (res) => {
        if (res.success) {
          setLoading(false);
          changeOtpModalState();
          handleOnChange("token", res.token);
        } else {
          setLoading(false);
          if (res.message === "Mobile no. not registered. Kindly register.") {
            toast(
              <ToastMessage text="Mobile number not registered. Kindly register." />
            );
          } else {
            toast(
              <ToastMessage text="Something went wrong, please try again later" />
            );
          }
        }
      }
    );
  };

  return (
    <>
      <SharedModal
        showCancelBtn={true}
        style="z-[999]"
        changeState={enterNumberModalState}
      >
        <div className="fillForm w-full flex justify-center items-center flex-col gap-[30px]">
          <MediumHeadTitle data="Enter your mobile number*" />
          <InputFieldMobNum
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            maxLength={10}
            onKeyDown={handleKeyPress}
          />
          <BtnPrimaryWithBorderGolden
            loading={loading}
            onClick={handleSubmit}
            data="Get OTP"
          />
        </div>
      </SharedModal>
    </>
  );
};

export default EnterMobileNumber;
