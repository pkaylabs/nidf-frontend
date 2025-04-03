import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-location";
import { LiaFileAltSolid } from "react-icons/lia";
import Table from "@/components/table";
import { ADD_DIBURSEMENT } from "@/constants/page-path";

const Disbursement = () => {
  const navigate = useNavigate();

  const headers = [{ name: "Status", value: "status" }];

  const rows = [
    {
      project: "Church Hall Renovation",
      "payment date": "Jan 15, 2025",
      "bank account": "0234XXXXXX",
      reference: "DISB-12345",
      status: "Completed",
    },
    {
      project: "Community Center Project",
      "payment date": "Jan 15, 2025",
      "bank account": "0234XXXXXX",
      reference: "DISB-12389",
      status: "Pending",
    },
    {
      project: "Church Hall Renovation",
      "payment date": "Jan 15, 2025",
      "bank account": "0234XXXXXX",
      reference: "DISB-12565",
      status: "Completed",
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
              {row.project}
            </h4>
            <p className="font-light text-[#545454] my-3">
              Payment Date: {row["payment date"]}
            </p>
            <p className="font-light text-[#545454] my-3">
              Payment Date: {row["bank account"]}
            </p>

            <p className="font-light text-[#545454]">Ref: {row.reference} </p>
          </div>
          <div className="">
            <h5 className="font-bold text-2xl text-[#252525] mb-3">
              GHS 5,000
            </h5>
            <h6
              className={`font-semibold text-lg ${
                row.status === "Completed" ? "text-[#2D9632]" : "text-[#AD6915]"
              }  mb-3`}
            >
              {row.status}
            </h6>
            <button
              onClick={() =>
                navigate({
                  to: `/admin/disbursement/${row.reference}`,
                  search: {
                    status: row.status,
                    reference: row.reference,
                  },
                })
              }
              className="font-poppins font-light w-40 h-10 flex justify-center items-center border border-[#324054] rounded-md text-[#324054] hover:bg-[#324054] hover:text-white transition-all duration-200 ease-in-out "
            >
              View Details
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
        addButtonText="Add Disbursement"
        onAddButtonClick={() => navigate({ to: ADD_DIBURSEMENT })}
        headers={headers}
        rows={rows}
        renderRow={customRowRenderer}
        footer={<div>Pagination goes here</div>}
        maxRows={5}
        loading={loading}
        searchable
        searchableFields={["project"]}
        filters={[
          { name: "project", fields: [] },
          {
            name: "status",
            fields: ["Completed", "Pending"],
          },
        ]}
      />
    </div>
  );
};

export default Disbursement;
