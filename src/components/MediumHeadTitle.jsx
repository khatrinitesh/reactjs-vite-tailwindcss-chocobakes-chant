import React from "react";

const MediumHeadTitle = ({ style, data }) => {
  return (
    <>
      <h2
        className={`${style} tracking-wide  text-white font-proximanovaEB font-bold text-[3.10vh] md:text-[1.46vw] text-center txtShadowWhiteLight`}
      >
        {data}
      </h2>
    </>
  );
};

export default MediumHeadTitle;
