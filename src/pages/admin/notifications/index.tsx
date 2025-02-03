import Table from "@/components/table";
import { ADMIN_NOTIFICATIONS } from "@/constants/page-path";
import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-location";
import { motion } from "framer-motion";

const Notifications = () => {
  const navigate = useNavigate();

  const headers = [{ name: "Name", value: "name" }];

  const rows = [
    {
      name: "Aid Application Open",
      description:
        "Applications for church aid are now open. Please submit before the deadline.",
      target: "All Applicants",
      status: "Sent",
      schedule: "Immediate",
    },
    {
      name: "Repayment Reminder",
      description: "This is your weekly reminder to submit your repayment.",
      target: "Approved Churches",
      status: "Scheduled",
      schedule: "Weekly",
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
              {row.name}
            </h4>

            <p className=" text-[#545454] text-lg my-3">{row.description}</p>

            <p className="font-light text-[#545454] my-3">
              Recipients: {row.target} Schedule: {row.schedule}
            </p>
          </div>
          <div className="flex flex-col items-end  space-x-3">
            <p
              className={`font-semibold text-lg  ${
                row.status === "Sent" ? "text-[#2D9632]" : "text-[#AD6915] "
              } my-3`}
            >
              {row.status}
            </p>
            <button
              onClick={() =>
                navigate({
                  to: `/admin/notifications/${row.name}`,
                  search: {
                    name: row.name,
                    description: row.description,
                    target: row.target,
                    status: row.status,
                    schedule: row.schedule,
                  },
                })
              }
              className="font-poppins font-light w-40 h-12 flex justify-center items-center border border-[#324054] rounded-md text-[#324054] hover:bg-[#324054] hover:text-white transition-all duration-200 ease-in-out "
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
        addButtonText="Create New Notification"
        onAddButtonClick={() => navigate({ to: `${ADMIN_NOTIFICATIONS}/add` })}
        headers={headers}
        rows={rows}
        renderRow={customRowRenderer}
        footer={<div>Pagination goes here</div>}
        maxRows={5}
        loading={loading}
        searchable={true}
        searchableFields={["name"]}
        //   filters={[
        //     { name: "project", fields: [] },
        //     {
        //       name: "status",
        //       fields: ["Reconciled", "Pending"],
        //     },
        //   ]}
      />
    </div>
  );
};

export default Notifications;
