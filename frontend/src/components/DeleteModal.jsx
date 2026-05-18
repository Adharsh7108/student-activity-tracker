import { FaExclamationTriangle } from "react-icons/fa";
import { createPortal } from "react-dom";

function DeleteModal({
  open,
  onClose,
  onConfirm,
  loading,
}) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in fade-in zoom-in-95 duration-200">
        
        {/* CONTENT */}
        <div className="p-6 text-center">
          <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-red-100 text-red-600">
            <FaExclamationTriangle size={24} />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-gray-900">
            Delete Activity?
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            This action cannot be undone.
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex items-center gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 transition-all"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="w-full text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50 transition-all"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default DeleteModal;