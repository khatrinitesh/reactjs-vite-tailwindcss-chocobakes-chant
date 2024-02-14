import React from "react";
import MediumHeadTitle from "../components/MediumHeadTitle";
import TextDescYellow from "../components/TextDescYellow";

const ChantMantraSectionTitle = ({
  startRecording,
  counter,
  couponType,
  timer,
}) => {
  return (
    <>
      <div className="sectionTitle bg-chantSectionTitleGradient p-[20px] rounded-[20px] mx-auto block w-full leading-tight">
        <MediumHeadTitle
          data={`Chant ${
            couponType === "Lakshadweep" ? "222" : "10"
          } times to unlock your reward.`}
        />
        <TextDescYellow
          style="py-[10px] text-[2.73vh]"
          data={
            startRecording
              ? counter < 5
                ? "Keep going, you're almost there… "
                : "Chant now…"
              : timer === 0 && counter !== 0
                ? "Tap on microphone to retry"
                : "Tap on microphone to start recording"
          }
        />
      </div>
    </>
  );
};

export default ChantMantraSectionTitle;
