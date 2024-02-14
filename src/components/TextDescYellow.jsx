import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles

const TextDescYellow = ({ style, data }) => {
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
      <p
        data-aos="fade-up"
        className={`${style} text-center text-tertiarycolor2 font-proximanovaR text-[2.46vh] md:text-[1.15vw]`}
      >
        {data}
      </p>
    </>
  );
};

export default TextDescYellow;
