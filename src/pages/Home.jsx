import React, { useEffect } from "react";

// BELOW LIBRARY
import AOS from "aos";
import "aos/dist/aos.css";

const Home = ({ slideAnimation }) => {
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
      <div
        className={`mainContent z-[99999] h-[100vh] absolute top-0 w-full  bg-tertiarycolor 
        ${
          slideAnimation &&
          `${
            window.innerWidth < 768
              ? "slide-animation-for-mobile"
              : " slide-animation-for-desktop"
          }`
        }`}
      >
        <div className="BgWallpaperRadial mainContent flex justify-center items-center z-[99999] h-[100vh] absolute top-0 w-full  bg-tertiarycolor">
          <div>
            <img
              src={`${assetsBucketUrl}/img/logos/logo2-v1.png`}
              className="h-[25vh] md:block hidden"
              alt=""
            />
          </div>
        </div>
        <img
          src={`${assetsBucketUrl}/img/logos/logo2-v1.png`}
          alt=""
          className="max-w-full mx-auto object-cover w-[500px] absolute md:top-[50%] lg:top-[50%] xl:top-[50%] 2xl:top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] hidden md:block"
        />
      </div>
    </>
  );
};

export default Home;
