import React from "react";

const DeleteConfirmationModal = ({ show, onCancel, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-96 my-2 mx-auto add-team-modal rounded-lg p-6">
        <h3 className="text-center text-blue text-xl font-bold mb-4">
          Are you sure you want to delete this item?
        </h3>
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white font-bold focus:outline-none hover:bg-blue-600"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <div className="w-4" /> {/* Add space between the buttons */}
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white font-bold focus:outline-none hover:bg-blue-600"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
