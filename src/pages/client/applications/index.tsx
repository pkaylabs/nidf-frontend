import Table from "@/components/table";
import React, { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Eye, Trash } from "iconsax-react";
import { useNavigate } from "react-location";
import {
  APPLICATIONS,
  APPLY_SUPPORT,
  UPDATE_SUPPORT,
} from "@/constants/page-path";
import { useGetApplicationsQuery } from "@/redux/features/applications/applicationsApiSlice";
import moment from "moment";
import { Tooltip } from "react-tooltip";

const Applications = () => {
  const navigate = useNavigate();

  const headers = [
    { name: "Application ID", value: "application id" },
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
      <td className="px-4 py-3">{row?.support_type}</td>
      <td className="px-4 py-3 ">
        {row?.created_at && typeof row.created_at === "string"
          ? moment(row.created_at).format("LL")
          : "N/A"}
      </td>
      <td className="px-4 py-3 select-none">
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
        <div className="flex items-center space-x-3">
          <button
            id={`edit-anchor-${index}`}
            // disabled={!row.id || !row.application_id || row.status !== "DRAFT"}
            onClick={() =>
              navigate({
                to: `${
                  row.id &&
                  row.application_id &&
                  `${UPDATE_SUPPORT}/${row.application_id}`
                } `,
                search: {
                  id: row.id as string,
                  status: (row.status as string) ?? "",
                  application_id: row.application_id as string,
                  support_type: (row.support_type as string) ?? "",
                  type_of_church_project:
                    (row.type_of_church_project as string) ?? "",
                  is_emergency: row.is_emergency ?? false,
                  created_at: (row.created_at as string) ?? "",
                  category: (row.category as string) ?? "",
                  amount: (row.amount as string) ?? "",
                  amount_in_words: (row.amount_in_words as string) ?? "",
                  description: (row.description as string) ?? "",
                  purpose: (row.purpose as string) ?? "",
                  estimated_project_cost:
                    (row.estimated_project_cost as string) ?? "",
                  avg_service_attendance:
                    (row.avg_service_attendance as string) ?? "",
                  project_location: (row.project_location as string) ?? "",
                  phase: (row.phase as string) ?? "",
                  expected_completion_date:
                    (row.expected_completion_date as string) ?? "",

                  avg_monthly_contributions:
                    (row.avg_monthly_contributions as string) ?? "",
                  avg_monthly_expenses:
                    (row.avg_monthly_expenses as string) ?? "",
                  avg_monthly_income: (row.avg_monthly_income as string) ?? "",
                  available_funds_for_project:
                    (row.available_funds_for_project as string) ?? "",
                  current_stage: (row.current_stage as string) ?? null,
                  cost_estimate: (row.cost_estimate as string) ?? null,
                  land_ownership: (row.land_ownership as string) ?? null,
                  invoices: (row.invoices as string) ?? null,
                },
              })
            }
            className="cursor-pointer hover:bg-gray-50 p-1 rounded-full"
          >
            <Edit2 size="22" color="#545454" />
            <Tooltip
              style={{
                fontSize: "12px",
                fontWeight: "300",
                backgroundColor: "#101828",
                color: "#fff",
                borderRadius: "8px",
                marginTop: "10px",
              }}
              anchorSelect={`#edit-anchor-${index}`}
              content={`${
                row.status !== "DRAFT"
                  ? "Only drafted applications can be edited"
                  : "Edit"
              } `}
              className="z-[3]"
            />
          </button>

          <button
            id={`view-anchor-${index}`}
            onClick={() =>
              navigate({
                to: `${APPLICATIONS}/${row?.application_id}`,
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
            className="cursor-pointer hover:bg-gray-50 p-1 rounded-full"
          >
            <Eye size="22" color="#545454" />
            <Tooltip
              style={{
                fontSize: "12px",
                fontWeight: "300",
                backgroundColor: "#101828",
                color: "#fff",
                borderRadius: "8px",
                marginTop: "10px",
              }}
              anchorSelect={`#view-anchor-${index}`}
              content={`View`}
              className="z-[3]"
            />
          </button>

          <button
            id={`delete-anchor-${index}`}
            className="cursor-pointer hover:bg-gray-50 p-1 rounded-full"
          >
            <Trash size="22" color="#FF8A65" />
            <Tooltip
              style={{
                fontSize: "12px",
                fontWeight: "300",
                backgroundColor: "#101828",
                color: "#fff",
                borderRadius: "8px",
                marginTop: "10px",
              }}
              anchorSelect={`#delete-anchor-${index}`}
              content={`${
                row.status !== "DRAFT"
                  ? "Only drafted applications can be deleted"
                  : "Delete"
              } `}
              className="z-[3]"
            />
          </button>
        </div>
      </td>
    </motion.tr>
  );

  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timeout = setTimeout(() => setLoading(false), 3000); // Simulating a 3-second data load
  //   return () => clearTimeout(timeout);
  // }, []);

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

export default Applications;
