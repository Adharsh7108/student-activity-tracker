import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const pages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  return (
    <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">

      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronLeft className="w-3 h-3" />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex items-center justify-center px-3 h-8 text-sm font-medium border rounded-lg transition-colors ${
            currentPage === page
              ? "text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
              : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}

export default Pagination;