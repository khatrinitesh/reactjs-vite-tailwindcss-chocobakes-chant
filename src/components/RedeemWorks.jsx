import React from "react";

// BELOW IMAGES FILES

// BELOW COMPONENTS
import MediumHeadTitle from "./MediumHeadTitle";
import SharedModal from "./SharedModal";
import { useRedeemModalStore } from "../zustand/handleRedeemModal";

const RedeemWorks = ({ content }) => {
  const { changeRedeemModalState } = useRedeemModalStore();

  return (
    <>
      <SharedModal
        style="z-[99999]"
        changeState={() => {
          changeRedeemModalState(null);
        }}
        showCancelBtn={true}
      >
        <div className="fillForm w-full flex justify-center items-center flex-col gap-[30px]">
          <MediumHeadTitle data="How to Redeem" />
          <div className=" bg-[#fff] w-full rounded-[10px] p-[10px]">
            <div className="customScrollbar contentBlock overflow-y-auto max-h-[220px] px-[10px] grid gap-[12px]">
              {content}
            </div>
          </div>
        </div>
      </SharedModal>
    </>
  );
};

export default RedeemWorks;
