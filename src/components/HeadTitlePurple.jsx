import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles

const HeadTitlePurple = ({ style, children }) => {
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
        className={`${style} w-full txtShadowGoldenPurple text-center text-primarycolor text-[3.28vh] md:text-[2.19vw] font-proximanovaEB`}
      >
        {children}
      </h2>
    </>
  );
};

export default HeadTitlePurple;
