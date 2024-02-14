import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles

const HeadTitle = ({ style, data }) => {
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
        className={`${style} txtShadowWhiteLight text-center text-[5.70vh] md:text-[2.70vw] text-white font-extrabold font-proximanovaB`}
      >
        {data}
      </h2>
    </>
  );
};

export default HeadTitle;
