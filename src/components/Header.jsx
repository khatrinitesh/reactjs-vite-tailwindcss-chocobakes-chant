import React, { useState } from "react";
// BELOW CODE > LIBRARY
import { Link, useLocation } from "react-router-dom";

// BELOW CODE > COMPONENTS
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";

const Header = () => {
  const assetsBucketUrl = import.meta.env.VITE_ASSETS_BUCKET_URL;
  //COOKIE VALUES
  const uid = Cookies.get("uid");
  const coupon = JSON.parse(
    Cookies.get("coupon") ? Cookies.get("coupon") : null
  );
  const grandPrize = JSON.parse(
    Cookies.get("grandPrize") ? Cookies.get("grandPrize") : null
  );

  const location = useLocation();
  const [sidebar, setSidebar] = useState(false);

  const btnHamburger = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <header className="h-[90px] header bg-primaryGradient1 fixed top-[0] left-[0] w-full p-[30px] flex items-center justify-between z-[9999]">
        {location.pathname === "/chant" ||
        location.pathname === "/select-chant" ||
        location.pathname === "/oops" ||
        location.pathname === "/" ? (
          <Link
            to={
              uid !== undefined
                ? coupon !== null && grandPrize
                  ? "/welcome-back"
                  : "/welcome"
                : "/"
            }
          >
            <img
              src={`${assetsBucketUrl}/img/logos/logo1-v1.png`}
              alt=""
              className="max-w-full block mx-auto  w-[150px] md:w-[180px] h-[150px] relative left-[-30px] object-cover"
            />
          </Link>
        ) : (
          <Link
            to={
              uid !== undefined
                ? coupon !== null && grandPrize
                  ? "/welcome-back"
                  : "/welcome"
                : "/"
            }
          >
            <img
              src={`${assetsBucketUrl}/img/logos/mainlogo-v1.png`}
              alt=""
              className="max-w-full block mx-auto  h-[60px]"
            />
          </Link>
        )}

        <button
          className="btnHamburger  w-[30px] h-[30px] "
          onClick={btnHamburger}
        >
          <img
            src={`${assetsBucketUrl}/img/icons/icon-white-hamburger-v1.png`}
            alt=""
            className="iconHamburger block max-w-full mx-auto"
          />
        </button>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      </header>
    </>
  );
};

export default Header;
