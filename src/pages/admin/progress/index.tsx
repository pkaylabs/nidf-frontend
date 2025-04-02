import Table from "@/components/table";
import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-location";
import { motion } from "framer-motion";
import { LiaFileAltSolid } from "react-icons/lia";
import { useGetProgressReportsQuery } from "@/redux/features/progress/progressApiSlice";
import moment from "moment";
import { isImageFileByExtension } from "@/helpers/image-checker";
import { IoImageOutline } from "react-icons/io5";

const AdminProgressReport = () => {
  const navigate = useNavigate();

  const headers = [{ name: "Status", value: "status" }];

  const { data, isLoading, refetch, isError } = useGetProgressReportsQuery({});
  // console.log(data, "data");
  const rows = data ?? [];

  interface RowData {
    application?: {
      purpose?: string;
      id?: string | number;
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
      className="font-poppins border-b text-lg  text-black  border-gray-200 hover:bg-gray-100 transition-all duration-150 ease-in-out"
    >
      <td className="px-4 py-3 ">
        <div className="flex justify-between items-center space-x-4 border-[0.5px] border-[#71839B] rounded-md shadow-sm p-6 mb-5">
          <div className="">
            <h4 className="font-semibold text-xl text-[#454545] ">
              {row?.application?.purpose ?? "N/A"}
            </h4>
            <p className="font-light text-[#545454] my-3">
              {moment(row?.created_at).format("LL") ?? "N/A"}{" "}
            </p>
            <h6 className="font-medium text-lg text-[#454545] mb-3">
              {row?.progress_description ?? "N/A"}
            </h6>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#EFEFEF] ">
                {isImageFileByExtension(row?.proof_of_progress) ? (
                  <IoImageOutline
                    className="size-5 text-[#545454]"
                    aria-hidden="true"
                  />
                ) : (
                  <LiaFileAltSolid
                    className="size-5 text-[#545454]"
                    aria-hidden="true"
                  />
                )}

                <p className="font-light text-[#545454]">
                  {row?.proof_of_progress.replace("/assets/progress/", "")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() =>
                navigate({
                  to: `admin/progress-report/${row?.report_id}`,
                  search: {
                    id: row?.report_id,
                    status: row?.status ?? "",
                    purpose: row?.application?.purpose,
                    proof_of_progress: row?.proof_of_progress,
                    progress_description: row?.progress_description,
                    created_at: row?.created_at,
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

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="p-5">
      <Table
        displayHeader={false}
        showAddButton={false}
        headers={headers}
        rows={rows}
        renderRow={customRowRenderer}
        footer={<div>Pagination goes here</div>}
        maxRows={5}
        loading={isLoading}
        searchable
        searchableFields={["project"]}
        filters={[
          { name: "reports", fields: [] },
          {
            name: "status",
            fields: [
              "APPROVED",
              "PENDING REVIEW",
              "UNDER REVIEW",
              "DRAFT",
              "WAITING NO`S APPROVAL",
              "REJECTED",
            ],
          },
        ]}
      />
    </div>
  );
};

export default AdminProgressReport;
