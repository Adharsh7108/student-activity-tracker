import { useEffect } from "react";
import {
  FaTimes,
  FaClock,
  FaBookOpen,
} from "react-icons/fa";

function StudentProfileModal({ item, onClose }) {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [item]);

  if (!item) return null;

  // Let's set a professional, standard daily/assignment target baseline (e.g., 4 hrs max target) 
  // to give the calculation real meaning.
  const REGULARIZED_TARGET = 4;
  const progressPercentage = Math.min(
    Math.round((Number(item.hours) / REGULARIZED_TARGET) * 100),
    100
  );

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 transition-all duration-300"
    >
      {/* Modal Main Content Box */}
      <div 
        onClick={(e) => e.stopPropagation()} // Safe intercept to prevent click-away close inside the layout box
        className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl border border-gray-100 transform transition-all animate-in fade-in-50 zoom-in-95 duration-200"
      >
        {/* HEADER BRANDING LAYER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Modal"
            className="absolute top-4 right-4 p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition outline-none"
          >
            <FaTimes size={14} />
          </button>

          <h2 className="text-white text-lg font-bold truncate pr-6">
            {item.name}
          </h2>
          <p className="text-blue-100/80 text-xs mt-0.5 font-medium tracking-wide uppercase">
            Student Performance Card
          </p>
        </div>

        {/* DETAILS SECTION */}
        <div className="p-6">
          
          {/* Avatar Spotlight Ring */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-50 to-indigo-50 border-2 border-blue-500/20 text-blue-600 flex items-center justify-center text-2xl font-black shadow-inner">
              {item.name?.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="space-y-4">
            
            {/* Field Block: Activity */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mt-0.5">
                <FaBookOpen size={14} />
              </div>
              <div className="truncate">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Task Assignment
                </p>
                <p className="font-semibold text-gray-800 text-sm mt-0.5 truncate">
                  {item.activity}
                </p>
              </div>
            </div>

            {/* Field Block: Hours */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 mt-0.5">
                <FaClock size={14} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Duration Volume
                </p>
                <p className="font-bold text-gray-900 text-sm mt-0.5">
                  {item.hours} <span className="text-xs font-medium text-gray-500">hours spent</span>
                </p>
              </div>
            </div>

            {/* Professional Micro Progress Metric */}
            <div className="pt-2">
              <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
                <span>Task Target Completion</span>
                <span className="text-gray-900">{progressPercentage}%</span>
              </div>

              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5 text-right">
                Based on target threshold of {REGULARIZED_TARGET} hours per task log
              </p>
            </div>
          </div>

          {/* Action Footer */}
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm py-2.5 rounded-xl shadow-sm hover:shadow transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Dismiss Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentProfileModal;