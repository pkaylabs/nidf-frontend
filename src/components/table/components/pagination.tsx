import React from "react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

const ResponsivePagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
}) => {
  // Function to generate page numbers with ellipsis
  const getPageNumbers = (isMobile = false) => {
    const delta = isMobile ? 1 : 2; // Fewer pages around current on mobile
    const range: (number | string)[] = [];

    // Always include first page
    range.push(1);

    // Calculate start and end of middle range
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    // Add ellipsis after first page if needed
    if (start > 2) {
      range.push("...");
    }

    // Add middle range
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      range.push("...");
    }

    // Always include last page (if more than 1 page)
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Remove duplicates and return
    return range.filter((page, index, arr) => {
      if (typeof page === "string") return true;
      return arr.indexOf(page) === index;
    });
  };

  // Handle ellipsis clicks
  const handleEllipsisClick = (type: "prev" | "next") => {
    if (type === "prev") {
      const newPage = Math.max(1, currentPage - 5);
      onPageChange(newPage);
    } else {
      const newPage = Math.min(totalPages, currentPage + 5);
      onPageChange(newPage);
    }
  };

  if (loading || totalPages <= 1) return null;

  const desktopPageNumbers = getPageNumbers(false);
  const mobilePageNumbers = getPageNumbers(true);

  return (
    <div className="p-4 flex flex-col sm:flex-row justify-between items-center bg-white mt-4 rounded-md gap-4">
      {/* Page info - hidden on mobile */}
      <div className="hidden sm:block text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>

      {/* Mobile: Compact pagination with same logic as desktop */}
      <div className="flex sm:hidden items-center justify-center w-full">
        {/* Previous button */}
        <button
          className="w-8 h-8 flex justify-center items-center cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 shadow transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed mr-2"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeft2 size="16" color="#545454" />
        </button>

        {/* Page numbers - mobile version */}
        <div className="flex space-x-1">
          {mobilePageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <button
                  className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 cursor-pointer transition-all duration-150 ease-in-out"
                  onClick={() =>
                    handleEllipsisClick(
                      index < mobilePageNumbers.length / 2 ? "prev" : "next"
                    )
                  }
                  title={`Jump ${
                    index < mobilePageNumbers.length / 2
                      ? "backward"
                      : "forward"
                  } 5 pages`}
                >
                  ...
                </button>
              ) : (
                <button
                  className={`px-2 py-1 rounded text-xs min-w-[28px] h-7 transition-all duration-150 ease-in-out ${
                    currentPage === page
                      ? "bg-primary-500 text-white shadow-md"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                  onClick={() => onPageChange(page as number)}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next button */}
        <button
          className="w-8 h-8 flex justify-center items-center cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 shadow transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ml-2"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ArrowRight2 size="16" color="#545454" />
        </button>
      </div>

      {/* Desktop: Full pagination */}
      <div className="hidden sm:flex items-center space-x-2">
        {/* Previous button */}
        <button
          className="w-10 h-10 flex justify-center items-center cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 shadow transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeft2 size="20" color="#545454" />
        </button>

        {/* Page numbers */}
        <div className="flex space-x-1">
          {desktopPageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <button
                  className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer transition-all duration-150 ease-in-out"
                  onClick={() =>
                    handleEllipsisClick(
                      index < desktopPageNumbers.length / 2 ? "prev" : "next"
                    )
                  }
                  title={`Jump ${
                    index < desktopPageNumbers.length / 2
                      ? "backward"
                      : "forward"
                  } 5 pages`}
                >
                  ...
                </button>
              ) : (
                <button
                  className={`px-3 py-2 rounded text-sm min-w-[40px] transition-all duration-150 ease-in-out ${
                    currentPage === page
                      ? "bg-primary-500 text-white shadow-md"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                  onClick={() => onPageChange(page as number)}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next button */}
        <button
          className="w-10 h-10 flex justify-center items-center cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 shadow transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ArrowRight2 size="20" color="#545454" />
        </button>
      </div>


      <div className="hidden lg:flex items-center space-x-2 text-sm">
        <span className="text-gray-600">Go to:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-primary-300"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              const page = parseInt((e.target as HTMLInputElement).value);
              if (page >= 1 && page <= totalPages) {
                onPageChange(page);
                (e.target as HTMLInputElement).value = "";
              }
            }
          }}
          placeholder={currentPage.toString()}
        />
      </div>
    </div>
  );
};

export default ResponsivePagination;
