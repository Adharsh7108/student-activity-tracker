import { useEffect } from "react";
import { FaTimes, FaSignOutAlt, FaUser, FaHashtag } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useMe, useSummary } from "../hooks/useActivities";

function UserProfileModal({ onClose }) {
  const { logout } = useAuth();
  const { data: user } = useMe();
  const { 
    data: summary = { total_entries: 0, total_hours: 0, most_active_user: "N/A" } 
  } = useSummary();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 transition-all duration-300 animate-in fade-in"
    >
      {/* Modal Card Element */}
      <div 
        onClick={(e) => e.stopPropagation()} // Protects window form body content from click-away triggers
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-gray-100 transform transition-all animate-in zoom-in-95 duration-200"
      >
        {/* PREMIUM GRADIENT HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-6 relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Profile Menu"
            className="absolute top-4 right-4 p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition outline-none"
          >
            <FaTimes size={14} />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white text-blue-600 flex items-center justify-center text-xl font-black shadow-md border-2 border-white/20">
              {user?.username?.charAt(0).toUpperCase() ?? "?"}
            </div>
            <div className="truncate">
              <p className="text-white font-bold text-base truncate">
                {user?.username ?? "Educator Account"}
              </p>
              <p className="text-blue-100/70 text-[11px] font-medium tracking-wide uppercase mt-0.5">
                Primary Instructor
              </p>
            </div>
          </div>
        </div>

        {/* METRICS GRID SECTION */}
        <div className="bg-gray-50/50 border-b border-gray-100 p-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">
            Classroom Overview Scope
          </p>
          <div className="grid grid-cols-3 gap-2 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">{summary.total_entries}</p>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mt-0.5">Logs</p>
            </div>
            <div className="text-center border-x border-gray-100 px-1">
              <p className="text-lg font-bold text-gray-900">{summary.total_hours}</p>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mt-0.5">Hours</p>
            </div>
            <div className="text-center flex flex-col justify-between overflow-hidden">
              <p className="text-sm font-extrabold text-blue-600 truncate pt-0.5 px-0.5">
                {summary.most_active_user !== "N/A" ? summary.most_active_user : "—"}
              </p>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mt-0.5">Top Student</p>
            </div>
          </div>
        </div>

        {/* PROFILE ACCOUNT INFO ROWS */}
        <div className="px-6 py-4 space-y-3.5 border-b border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400 flex items-center gap-2 text-xs font-medium">
              <FaFaUser className="text-gray-300" size={11} /> System Username
            </span>
            <span className="font-semibold text-gray-800 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
              @{user?.username}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400 flex items-center gap-2 text-xs font-medium">
              <FaHashtag className="text-gray-300" size={11} /> Reference ID
            </span>
            <span className="font-mono text-xs font-bold text-gray-500">
              #{user?.id ?? "000"}
            </span>
          </div>
        </div>

        {/* LOGOUT CONTROL CALL TO ACTION */}
        <div className="p-4 bg-gray-50/20">
          <button
            type="button"
            onClick={() => {
              onClose();
              logout();
            }}
            className="w-full flex items-center justify-center gap-2 text-red-600 bg-red-50 hover:bg-red-100 border border-red-200/60 font-semibold rounded-xl text-sm px-5 py-2.5 transition-all outline-none focus:ring-4 focus:ring-red-500/10"
          >
            <FaSignOutAlt size={13} />
            Sign Out
          </button>
        </div>

      </div>
    </div>
  );
}


const FaFaUser = FaUser;

export default UserProfileModal;