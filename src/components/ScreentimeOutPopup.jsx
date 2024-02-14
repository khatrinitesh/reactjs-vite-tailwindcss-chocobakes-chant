import React from "react";
import SharedModal from "./SharedModal";

const ScreentimeOutPopup = ({ changeState }) => {
  return (
    <SharedModal changeState={changeState} style="z-[99999]">
      <div className="grid gap-[12px]">
        <div>
          <p className="text-[3vh] font-proximanovaB text-white">
            Are you still chanting?
          </p>
        </div>
        <div className="grid gap-[8px]">
          <button
            onClick={changeState}
            className="p-2 w-full bg-white rounded-[12px] text-[2.2vh] font-proximanovaB text-primarycolor"
          >
            Continue Chanting
          </button>
          <button
            onClick={changeState}
            className="p-2 w-full bg-white rounded-[12px] text-[2.2vh] font-proximanovaB text-primarycolor"
          >
            Exit
          </button>
        </div>
      </div>
    </SharedModal>
  );
};

export default ScreentimeOutPopup;
