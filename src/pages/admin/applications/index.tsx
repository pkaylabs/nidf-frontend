import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-location";
import { motion } from "framer-motion";
import { Edit2, Eye, Trash } from "iconsax-react";
import Table from "@/components/table";
import { ADMIN_APPLICATIONS, CREATE_APPLICATIONS } from "@/constants/page-path";

const AdminApplications = () => {
  const navigate = useNavigate();

  const headers = [
    { name: "Application ID", value: "application id" },
    { name: "Applicants", value: "applicant" },
    { name: "Category", value: "category" },
    { name: "Submitted Date", value: "submitted date" },
    { name: "Status", value: "status" },
    { name: "Action", value: "action" },
  ];

  const rows = [
    {
      "application id": "APP-12345",
      applicant: "DLCF Legon",
      category: "Emergency Support",
      "submitted date": "Jan 15, 2025",
      status: "Rejected",
    },
    {
      "application id": "BPP-12345",
      applicant: "DLCF Legon",
      category: "Aid",
      "submitted date": "Jan 15, 2025",
      status: "Approved",
    },
    {
      "application id": "CPP-12345",
      applicant: "DLCF Legon",
      category: "Revolving Fund",
      "submitted date": "Jan 15, 2025",
      status: "Pending",
    },
    {
      "application id": "DPP-12345",
      applicant: "DLCF Legon",
      category: "Emergency Support",
      "submitted date": "Jan 15, 2025",
      status: "Pending",
    },
    {
      "application id": "APP-12345",
      applicant: "DLCF Legon",
      category: "Emergency Support",
      "submitted date": "Jan 15, 2025",
      status: "Pending",
    },
    {
      "application id": "BPP-12345",
      applicant: "DLCF Legon",
      category: "Aid",
      "submitted date": "Jan 15, 2025",
      status: "Approved",
    },
    {
      "application id": "CPP-12345",
      applicant: "DLCF Legon",
      category: "Revolving Fund",
      "submitted date": "Jan 15, 2025",
      status: "Pending",
    },
    {
      "application id": "DPP-12345",
      applicant: "DLCF Legon",
      category: "Emergency Support",
      "submitted date": "Jan 15, 2025",
      status: "Rejected",
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
      <td className="px-4 py-3 ">{row.applicant}</td>
      <td className="px-4 py-3">{row.category}</td>
      <td className="px-4 py-3 ">{row["submitted date"]}</td>
      <td className="px-4 py-3 ">
        <p
          className={`text-[#F5F5F5] text-base py-1 rounded-md text-center ${
            row.status === "Approved" ? "bg-[#2D9632]" : ""
          } ${row.status === "Pending" ? "bg-[#71839B]" : ""} ${
            row.status === "Rejected" ? "bg-[#F75656]" : ""
          } `}
        >
          {row.status}
        </p>
      </td>
      <td className="px-4 py-4 ">
        <button
          onClick={() =>
            navigate({
              to: `${ADMIN_APPLICATIONS}/${row["application id"]}`,
              search: {
                status: row.status as string,
              },
            })
          }
          className={`w-full text-[#71839B] text-base py-1 rounded-md text-center border border-[#71839B]  `}
        >
          View
        </button>
       
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
        addButtonText="Create Applications"
        onAddButtonClick={() => navigate({ to: CREATE_APPLICATIONS })}
        rows={rows}
        renderRow={customRowRenderer}
        footer={<div>Pagination goes here</div>}
        maxRows={5}
        loading={loading}
        searchableFields={["application id"]}
        filters={[
          { name: "status", fields: ["Rejected", "Approved", "Pending"] },
          {
            name: "category",
            fields: ["Emergency Support", "Aid", "Revolving Fund"],
          },
        ]}
      />
    </div>
  );
};

export default AdminApplications;
