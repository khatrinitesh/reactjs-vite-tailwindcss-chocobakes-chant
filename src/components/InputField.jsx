import React from "react";

const InputField = ({
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
        className={`${style} w-full text-black placeholder:text-greycolor2 font-proximanovaR font-medium shadow-inputField rounded-[30px] h-[32px] xs1:h-[40px] text-center text-[2.19vh] md:text-[1.04vw] outline-none px-[10px] max-w-[550px]`}
        placeholder={placeholder}
        onChange={onChange}
        maxLength={maxLength}
        minLength={minLength}
        onKeyDown={onKeyDown}
      />
    </>
  );
};

export default InputField;
