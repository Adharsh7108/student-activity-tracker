import { useState } from "react";
import { FaPlus, FaTimes, FaSearch } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";
import { useActivities } from "../hooks/useActivities";

function Activities() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  // Fetch data from your backend custom hook
  const { data: activities = [], isLoading, isError } = useActivities(debouncedSearch);

  const handleEdit = (item) => {
    setEditData(item);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditData(null);
  };

  return (
    <div className="w-full">
      {/* Header Container */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm text-gray-500 mt-1">Manage student activities</p>
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition"
        >
          <FaPlus />
          Add Activity
        </button>
      </div>

      <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
        
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:max-w-xs">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              placeholder="Search student logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition"
            />
          </div>
          
          {/* Status badge toggles a spinner if background requests are loading */}
          <div className="flex items-center gap-2">
            {isLoading && (
              <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-blue-600"></div>
            )}
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              {activities.length} entries total
            </span>
          </div>
        </div>

        {/* Dynamic Condition Renderer inside the structural wrapper */}
        {isError ? (
          <div className="bg-red-50 text-red-500 p-10 text-center border-b border-gray-100">
            Failed to load activities from workspace backend.
          </div>
        ) : (
          /* Pass data directly down into list template layout */
          <ActivityList
            activities={activities}
            isLoading={isLoading}
            onEdit={handleEdit}
          />
        )}
      </div>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={closeDrawer} />
      )}

      {/* Side Form Drawer Container */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-full sm:w-[420px] bg-white shadow-2xl transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 ">
          <div>
            <h2 className="text-lg ">
              {editData ? "Edit Activity" : "Add Activity"}
            </h2>
            <p className="text-sm text-gray-500">Enter student details</p>
          </div>
          <button onClick={closeDrawer} className="text-gray-500 hover:text-black">
            <FaTimes size={18} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto h-full pb-24">
          <ActivityForm editData={editData} onClose={closeDrawer} />
        </div>
      </div>
    </div>
  );
}

export default Activities;