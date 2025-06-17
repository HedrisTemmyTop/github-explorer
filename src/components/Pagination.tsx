import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { memo, useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export const Pagination = memo<PaginationProps>(
  ({ currentPage, totalPages, onPageChange, loading = false }) => {
    const pageNumbers = useMemo(() => {
      const noOfPagesBeforeAndAfterCurrPage = 2; //  the number of pages to show before and after the current page
      const range = []; // range is the array of page numbers

      range.push(1); // push the first page number to the range array

      const start = Math.max(2, currentPage - noOfPagesBeforeAndAfterCurrPage); // start is the max of 2 and the current page minus the noOfPagesBeforeAndAfterCurrPage
      const end = Math.min(
        totalPages - 1,
        currentPage + noOfPagesBeforeAndAfterCurrPage
      ); // end is the min of the total pages minus 1 and the current page plus the noOfPagesBeforeAndAfterCurrPage

      if (start > 2) range.push("..."); // if the start is greater than 2, push the dots to the range array
      for (let i = start; i <= end; i++) range.push(i); // push the page numbers to the range array
      if (end < totalPages - 1) range.push("..."); // if the end is less than the total pages minus 1, push the dots to the range array

      if (totalPages > 1) range.push(totalPages); // if the total pages is greater than 1, push the total pages to the range array

      return range;
    }, [currentPage, totalPages]);

    // if the total pages is less than or equal to 1, return null
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        {/* the previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </button>

        {/* the array of page numbers is rendered here */}
        <div className="flex items-center space-x-1">
          {pageNumbers.map((pageNumber) => {
            // if the page number is a string, render the dots
            if (typeof pageNumber === "string") {
              return (
                <div key={pageNumber} className="px-3 py-2">
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </div>
              );
            }

            // if the page number is a number, render the page number
            const isActive = pageNumber === currentPage;

            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                disabled={loading}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        {/*  the next button is rendered here */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    );
  }
);

Pagination.displayName = "Pagination";
