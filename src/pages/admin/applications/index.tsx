import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-location";
import { motion } from "framer-motion";
import { Edit2, Eye, Trash } from "iconsax-react";
import Table from "@/components/table";
import { ADMIN_APPLICATIONS, CREATE_APPLICATIONS } from "@/constants/page-path";
import { useGetApplicationsQuery } from "@/redux/features/applications/applicationsApiSlice";
import moment from "moment";

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

  const { data, isLoading, refetch, isError } = useGetApplicationsQuery({});
  console.log(data, "data");
  const rows = data ?? [];

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
      <td className="px-4 py-3 ">{row?.application_id}</td>
      <td className="px-4 py-3 ">{row?.church}</td>
      <td className="px-4 py-3">{row?.support_type}</td>
      <td className="px-4 py-3 ">
        {row?.created_at && typeof row.created_at === "string"
          ? moment(row.created_at).format("LL")
          : "N/A"}
      </td>
      <td className="px-4 py-3 ">
        <p
          className={`text-[#F5F5F5] text-sm py-2 rounded-md text-center !capitalize ${
            row.status === "APPROVED" ? "bg-[#2D9632]" : ""
          }
           
           ${row.status === "PENDING REVIEW" ? "bg-[#BAB21D]" : ""}
          ${row.status === "UNDER REVIEW" ? "bg-[#1da5ba]" : ""}
           ${row.status === "DRAFT" ? "bg-[#71839B]" : ""}
           ${row.status === "WAITING NO`S APPROVAL" ? "bg-[#719b96]" : ""}
           ${row.status === "REJECTED" ? "bg-red" : ""}
            `}
        >
          {row.status}
        </p>
      </td>
      <td className="px-4 py-4 ">
        <button
          onClick={() =>
            navigate({
              to: `${ADMIN_APPLICATIONS}/${row?.application_id}`,
              search: {
                id: row.id as string,
                status: row.status as string,
                application_id: row.application_id,
                support_type: row.support_type as string,
                created_at: row.created_at as string,
                category: row.category as string,
                amount: row.amount as string,
                description: row.description as string,
                purpose: row.purpose as string,
                expected_completion_date:
                  row.expected_completion_date as string,
                current_stage: row.current_stage as string,
                cost_estimate: row.cost_estimate as string,
                land_ownership: row.land_ownership as string,
                invoices: row.invoices as string,
              },
            })
          }
          className={`w-full text-[#71839B] text-base py-1 rounded-md text-center border border-[#71839B]
            hover:bg-primary-100 hover:text-white transition-all duration-150 ease-in-out `}
        >
          View
        </button>
      </td>
    </motion.tr>
  );

  useEffect(() => {
    refetch();
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
        loading={isLoading}
        searchableFields={["application_id"]}
        filters={[
          {
            name: "status",
            fields: [
              "APPROVED",
              "PENDING REVIEW",
              "UNDER REVIEW",
              "DRAFT",
              "REJECTED",
              "WAITING NO`S APPROVAL",
            ],
          },
          {
            name: "support_type",
            fields: ["AID", "REVOLVING_FUND"],
          },
        ]}
      />
    </div>
  );
};

export default AdminApplications;
