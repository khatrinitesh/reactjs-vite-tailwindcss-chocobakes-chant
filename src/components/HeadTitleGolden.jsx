import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles

const HeadTitleGolden = ({ style, data }) => {
  useEffect(() => {
    AOS.init({
      // Global settings
      duration: 800, // Animation duration
      easing: "ease-in-out", // Easing type
      once: true, // Only animate once
    });
  }, []); // Ensure that AOS is initialized only once
  return (
    <>
      <h2
        data-aos="fade-up"
        className={`${style} textShadowGoldenLight text-tertiarycolor tracking-wide  font-proximanovaB mb-[5px] md:mb-[10px] xxs:text-[2.43vh] xs:text-[3vh] md:text-[2.1875vw] text-center leading-none md:leading-tight`}
      >
        {data}
      </h2>
    </>
  );
};

export default HeadTitleGolden;
