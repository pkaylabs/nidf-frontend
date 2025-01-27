import React, { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import SearchBar from "./components/search-bar";
import FilterDropdown from "./components/filter-dropdown";
import TableLoader from "./components/loader";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

interface Header {
  name: string;
  value: string;
}

interface FilterOption {
  name: string;
  fields: string[];
}

interface TableProps {
  displayHeader?: boolean;
  showAddButton?: boolean;
  addButtonText?: string;
  onAddButtonClick?: () => void;
  headers?: Header[];
  rows: Array<{ [key: string]: ReactNode }>;
  footer?: ReactNode;
  maxRows?: number;
  searchable?: boolean;
  searchableFields?: string[];
  filters?: FilterOption[];
  loading?: boolean;
  renderRow?: (row: { [key: string]: ReactNode }, index: number) => ReactNode;
}

const Table: React.FC<TableProps> = ({
  displayHeader = true,
  showAddButton = false,
  addButtonText,
  onAddButtonClick,
  headers,
  rows,
  footer,
  maxRows = 10,
  searchable = true,
  searchableFields = [],
  filters = [],
  loading = false,
  renderRow,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Filter rows based on search and dropdown filters
  const filteredRows = rows.filter((row) => {
    // Search filtering
    if (searchQuery) {
      const matchesSearch = searchableFields.some((field) =>
        String(row[field] || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      if (!matchesSearch) return false;
    }

    // Dropdown filters
    for (const [field, value] of Object.entries(activeFilters)) {
      if (
        value &&
        String(row[field] || "").toLowerCase() !== value.toLowerCase()
      ) {
        return false;
      }
    }

    return true;
  });

  //   console.log("Active Filters:", activeFilters); // Debugging
  //   console.log("Filtered Rows:", filteredRows); // Debugging

  // Pagination logic
  const totalPages = Math.ceil(filteredRows.length / maxRows);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * maxRows,
    currentPage * maxRows
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <motion.div
      className="w-full overflow-hidden "
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 flex flex-col md:flex-row justify-between space-x-5 items-center rounded-md bg-white py-5 lg:px-14 ">
        {searchable && (
          <SearchBar query={searchQuery} onChange={setSearchQuery} />
        )}
        <div className="flex items-center justify-between flex-1 space-x-5">
          {filters.map((filter) => (
            <FilterDropdown
              key={filter.name}
              name={filter.name}
              options={filter.fields}
              onChange={(value) =>
                setActiveFilters((prev) => ({ ...prev, [filter.name]: value }))
              }
            />
          ))}
        </div>
        {showAddButton && (
          <button
            onClick={onAddButtonClick}
            className="font-medium flex-[0.3] flex items-center justify-center space-x-3 bg-primary-500 text-lg text-white py-2.5 px-4 rounded-md hover:bg-primary-600 transition-all duration-150 ease-in-out "
          >
            <span>+</span> <span> {addButtonText} </span>{" "}
          </button>
        )}
      </div>
      {loading ? (
        <TableLoader headers={headers || []} rows={maxRows} />
      ) : (
        <div className="font-poppins bg-white py-10 px-6 mt-5 rounded-md">
          <table className="table-auto w-full text-left ">
            {/* header */}
            {displayHeader && (
              <thead>
                <tr>
                  {headers?.map((header) => (
                    <th
                      key={header.value}
                      className="font-semibold px-4 py-2.5 bg-primary text-lg text-white"
                    >
                      {header.name}
                    </th>
                  ))}
                </tr>
              </thead>
            )}

            <motion.tbody layout>
              {paginatedRows.map((row, index) =>
                renderRow ? (
                  renderRow(row, index)
                ) : (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {headers?.map((header) => (
                      <td key={header.value} className="px-4 py-2">
                        {row[header.value]}
                      </td>
                    ))}
                  </motion.tr>
                )
              )}
            </motion.tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="p-4 flex justify-between items-center bg-white mt-4 rounded-md">
          <div className=""></div>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded text-sm ${
                  currentPage === index + 1
                    ? "bg-primary-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                } transition-all duration-150 ease-in-out`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button
              className="w-10 h-10 flex justify-center items-center cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 shadow transition-all duration-150 ease-in-out "
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ArrowLeft2 size="20" color="#545454" />
            </button>
            <button
              className="w-10 h-10 flex justify-center items-center cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 shadow transition-all duration-150 ease-in-out "
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ArrowRight2 size="20" color="#545454" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Table;
