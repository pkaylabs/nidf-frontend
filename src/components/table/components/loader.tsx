import React from "react";
import { motion } from "framer-motion";

interface TableLoaderProps {
  headers: { name: string; value: string }[];
  rows: number;
}

const TableLoader: React.FC<TableLoaderProps> = ({ headers, rows }) => {
  return (
    <div className="animate-pulse">
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-600"
              >
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </th>
            ))}
          </tr>
        </thead>
        <motion.tbody layout>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {headers.map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-2">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </motion.tbody>
      </table>
    </div>
  );
};

export default TableLoader;
