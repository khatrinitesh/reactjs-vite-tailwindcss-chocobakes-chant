import React from "react";
import SharedModal from "./SharedModal";

const PermissionDenied = ({ changeState }) => {
  return (
    <SharedModal
      changeState={changeState}
      showCancelBtn={false}
      style="z-[999999]"
    >
      <div className="grid gap-[20px]">
        <h1 className="text-white font-proximanovaB text-[24px]">
          Microphone Access Denied
        </h1>
        <div className="grid gap-[20px]">
          <p className="text-white font-proximanovaB">
            You've denied access to your microphone or microphone is not
            connected to your device. To fully utilize the features that require
            microphone input, please enable microphone access.
          </p>
          <ul className="text-white font-proximanovaR">
            <li>1. Click the lock icon in the address bar.</li>
            <li>2. Find the microphone settings in the permissions menu.</li>
            <li>3. Change the setting to 'Allow'.</li>
            <li>4. Refresh the page to apply changes.</li>
          </ul>
        </div>
      </div>
    </SharedModal>
  );
};

export default PermissionDenied;
