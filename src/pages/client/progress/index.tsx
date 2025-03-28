import { ADD_PROGRESS } from "@/constants/page-path";
import { isImageFileByExtension } from "@/helpers/image-checker";
import {
  useDeleteProgressReportMutation,
  useGetProgressReportsQuery,
} from "@/redux/features/progress/progressApiSlice";
import moment from "moment";
import React, { useEffect } from "react";
import { LiaFileAltSolid } from "react-icons/lia";
import { useNavigate } from "react-location";
import { IoImageOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Table from "@/components/table";

const ProgressReport = () => {
  const navigate = useNavigate();

  const headers = [{ name: "Status", value: "status" }];

  const { data, isLoading, refetch, isError } = useGetProgressReportsQuery({});
  // console.log(data, "data");
  const rows = data ?? [];

  // const isImage = isImageFileByExtension(row);
  const [deleteProgress, { isLoading: isDeleting }] =
    useDeleteProgressReportMutation();

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
            const res = await deleteProgress({ report: id }).unwrap();
            // console.log(res, "res deleting");

            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your progress report has been deleted.",
              icon: "success",
            });
          } catch (error) {
            console.error(error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting the report.",
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
              {" "}
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
                  to: `/progress-report/${row?.report_id}`,

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
            <button
              disabled={isDeleting}
              onClick={() => handleDelete(row?.report_id)}
              className="font-poppins font-light w-40 h-10 flex justify-center items-center border border-[#CE5347] rounded-md text-[#CE5347] hover:bg-[#CE5347] hover:text-white transition-all duratioin-200 ease-in-out "
            >
              Delete
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
    <>
      <div className="p-5">
        <Table
          displayHeader={false}
          showAddButton={true}
          addButtonText="Add Progress Report"
          onAddButtonClick={() => navigate({ to: ADD_PROGRESS })}
          headers={headers}
          rows={rows}
          renderRow={customRowRenderer}
          footer={<div>Pagination goes here</div>}
          maxRows={5}
          loading={isLoading}
          searchable={false}
          searchableFields={["application id"]}
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
    </>
  );
};

export default ProgressReport;
