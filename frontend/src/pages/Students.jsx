import { useActivities } from "../hooks/useActivities";

function Students() {
  const { data: activities = [], isLoading } = useActivities();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-500">Loading student directory...</span>
      </div>
    );
  }

  // 1. Aggregate activity logs into unique student records
  const studentMap = activities.reduce((acc, act) => {
    // Gracefully handle either an attached user object or fallback string names
    const studentName = act.owner?.username || act.name || "Unknown Student";
    const hoursLogged = Number(act.hours) || 0;

    if (!acc[studentName]) {
      acc[studentName] = {
        name: studentName,
        totalHours: 0,
        totalEntries: 0,
        lastActive: act.created_at || act.date,
      };
    }

    acc[studentName].totalHours += hoursLogged;
    acc[studentName].totalEntries += 1;
    
    // Track the latest record timestamp
    if (new Date(act.created_at || act.date) > new Date(acc[studentName].lastActive)) {
      acc[studentName].lastActive = act.created_at || act.date;
    }

    return acc;
  }, {});

  const studentList = Object.values(studentMap);

  // Helper utility to style dynamic status badges professionally
  const getStatusBadge = (hours) => {
    if (hours >= 15) {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">Highly Active</span>;
    } else if (hours >= 5) {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">Active</span>;
    }
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">Needs Review</span>;
  };

  return (
    <div className="w-full space-y-6">
      {/* Structural Headers */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Directory</h2>
          <p className="text-sm text-gray-500 mt-1">
            Overview of total roster performance, logs, and relative engagement states.
          </p>
        </div>
        <span className="text-xs font-medium px-3 py-1 bg-gray-100 rounded-lg text-gray-600">
          Total Students: {studentList.length}
        </span>
      </div>

      {/* Main Table Card wrapper */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {studentList.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-400">
            No student records found. Students will automatically populate here as they submit activity logs.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Student Info</th>
                  <th className="py-4 px-6">Engagement State</th>
                  <th className="py-4 px-6 text-center">Total Entries</th>
                  <th className="py-4 px-6 text-right">Hours Logged</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
                {studentList.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-50/40 transition">
                    {/* Student Info with Avatar bubble */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-sm">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{student.name}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          Last active: {student.lastActive ? new Date(student.lastActive).toLocaleDateString() : "N/A"}
                        </div>
                      </div>
                    </td>
                    
                    {/* Engagement Status Badge */}
                    <td className="py-4 px-6">
                      {getStatusBadge(student.totalHours)}
                    </td>

                    {/* Numeric Logs count */}
                    <td className="py-4 px-6 text-center font-medium text-gray-600">
                      {student.totalEntries}
                    </td>

                    {/* Aligned Numeric Value */}
                    <td className="py-4 px-6 text-right font-bold text-gray-900">
                      {student.totalHours.toFixed(1)} <span className="text-xs font-normal text-gray-400">hrs</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Students;