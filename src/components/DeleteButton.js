import { useState } from "react";

export default function DeleteButton({ label, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      {showConfirm && (
        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg p-4">
            <div className="text-center">Are you sure?</div>
            <div className="flex gap-2 mt-1">
              <button
                type="button"
                onClick={() => {
                  setShowConfirm(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="primary"
                onClick={() => {
                  onDelete();
                  setShowConfirm(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <button type="button" onClick={() => setShowConfirm(true)}>
        {label}
      </button>
    </>
  );
}
