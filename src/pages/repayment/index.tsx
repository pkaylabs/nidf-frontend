import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Edit2, Eye, Trash } from "iconsax-react";
import { useState } from "react";
import Table from "@/components/table";
import { LiaFileAltSolid } from "react-icons/lia";
import { ADD_REPAYMENT } from "@/constants/page-path";
import { useNavigate } from "react-location";

const Repayment = () => {
  
  const navigate = useNavigate()

  const headers = [{ name: "Status", value: "status" }];

  const rows = [
    {
      "application id": "APP-12345",
      category: "Emergency Support",
      "submitted date": "Jan 15, 2025",
      status: "Reconciled",
    },
    {
      "application id": "BPP-12345",
      category: "Aid",
      "submitted date": "Jan 15, 2025",
      status: "Pending",
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
      status: "Reconciled",
    },
    {
      "application id": "APP-12345",
      category: "Emergency Support",
      "submitted date": "Jan 15, 2025",
      status: "Reconciled",
    },
    {
      "application id": "BPP-12345",
      category: "Aid",
      "submitted date": "Jan 15, 2025",
      status: "Pending",
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
      status: "Pending",
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
      <td className="px-4 py-3 ">
        <div className="flex justify-between items-center space-x-4 border-[0.5px] border-[#71839B] rounded-md shadow-sm p-6 mb-5">
          <div className="">
            <h4 className="font-semibold text-xl text-[#454545] ">
              Church Hall Renovation
            </h4>
            <p className="font-light text-[#545454] my-3">
              Payment Date: Jan 15, 2025
            </p>
            <h6 className="font-medium text-lg text-[#454545] mb-3">
              GHS 5,000
            </h6>
            <h6
              className={`font-semibold text-lg ${
                row.status === "Reconciled"
                  ? "text-[#2D9632]"
                  : "text-[#AD6915]"
              }  mb-3`}
            >
              {row.status}
            </h6>
            <div className="flex items-center space-x-4">
              {[1, 2].map((_, i) => (
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#EFEFEF] ">
                  <LiaFileAltSolid
                    className="size-5 text-[#545454]"
                    aria-hidden="true"
                  />
                  <p className="font-light text-[#545454]">
                    progress_report.pdf
                  </p>
                </div>
              ))}
            </div>
            <p className="font-light text-[#545454] mt-3">Ref: REF-12345</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="font-poppins font-light w-40 h-10 flex justify-center items-center border border-[#324054] rounded-md text-[#324054] hover:bg-[#324054] hover:text-white transition-all duration-200 ease-in-out ">
              View Details
            </button>
            <button className="font-poppins font-light w-40 h-10 flex justify-center items-center border border-[#CE5347] rounded-md text-[#CE5347] hover:bg-[#CE5347] hover:text-white transition-all duratioin-200 ease-in-out ">
              Delete
            </button>
          </div>
        </div>
      </td>
    </motion.tr>
  );

  const [loading, setLoading] = useState(false);

  return (
    <div className="p-5">
      <Table
        displayHeader={false}
        showAddButton={true}
        addButtonText="Add Repayment"
        onAddButtonClick={() => navigate({ to: ADD_REPAYMENT })}
        headers={headers}
        rows={rows}
        renderRow={customRowRenderer}
        footer={<div>Pagination goes here</div>}
        maxRows={5}
        loading={loading}
        searchable={false}
        searchableFields={["application id"]}
        filters={[
          { name: "project", fields: [] },
          {
            name: "status",
            fields: ["Reconciled", "Pending"],
          },
        ]}
      />
    </div>
  );
};

export default Repayment;
