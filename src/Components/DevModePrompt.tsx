import React from "react";
interface DevModePromptProps {
  confirmText?: string;
  cancelText?: string;
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const DevModePrompt = ({
  confirmText = "Confirm",
  cancelText = "Cancel",
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onConfirm,
  onCancel,
}: DevModePromptProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 h-screen w-screen flex items-center justify-center z-50 flex-col gap-4">
      <div className="alert-box">
        <h1 className="text-lg text-white font-bold">{title}!</h1>
        <p className="text-gray-200 text-sm">{message}</p>
        <div className="flex justify-end gap-2 mt-8">
          <button
            className=" text-gray-200 hover:text-white cursor-pointer text-sm"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className="rounded-lg hover:bg-[var(--background-color)] p-2 px-4 text-gray-200 hover:text-white  cursor-pointer text-sm ease-in-out duration-300"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevModePrompt;
