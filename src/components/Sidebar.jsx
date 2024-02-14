import React from "react";

import { useHowToModalStore } from "../zustand/handleHowToModal";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebar, setSidebar }) => {
  const { changeHowToModalState } = useHowToModalStore();
  const assetsBucketUrl = import.meta.env.VITE_ASSETS_BUCKET_URL;

  const btnClose = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      {/* START OVERLAY AND SIDEBAR */}
      <div
        onClick={btnClose}
        className={`overlaySidebar   fixed inset-[0] h-full w-full z-[99] bg-bgTransparent ${
          sidebar ? "overlaySidebarOpen" : "hidden"
        } `}
      ></div>
      <div
        className={`overflow-hidden sidebar bg-white rounded-[10px] fixed right-[10px] w-[290px] h-[450px] flex items-center justify-center flex-col z-[9999] text-center ${
          sidebar ? "sidebaropen" : ""
        }`}
      >
        <button
          className="btnClose w-full absolute bg-primarycolor bottom-[0]  z-[999] h-[40px] bg-btnCloseSidebarGradient"
          onClick={btnClose}
        >
          <img
            src={`${assetsBucketUrl}/img/desktop/iconArrowup-v1.png`}
            alt=""
            className="img-fluid imgClose max-w-full mx-auto w-[30px]"
          />
        </button>
        <ul className="listSidebar">
          <li>
            <button
              onClick={() => {
                changeHowToModalState();
              }}
              className="font-proximanovaR font-semibold text-black text-[1.9758507135016465vh]"
            >
              How It Works
            </button>
          </li>
          <li>
            <Link
              target="_blank"
              to="/terms"
              className="font-proximanovaR font-semibold text-black text-[1.9758507135016465vh]"
            >
              Terms & Conditions
            </Link>
          </li>
          <li>
            <a
              target="_blank"
              href="https://privacy.mondelezinternational.com/in/en-IN/privacy-policy/"
              className="font-proximanovaR font-semibold text-black text-[1.9758507135016465vh]"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://contactus.mdlzapps.com/dessertscorner/contact/en-US/"
              className="font-proximanovaR font-semibold text-black text-[1.9758507135016465vh]"
            >
              Contact Us
            </a>
          </li>
        </ul>
        <div className="footBlock mt-[50px] flex flex-col gap-[30px]">
          <div className="logoBlock">
            <img
              src={`${assetsBucketUrl}/img/logos/logo-mondelez-v1.png`}
              alt=""
              className="max-w-full mx-auto block w-[200px]"
            />
          </div>
          <span className="txtCopyright text-greycolor text-[1.3172338090010978vh] font-proximanovaR">
            &copy; Mondelez International. All rights reserved
          </span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
