import React, { useState, useRef } from "react";

const OtpNum = ({ otpEntered, setOtpEntered }) => {
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    // Allow backspace (empty value) or a single digit number
    if (value === "" || value.match(/^[0-9]$/)) {
      const newOtp = [...otpEntered];
      newOtp[index] = value;
      setOtpEntered(newOtp);

      // Move focus to the next input field if value is a number
      if (value.match(/^[0-9]$/) && index < otpEntered.length - 1) {
        inputRefs.current[index + 1].focus();
      }

      // Move focus to the previous input field if value is empty (backspace)
      if (value === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Move focus to the previous input field on backspace
    if (e.key === "Backspace" && index > 0 && otpEntered[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };
  return (
    <>
      <div className="flex items-center justify-center flex-row gap-[30px]">
        {otpEntered.map((value, index) => (
          <input
            key={index}
            type="tel"
            maxLength={1}
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(ref) => (inputRefs.current[index] = ref)}
            className="w-[50px] h-[80px] placeholder:text-greycolor2 font-proximanovaEB shadow-inputField rounded-[5px] text-black text-[2.6344676180021955vh] outline-none text-center"
          />
        ))}
      </div>
    </>
  );
};

export default OtpNum;
