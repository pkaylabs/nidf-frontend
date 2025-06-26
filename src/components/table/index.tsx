import React, { useState, ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "./components/search-bar";
import FilterDropdown from "./components/filter-dropdown";
import TableLoader from "./components/loader";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import EmptyState from "./components/empty-state";
import { useAppSelector } from "@/redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import ResponsivePagination from "./components/pagination";

interface Header {
  name: string;
  value: string;
}

interface FilterOption {
  name: string;
  fields: string[];
}

// Updated Table component with nested object support

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
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const user = useAppSelector(selectCurrentUser);

  // Helper function to get nested property value
  const getNestedValue = (obj: any, path: string): string => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : '';
    }, obj);
  };

  // Filter rows based on search and dropdown filters
  const filteredRows = rows.filter((row: any) => {
    // Search filtering
    if (searchQuery) {
      const matchesSearch = searchableFields.some((field) => {
        let fieldValue: any = '';
        
        // Handle nested fields (e.g., "region.name")
        if (field.includes('.')) {
          fieldValue = getNestedValue(row, field);
        } else {
          // Handle special cases for your data structure
          switch (field) {
            case 'region':
              fieldValue = row.region?.name || '';
              break;
            case 'division name':
            case 'name':
              fieldValue = row.name || '';
              break;
            default:
              fieldValue = row[field] || '';
          }
        }
        
        return String(fieldValue)
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
      if (!matchesSearch) return false;
    }

    // Dropdown filters
    for (const [field, value] of Object.entries(activeFilters)) {
      if (value) {
        let fieldValue = '';
        
        // Handle nested fields for filtering
        if (field.includes('.')) {
          fieldValue = getNestedValue(row, field);
        } else {
          // Handle special cases for your data structure
          switch (field) {
            case 'region':
              fieldValue = row.region?.name || '';
              break;
            default:
              fieldValue = row[field] || '';
          }
        }
        
        if (String(fieldValue).toLowerCase() !== value.toLowerCase()) {
          return false;
        }
      }
    }

    return true;
  });

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

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilters]);

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 flex flex-col md:flex-row justify-between gap-5 md:items-center rounded-md bg-white py-5 lg:px-5">
        {searchable && (
          <SearchBar query={searchQuery} onChange={setSearchQuery} />
        )}
        <div className="flex flex-col md:flex-row items-center justify-between flex-1 gap-5">
          {filters?.map((filter) => (
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
            className="font-medium flex-[0.3] flex items-center justify-center space-x-3 bg-primary-500 md:text-lg text-white py-2.5 px-4 rounded-md hover:bg-primary-600 transition-all duration-150 ease-in-out"
          >
            <span>+</span> <span className="truncate">{addButtonText}</span>
          </button>
        )}
      </div>

      {loading ? (
        <TableLoader headers={headers || []} rows={maxRows} />
      ) : filteredRows.length === 0 ? (
        <div className="bg-white py-10 px-6 mt-5 rounded-md">
          {user?.user_type === "ADMIN" || user?.user_type === "FINANCE_OFFICER" ? (
            <EmptyState onAdd={onAddButtonClick} />
          ) : (
            "No data available now. Please check again later."
          )}
        </div>
      ) : (
        <div className="font-poppins bg-white py-4 md:py-10 px-1 md:px-6 mt-5 rounded-md overflow-auto">
          <table className="table-auto w-full text-left">
            {displayHeader && (
              <thead>
                <tr>
                  {headers?.map((header) => (
                    <th
                      key={header.value}
                      className="font-semibold px-4 py-2.5 bg-primary text-sm md:text-lg text-white truncate"
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
                      <td key={header.value} className="px-4 py-2 truncate">
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

      <ResponsivePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        loading={loading}
      />
    </motion.div>
  );
};
export default Table;
