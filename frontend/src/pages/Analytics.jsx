import { useActivities } from "../hooks/useActivities";
import { 
  AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend 
} from "recharts";

function Analytics() {
  const { data: activities = [], isLoading } = useActivities();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-500">Loading analytics...</span>
      </div>
    );
  }

  const chartData = [
    ...activities.map((act) => ({
      name: act.name || "Unnamed Activity",
      hours: Number(act.hours) || 0,
      date: act.created_at 
        ? new Date(act.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) 
        : "No Date"
    }))
  ].reverse(); 

  return (
    <div className="w-full space-y-6">
      {/* Header section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics Insights</h2>
        <p className="text-sm text-gray-500 mt-1">
          Visual representation of classroom engagement and performance metrics.
        </p>
      </div>

      {/* Charts Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col min-w-0">
          <div className="mb-4">
            <h3 className="text-base font-bold text-gray-800">Activity Timeline Trend</h3>
            <p className="text-xs text-gray-400">Chronological history of logged student entries</p>
          </div>
          

          <div className="w-full h-72 mt-2 min-w-0">
            <ResponsiveContainer width="100%" height={288}>
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 15 }}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 10 }} stroke="#e5e7eb" dy={8} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} stroke="#e5e7eb" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelClassName="font-semibold text-gray-700"
                />
                <Area type="monotone" dataKey="hours" name="Hours Invested" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col min-w-0">
          <div className="mb-4">
            <h3 className="text-base font-bold text-gray-800">Time Allocation by Assignment</h3>
            <p className="text-xs text-gray-400">Comparing hour distributions across tasks</p>
          </div>

      
          <div className="w-full h-72 mt-2 min-w-0">
            <ResponsiveContainer width="100%" height={288}>
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 15 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#9ca3af', fontSize: 10 }} 
                  stroke="#e5e7eb" 
                  interval={0}
                  angle={-10}
                  dx={-4}
                  dy={6}
                />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} stroke="#e5e7eb" />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', pt: 10 }} />
                <Bar dataKey="hours" name="Total Hours Spent" fill="#0ea5e9" radius={[4, 4, 0, 0]} maxBarSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Fallback Empty State if no data is present */}
      {activities.length === 0 && (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-8 text-center text-sm text-gray-400">
          No entries available to graph yet. Once students submit tasks, analytics will generate automatically.
        </div>
      )}
    </div>
  );
}

export default Analytics;