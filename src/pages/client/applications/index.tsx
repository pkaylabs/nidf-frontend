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
import {
  useDeleteApplicationMutation,
  useGetApplicationsQuery,
} from "@/redux/features/applications/applicationsApiSlice";
import moment from "moment";
import { Tooltip } from "react-tooltip";
import { tooltipStyle } from "@/constants";
import Swal from "sweetalert2";

const Applications = () => {
  const [pagNumb, setPagNumb] = useState<number>(10);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPagNumb(Number(e.target.value));
  };

  const navigate = useNavigate();

  const headers = [
    { name: "Application ID", value: "application id" },
    { name: "Category", value: "category" },
    { name: "Is Emergency", value: "is_emergency" },
    { name: "Submitted Date", value: "submitted date" },
    { name: "Status", value: "status" },
    { name: "Action", value: "action" },
  ];

  useEffect(() => {
    document.title = "NIDF | Applications";
  }, []);

  const { data, isLoading, refetch, isError } = useGetApplicationsQuery({});
  const rows = data ?? [];

  const [deleteApplication, { isLoading: isDeleting }] =
    useDeleteApplicationMutation();

  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#17567E",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteApplication({ application: id }).unwrap();
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your application has been deleted.",
              icon: "success",
            });
          } catch (error) {
            console.error(error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting the application.",
              icon: "error",
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  interface RowData {
    church?: {
      name?: string;
      address?: string;
      pastor_name?: string;
      pastor_email?: string;
      pastor_phone?: string;
    };

    [key: string]: any;
  }

  const customRowRenderer = (row: RowData, index: number) => (
    <motion.tr
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="font-poppins border-b text-lg  text-black  border-gray-200 hover:bg-gray-100 transition-all duration-150 ease-in-out"
    >
      <td className="px-4 py-3 text-sm md:text-base text-nowrap ">
        {row?.application_id}
      </td>
      <td className="px-4 py-3 text-sm md:text-base text-nowrap">
        {row?.support_type}
      </td>
      <td className="px-4 py-3 text-sm md:text-base  text-nowrap capitalize">
        {row?.is_emergency ? "Yes" : "No"}
      </td>
      <td className="px-4 py-3 text-sm md:text-base text-nowrap">
        {row?.created_at && typeof row.created_at === "string"
          ? moment(row.created_at).format("LL")
          : "N/A"}
      </td>
      <td className="px-4 py-3 select-none text-nowrap">
        <p
          className={`text-[#F5F5F5] text-sm py-2 px-2 rounded-md text-center !capitalize truncate max-w-full ${
            row.status === "APPROVED" ? "bg-[#2D9632]" : ""
          }
           
           ${row.status === "PENDING REVIEW" ? "bg-[#BAB21D]" : ""}
          ${row.status === "UNDER REVIEW" ? "bg-[#1da5ba]" : ""}
           ${row.status === "DRAFT" ? "bg-[#71839B]" : ""}
           ${row.status === "WAITING NO'S APPROVAL" ? "bg-[#719b96]" : ""}
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
            disabled={!row.id || !row.application_id || row.status !== "DRAFT"}
            onClick={() =>
              navigate({
                to: `${
                  row.id &&
                  row.application_id &&
                  `${UPDATE_SUPPORT}/${row.application_id}`
                } `,
                search: {
                  id: row.id as string,
                  churchName: row?.church?.name as string,
                  churchAddress: row?.church?.address as string,
                  pastorName: row?.church?.pastor_name as string,
                  pastorEmail: row?.church?.pastor_email as string,
                  pastorPhone: row?.church?.pastor_phone as string,

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
                  purpose: (row.justification_for_aid as string) ?? "",
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
              style={tooltipStyle}
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
                  purpose: row.justification_for_aid as string,
                  award_reference: row.award_reference as string,
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
              style={tooltipStyle}
              anchorSelect={`#view-anchor-${index}`}
              content={`View`}
              className="z-[3]"
            />
          </button>

          <button
            disabled={row.status !== "DRAFT" || isDeleting}
            onClick={() => handleDelete(row?.application_id as string)}
            id={`delete-anchor-${index}`}
            className="cursor-pointer hover:bg-gray-50 p-1 rounded-full"
          >
            <Trash size="22" color="#FF8A65" />
            <Tooltip
              style={tooltipStyle}
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

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="p-2.5 md:p-5">
      <div className="w-full flex justify-end">
        <div className="">
          <label htmlFor="pagination" className="block text-gray-700 mb-1">
            Items per page:
          </label>
          <div className="border border-gray-300 bg-white rounded-md pr-3">
            <select
              id="pagination"
              value={pagNumb}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base  focus:outline-none sm:text-sm rounded-md"
            >
              {[5, 10, 20, 50, 100].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Table
        headers={headers}
        showAddButton={true}
        addButtonText="Start Application"
        onAddButtonClick={() => navigate({ to: APPLY_SUPPORT })}
        rows={rows}
        renderRow={customRowRenderer}
        footer={<div>Pagination goes here</div>}
        maxRows={pagNumb}
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
              "WAITING NO'S APPROVAL",
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
