import Table from "@/components/table";
import React, { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

const Applications = () => {
  const headers = [
    { name: "Name", value: "name" },
    { name: "Age", value: "age" },
    { name: "Country", value: "country" },
  ];

  const rows = [
    { name: "John Doe", age: 25, country: "USA" },
    { name: "Jane Smith", age: 30, country: "Canada" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
    { name: "Mike Johnson", age: 22, country: "UK" },
  ];

  const customRowRenderer = (
    row: { [key: string]: ReactNode },
    index: number
  ) => (
    <motion.tr
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <td className="px-4 py-2 text-blue-600 font-bold">{row.name}</td>
      <td className="px-4 py-2 text-green-600">{row.age}</td>
      <td className="px-4 py-2 text-red-600">{row.country}</td>
    </motion.tr>
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000); // Simulating a 3-second data load
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="p-4">
      <Table
        headers={headers}
        rows={rows}
        renderRow={customRowRenderer}
        footer={<div>Pagination goes here</div>}
        maxRows={5}
        loading={loading}
        searchableFields={["name", "country"]}
        filters={[{ name: "country", fields: ["USA", "Canada", "UK"] }, { name: "country", fields: ["USA", "Canada", "UK"] }]}
      />
    </div>
  );
};

export default Applications;
