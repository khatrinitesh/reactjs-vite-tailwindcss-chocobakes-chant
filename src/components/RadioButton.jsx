import React, { useState } from "react";

const RadioButton = ({
  style,
  RadioOption,
  handleOnChange,
  questionNumber,
}) => {
  // State to keep track of the selected option
  const [selectedOption, setSelectedOption] = useState(null);

  // Function to handle radio button change
  const handleOptionChange = (event, option) => {
    setSelectedOption(event.target.value);
    if (questionNumber === 1) {
      handleOnChange("ans1", option);
    } else if (questionNumber === 2) {
      handleOnChange("ans2", option);
    } else if (questionNumber === 3) {
      handleOnChange("ans3", option);
    }
  };

  return (
    <>
      <ul className={`${style} radioBlock flex-col flex`}>
        {/* Render radio buttons dynamically based on options array */}
        {RadioOption.map((option, index) => (
          <li key={index}>
            <label className="fieldLbl" key={option.id}>
              <input
                className="fieldInputRadio"
                type="radio"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={(e) => handleOptionChange(e, option.label)}
              />
              <span className="dot"></span>
              <span className="txtLbl text-white font-proximanovaR text-[1.5vh] md:text-[1vw]">
                {option.label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RadioButton;
