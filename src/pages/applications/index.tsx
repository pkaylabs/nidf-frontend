import Table from "@/components/table";
import React, { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Eye, Trash } from "iconsax-react";
import { useNavigate } from "react-location";
import { APPLICATIONS, APPLY_SUPPORT } from "@/constants/page-path";

const Applications = () => {
  const navigate = useNavigate();

  const headers = [
    { name: "Application ID", value: "application id" },
    { name: "Category", value: "category" },
    { name: "Submitted Date", value: "submitted date" },
    { name: "Status", value: "status" },
    { name: "Action", value: "action" },
  ];

  const rows = [
    {
      "application id": "APP-12345",
      category: "Emergency Support",
      "submitted date": "Jan 15, 2025",
      status: "Reviewing",
    },
    {
      "application id": "BPP-12345",
      category: "Aid",
      "submitted date": "Jan 15, 2025",
      status: "Approved",
    },
    {
      "application id": "CPP-12345",
      category: "Revolving Fund",
      "submitted date": "Jan 15, 2025",
      status: "Pending",
    },
    {
      "application id": "DPP-12345",
      category: "Emergency Support",
      "submitted date": "Jan 15, 2025",
      status: "Reviewing",
    },
    {
      "application id": "APP-12345",
      category: "Emergency Support",
      "submitted date": "Jan 15, 2025",
      status: "Reviewing",
    },
    {
      "application id": "BPP-12345",
      category: "Aid",
      "submitted date": "Jan 15, 2025",
      status: "Approved",
    },
    {
      "application id": "CPP-12345",
      category: "Revolving Fund",
      "submitted date": "Jan 15, 2025",
      status: "Pending",
    },
    {
      "application id": "DPP-12345",
      category: "Emergency Support",
      "submitted date": "Jan 15, 2025",
      status: "Reviewing",
    },
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
      className="font-poppins border-b text-lg  text-black  border-gray-200 hover:bg-gray-100 transition-all duration-150 ease-in-out"
    >
      <td className="px-4 py-3 ">{row["application id"]}</td>
      <td className="px-4 py-3">{row.category}</td>
      <td className="px-4 py-3 ">{row["submitted date"]}</td>
      <td className="px-4 py-3 ">
        <p
          className={`text-[#F5F5F5] text-base py-1 rounded-md text-center ${
            row.status === "Approved" ? "bg-[#2D9632]" : ""
          } ${row.status === "Pending" ? "bg-[#BAB21D]" : ""} ${
            row.status === "Reviewing" ? "bg-[#71839B]" : ""
          } `}
        >
          {row.status}
        </p>
      </td>
      <td className="px-4 py-4 ">
        <div className="flex items-center space-x-3">
          <div className="cursor-pointer hover:bg-gray-50 p-1 rounded-full">
            <Edit2 size="22" color="#545454" />
          </div>
          <div
            onClick={() =>
              navigate({
                to: `${APPLICATIONS}/${row["application id"]}`,
                search: {
                  status: row.status as string,
                },
              })
            }
            className="cursor-pointer hover:bg-gray-50 p-1 rounded-full"
          >
            <Eye size="22" color="#545454" />
          </div>
          <div className="cursor-pointer hover:bg-gray-50 p-1 rounded-full">
            <Trash size="22" color="#FF8A65" />
          </div>
        </div>
      </td>
    </motion.tr>
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000); // Simulating a 3-second data load
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="p-5">
      <Table
        headers={headers}
        showAddButton={true}
        addButtonText="Apply For Support"
        onAddButtonClick={() => navigate({ to: APPLY_SUPPORT })}
        rows={rows}
        renderRow={customRowRenderer}
        footer={<div>Pagination goes here</div>}
        maxRows={5}
        loading={loading}
        searchableFields={["application id"]}
        filters={[
          { name: "status", fields: ["Reviewing", "Approved", "Pending"] },
          {
            name: "category",
            fields: ["Emergency Support", "Aid", "Revolving Fund"],
          },
        ]}
      />
    </div>
  );
};

export default Applications;
