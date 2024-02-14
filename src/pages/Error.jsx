import React from "react";
// BELOW LIBRARY
import { useNavigate } from "react-router-dom";

// BELOW COMPONENTS
import BtnPrimaryPurpleArrow from "../components/BtnPrimaryPurpleArrow";
import TextDescYellow from "../components/TextDescYellow";
import HeadTitleGolden from "../components/HeadTitleGolden";
import Cookies from "js-cookie";

const Error = () => {
  const navigate = useNavigate();
  const uid = Cookies.get("uid");

  const btnBack = () => {
    if (uid !== undefined) {
      navigate("/welcome");
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <section className="h-[calc(100vh-90px)] bg-primarycolor">
        <div className="text-center h-full flex items-center justify-center flex-col four_zero_four_bg bg-no-repeat">
          <div className=""></div>
          <div className="contant_box_404 h-full flex items-center justify-center flex-col mt-[100px]">
            <HeadTitleGolden data="404" style="!text-[100px]" />
            <TextDescYellow data="Look like you're lost" />
            <TextDescYellow data="the page you are looking for not avaible!" />
            <div className="flex items-center justify-center mt-[30px]">
              <BtnPrimaryPurpleArrow onClick={btnBack}>
                Go to Home
              </BtnPrimaryPurpleArrow>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
