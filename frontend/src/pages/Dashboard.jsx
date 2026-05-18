import SummaryCard from "../components/SummaryCard";
import { useSummary } from "../hooks/useActivities";

function Dashboard() {
  const {
    data: summary = { total_entries: 0, total_hours: 0, most_active_user: "N/A" },
    isLoading,
  } = useSummary();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-500">Loading dashboard data...</span>
      </div>
    );
  }

  const WEEKLY_HOURS_GOAL = 100;
  const goalPercentage = Math.min(Math.round((summary.total_hours / WEEKLY_HOURS_GOAL) * 100), 100);

  return (
    <div className="w-full space-y-6 p-1 bg-gray-50/50">
      {/* Upper Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <SummaryCard 
          title="Total Entries" 
          value={summary.total_entries.toLocaleString()} 
          subtitle="All-time logs submitted"
        />
        <SummaryCard 
          title="Total Hours" 
          value={`${summary.total_hours.toLocaleString()} hrs`} 
          subtitle="Accumulated study time"
        />
        <SummaryCard 
          title="Most Active Student" 
          value={summary.most_active_user || "N/A"} 
          subtitle="Top contributor this term"
        />
      </div>

      {/* Main Analytical Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Progress Analytics Card */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Classroom Goal</h2>
            <p className="text-xs text-gray-500 mt-0.5">Target: {WEEKLY_HOURS_GOAL} collective hours</p>
          </div>

          {/* Progress Circle Visual */}
          <div className="flex flex-col items-center justify-center my-6">
            <div className="relative flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-8 border-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl font-extrabold text-gray-900">{goalPercentage}%</span>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mt-0.5">Reached</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-xs font-medium text-blue-800">
              {summary.total_hours} hours logged out of your {WEEKLY_HOURS_GOAL} hr goal.
            </p>
          </div>
        </div>

        {/* Actionable Insights / Recent Logs Section */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Dashboard Overview</h2>
              <p className="text-xs text-gray-500 mt-0.5">Quick look at ongoing class performance metrics</p>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-5 mt-6">
            <div>
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-1.5">
                <span>Total Class Logs</span>
                <span className="text-gray-500">{summary.total_entries} entries</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(summary.total_entries * 4, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-1.5">
                <span>Study Duration Volume</span>
                <span className="text-gray-500">{summary.total_hours} hrs</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-sky-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${goalPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>Data refreshes automatically</span>
            <span>Status: Active</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;