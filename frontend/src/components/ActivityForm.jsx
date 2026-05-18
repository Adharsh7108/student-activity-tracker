import { useEffect, useState } from "react";
import {
  useAddActivity,
  useUpdateActivity,
  useDeleteActivity,
} from "../hooks/useActivities";
import DeleteModal from "./DeleteModal";
import { FaTrash, FaPlus, FaCheck } from "react-icons/fa";

function ActivityForm({ editData, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    activity: "",
    hours: "",
  });
  
  const [errorMessage, setErrorMessage] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  const addMutation = useAddActivity();
  const updateMutation = useUpdateActivity();
  const deleteMutation = useDeleteActivity();

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        activity: editData.activity || "",
        hours: editData.hours || "",
      });
    } else {
      setFormData({ name: "", activity: "", hours: "" });
    }
    setErrorMessage(""); // Flush validation flags on lifecycle change
  }, [editData]);

  const handleChange = (e) => {
    setErrorMessage("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Client Side Validation Safety Checks
    if (!formData.name.trim() || !formData.activity.trim() || !formData.hours) {
      setErrorMessage("All information tracking fields are required.");
      return;
    }

    const hoursNumeric = Number(formData.hours);
    if (isNaN(hoursNumeric) || hoursNumeric <= 0) {
      setErrorMessage("Please type a valid duration window greater than 0.");
      return;
    }

    try {
      const payload = {
        ...formData,
        name: formData.name.trim(),
        activity: formData.activity.trim(),
        hours: hoursNumeric,
      };

      if (editData) {
        await updateMutation.mutateAsync({
          id: editData.id,
          data: payload,
        });
      } else {
        await addMutation.mutateAsync(payload);
      }

      onClose();
    } catch (error) {
      console.error("Mutation failed:", error);
      setErrorMessage(error?.response?.data?.detail || "Failed to commit database record log.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(editData.id);
      setShowDelete(false);
      onClose();
    } catch (error) {
      console.error("Deletion record failed:", error);
      setErrorMessage("Could not completely purge historical item record link.");
      setShowDelete(false);
    }
  };

  const isMutating = addMutation.isPending || updateMutation.isPending;
  const inputBaseStyle =
    "w-full px-4 py-2.5 text-sm bg-gray-50 text-gray-900 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition duration-150";

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 relative">
        
        {/* CONTEXTUAL ERRORS DISPLAY */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs font-semibold text-red-600 animate-in fade-in zoom-in-95 duration-150">
            {errorMessage}
          </div>
        )}

        {/* FIELD: STUDENT IDENTIFIER */}
        <div>
          <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
            Student Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Alex Johnson"
            className={inputBaseStyle}
          />
        </div>

        {/* FIELD: TASK ASSIGNMENT */}
        <div>
          <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
            Activity / Task Label
          </label>
          <input
            type="text"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            placeholder="e.g., Chemistry Lab Report"
            className={inputBaseStyle}
          />
        </div>

        <div>
          <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
            Hours Invested
          </label>
          <input
            type="number"
            name="hours"
            min="0"
            step="any"
            value={formData.hours}
            onChange={handleChange}
            placeholder="e.g., 2.5"
            className={inputBaseStyle}
          />
        </div>


        <div className="flex items-center gap-3 pt-3 border-t border-gray-50 mt-6">
          <button
            type="submit"
            disabled={isMutating}
            className="flex-1 flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 font-semibold rounded-xl text-sm px-5 py-2.5 shadow-sm transition active:scale-[0.99] disabled:cursor-not-allowed"
          >
            {isMutating ? (
              <div className="w-4 h-4 border-2 border-white/30 border-b-white rounded-full animate-spin" />
            ) : editData ? (
              <>
                <FaCheck size={12} /> Save
              </>
            ) : (
              <>
                <FaPlus size={11} /> Commit Log Entry
              </>
            )}
          </button>

          {editData && (
            <button
              type="button"
              disabled={isMutating}
              onClick={() => setShowDelete(true)}
              title="Purge Log Record"
              className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 flex items-center justify-center transition active:scale-[0.99] shrink-0 disabled:opacity-40"
            >
              <FaTrash size={13} />
            </button>
          )}
        </div>
      </form>
      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </>
  );
}

export default ActivityForm;