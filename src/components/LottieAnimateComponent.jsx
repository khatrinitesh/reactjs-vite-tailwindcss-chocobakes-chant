import React from "react";
import Lottie from "lottie-react";

const LottieAnimateComponent = ({ data, style, loop }) => {
  return <Lottie animationData={data} style={style} loop={loop} />;
};

export default LottieAnimateComponent;
