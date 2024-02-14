import React from "react";

// BELOW COMPONENTS
import MediumHeadTitle from "./MediumHeadTitle";
import { useHowToModalStore } from "../zustand/handleHowToModal";
import SharedModal from "./SharedModal";

const HowToPlayModal = () => {
  const { changeHowToModalState } = useHowToModalStore();

  const listData = [
    "Step 1: Select any one of the chant options.",
    "Step 2: Select any one of the offers, as per your choice.",
    "Step 3: Find a noise-free area and start chanting. Chant clearly with adequate pauses.",
    "Step 4: Before repeating the chant, wait for it to turn green. Continue only after each chant is rejected/validated.",
  ];

  return (
    <>
      <SharedModal
        style="z-[99999]"
        changeState={changeHowToModalState}
        showCancelBtn={true}
      >
        <div className="fillForm w-full flex justify-center items-center flex-col gap-[10px] ">
          <MediumHeadTitle data="How it works" />
          <div>
            <ul className="listItem grid">
              {listData.map((val, index) => {
                return (
                  <li
                    className="text-[1.98vh] text-white font-proximanovaR"
                    key={index}
                  >
                    {val}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </SharedModal>
    </>
  );
};

export default HowToPlayModal;
