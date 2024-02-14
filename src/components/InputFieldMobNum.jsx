import React, { useState } from "react";

const InputFieldMobNum = ({
  placeholder,
  onChange,
  type,
  maxLength,
  minLength,
  onKeyDown,
  style,
  onKeyPress,
}) => {
  return (
    <>
      <input
        type={type}
        className={`${style} w-full text-black placeholder:text-greycolor2 font-proximanovaB  shadow-inputField rounded-[5px] h-[40px] text-center text-[1.756311745334797vh] outline-none`}
        placeholder={placeholder}
        onChange={onChange}
        maxLength={maxLength}
        minLength={minLength}
        onKeyDown={onKeyDown}
      />
    </>
  );
};

export default InputFieldMobNum;
