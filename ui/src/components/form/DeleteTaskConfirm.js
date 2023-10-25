import React from "react";

function DeleteTaskConfirm({ close, confirm }) {
  return (
    <div className="border md:w-96 md:h-40 flex flex-col ">
      <div className="bg-yellow-500 text-white font-medium text-center">
        warning
      </div>
      <div className="text-center grow py-5 ">Permanent delete this Task?</div>
      <div className="flex flex-row justify-center space-x-4 pb-2">
        <button type="button" onClick={close} className="cancelTaskbutton">
          cancel
        </button>
        <button type="button" onClick={confirm} className="button">
          ok
        </button>
      </div>
    </div>
  );
}

export default DeleteTaskConfirm;
