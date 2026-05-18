// Fixed: accepts title + value props (not a summary object)
function SummaryCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl  border-gray-200 shadow-sm p-5">
      <h5 className="text-sm font-semibold text-gray-500">{title}</h5>
      <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
}

export default SummaryCard;