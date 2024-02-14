import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles

const PortraitMobileMode = () => {
  const assetsBucketUrl = import.meta.env.VITE_ASSETS_BUCKET_URL;
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <>
      <div className="messagewapper w-full h-full fixed inset-[0] text-center z-[9999999] block bg-btnPrimaryRounded">
        <div className="box absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div data-aos="fade-down" className="logo1 w-[250px] height-auto">
            <img
              src={`${assetsBucketUrl}/img/logos/logo1-v1.png`}
              alt="Cal Scan"
              title="Cal Scan"
              className="w-[200px] mx-auto"
            />
          </div>
          <h2
            data-aos="zoom-in"
            className="text-white text-[3.51vh] md:text-[1.67vw] uppercase text-center font-proximanovaEB"
          >
            Best View in Portrait Mobile Mode
          </h2>
        </div>
      </div>
    </>
  );
};

export default PortraitMobileMode;
