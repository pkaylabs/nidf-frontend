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
  const [pagNumb, setPagNumb] = useState<number>(10);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPagNumb(Number(e.target.value));
  };

  const headers = [
    { name: "Application ID", value: "application id" },
    { name: "Applicants", value: "applicant" },
    { name: "Category", value: "category" },
    { name: "Is Emergency", value: "is_emergency" },
    { name: "Submitted Date", value: "submitted date" },
    { name: "Status", value: "status" },
    { name: "Action", value: "action" },
  ];

  const { data, isLoading, refetch, isError } = useGetApplicationsQuery({});
  const rows = data ?? [];

  interface RowData {
    church?: {
      location_name?: string;
      pastor_name: string;
      district?: {
        name?: string;
      };
    };
    status?: string;
    [key: string]: any;
  }

  const customRowRenderer = (row: RowData, index: number) => (
    <motion.tr
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="font-poppins border-b  text-black  border-gray-200 hover:bg-gray-100 transition-all duration-150 ease-in-out"
    >
      <td className="px-4 py-3 truncate">{row?.application_id}</td>
      <td className="px-4 py-3 truncate">{row?.church?.location_name}</td>
      <td className="px-4 py-3 truncate">{row?.support_type}</td>
      <td className="px-4 py-3 truncate capitalize">
       {row?.is_emergency ? "Yes" : "No"}
      </td>
      <td className="px-4 py-3 truncate">
        {row?.created_at && typeof row.created_at === "string"
          ? moment(row.created_at).format("LL")
          : "N/A"}
      </td>
      <td className="px-4 py-3 truncate">
        <p
          className={`text-[#F5F5F5] text-xs md:text-sm px-1.5 py-2 rounded-md text-center truncate max-w-36 !capitalize ${
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
        <button
          onClick={() =>
            navigate({
              to: `${ADMIN_APPLICATIONS}/${row?.application_id}`,
              search: {
                id: row.id as string,
                status: row.status as string,
                church_name: row?.church?.location_name,
                division: row?.church?.district?.name as string,
                pastor: row?.church?.pastor_name as string,
                project_location: row?.project_location as string,
                project_phase: row?.phase as string,
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
          className={`w-full flex justify-center items-center text-[#71839B] text-base py-1 rounded-md text-center md:border border-[#71839B]
            hover:bg-primary-100 hover:text-white transition-all duration-150 ease-in-out `}
        >
          <p className="hidden md:block">View</p>
          <Eye size={"20"} color="black" className="hidden mobile:block" />
        </button>
      </td>
    </motion.tr>
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="p-3 md:p-5">
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
        addButtonText="Create Applications"
        onAddButtonClick={() => navigate({ to: CREATE_APPLICATIONS })}
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
              "DRAFT",
              "PENDING REVIEW",
              "APPROVED",
              "REJECTED",
              "UNDER REVIEW",
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

export default AdminApplications;
