import { useState, useMemo, useEffect } from "react";
import { FaEdit, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import StudentProfileModal from "./StudentProfileModal";

function ActivityList({ activities = [], isLoading, onEdit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(activities.length / itemsPerPage));
  }, [activities.length, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [itemsPerPage, totalPages, currentPage]);

  const paginatedActivities = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return activities.slice(start, start + itemsPerPage);
  }, [activities, currentPage, itemsPerPage]);

  const startRecordIndex = (currentPage - 1) * itemsPerPage + 1;
  const endRecordIndex = Math.min(currentPage * itemsPerPage, activities.length);

  return (
    <>
      <div className="w-full overflow-hidden">
        {/* TABLE WRAPPER ELEMENT */}

        <table className="w-full text-left border-collapse block md:table">
          
          {/* HIDE HEADERS ON MOBILE SCREENSIZES */}
          <thead className="hidden md:table-header-group">
            <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="w-[35%] px-6 py-3.5">Student</th>
              <th className="w-[35%] px-6 py-3.5">Activity/Task</th>
              <th className="w-[15%] px-6 py-3.5">Hours</th>
              <th className="w-[15%] px-6 py-3.5 text-right">Action</th>
            </tr>
          </thead>

          {/* TBODY DYNAMIC CARDS/ROWS */}
          <tbody className="divide-y divide-gray-100 md:divide-y md:divide-gray-50 text-sm text-gray-700 block md:table-row-group space-y-4 md:space-y-0 bg-gray-50 md:bg-transparent p-4 md:p-0">
            {isLoading ? (
              <tr className="block md:table-row bg-white rounded-2xl md:rounded-none border border-gray-100 md:border-none shadow-sm md:shadow-none">
                <td colSpan="4" className="text-center py-16 text-gray-400 font-medium bg-white block md:table-cell">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  Syncing student directory...
                </td>
              </tr>
            ) : paginatedActivities.length > 0 ? (
              paginatedActivities.map((activity) => (

                <tr 
                  key={activity.id} 
                  className="block md:table-row bg-white rounded-2xl md:rounded-none border border-gray-100 md:border-none shadow-sm md:shadow-none p-5 md:p-0 relative hover:bg-gray-50/50 transition"
                >
                  
                  <td className="block md:table-cell px-0 md:px-6 py-0 md:py-3 mb-4 md:mb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm md:text-xs shadow-sm shrink-0">
                        {activity.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="truncate">
                        <p className="font-semibold text-gray-900 text-base md:text-sm truncate">
                          {activity.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => setSelectedStudent(activity)}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline block mt-0.5"
                        >
                          View profile
                        </button>
                      </div>
                    </div>
                  </td>

                  <td className="block md:table-cell px-0 md:px-6 py-0 md:py-3 mb-3 md:mb-0 text-gray-600 font-medium md:truncate">
                    <span className="inline-block md:hidden text-xs font-bold uppercase tracking-wider text-gray-400 mr-2">
                      Activity:
                    </span>
                    {activity.activity}
                  </td>

                  <td className="block md:table-cell px-0 md:px-6 py-0 md:py-3 mb-2 md:mb-0 font-bold text-gray-900">
                    <span className="inline-block md:hidden text-xs font-bold uppercase tracking-wider text-gray-400 mr-2">
                      Duration:
                    </span>
                    {activity.hours} <span className="text-xs font-normal text-gray-400">hrs</span>
                  </td>

                 
                  <td className="absolute top-5 right-5 md:static md:table-cell px-0 md:px-6 py-0 md:py-3 text-right">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => onEdit(activity)}
                        title="Modify Activity Log"
                        className="w-9 h-9 md:w-8 md:h-8 rounded-xl md:rounded-lg border border-gray-200 text-gray-500 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 flex items-center justify-center transition shadow-sm md:shadow-none"
                      >
                        <FaEdit size={13} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr className="block md:table-row bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-0">
                <td colSpan="4" className="text-center py-16 text-gray-400 font-medium bg-white block md:table-cell">
                  No activities found matching your query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION FOOTER RESPONSIVE CONTAINER */}
      {!isLoading && activities.length > 0 && (
        <div className="border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/30">
          <div className="flex items-center justify-between w-full sm:w-auto gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-400">Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-200 rounded-lg px-2 py-1 text-xs font-medium text-gray-600 bg-white outline-none cursor-pointer focus:border-blue-500"
              >
                {[5, 10, 15, 20].map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            <span className="text-xs text-gray-400">
              Showing {startRecordIndex}–{endRecordIndex} of {activities.length}
            </span>
          </div>

          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <span className="text-xs font-medium text-gray-500">
              Page <span className="text-gray-900 font-bold">{currentPage}</span> of {totalPages}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="w-8 h-8 border border-gray-200 bg-white rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition cursor-pointer disabled:cursor-not-allowed"
              >
                <FaChevronLeft size={10} />
              </button>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="w-8 h-8 border border-gray-200 bg-white rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition cursor-pointer disabled:cursor-not-allowed"
              >
                <FaChevronRight size={10} />
              </button>
            </div>
          </div>
        </div>
      )}

      <StudentProfileModal
        item={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </>
  );
}

export default ActivityList;