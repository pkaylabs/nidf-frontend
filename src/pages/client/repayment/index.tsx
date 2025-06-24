import React, { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import Table from "@/components/table";
import { LiaFileAltSolid } from "react-icons/lia";
import { ADD_REPAYMENT } from "@/constants/page-path";
import { useNavigate } from "react-location";
import {
  useDeleteRepaymentMutation,
  useGetRepaymentsQuery,
} from "@/redux/features/repayment/repaymentApiSlice";
import moment from "moment";
import { isImageFileByExtension } from "@/helpers/image-checker";
import { IoImageOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const Repayment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "NIDF | Repayment";
  }, []);

  const headers = [{ name: "Status", value: "status" }];

  const { data, isLoading, refetch, isError } = useGetRepaymentsQuery({});
  console.log(data, "data");
  const rows = data ?? [];

  const [deleteRepayment, { isLoading: isDeleting }] =
    useDeleteRepaymentMutation();

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
            const res = await deleteRepayment({ repayment: id }).unwrap();

            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your repayment reconciliation has been deleted.",
              icon: "success",
            });
          } catch (error: any) {
            console.error(error);
            Swal.fire({
              title: "Error!",
              text:  error?.data?.message ?? "An error occurred while deleting the reconciliation.",
              icon: "error",
            });
          }
        }
      });
    } catch (error: any) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error?.data?.message ?? "An error occurred. Please try again.",
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
      className="font-poppins border-b md:text-lg  text-black  border-gray-200 hover:bg-gray-100 transition-all duration-150 ease-in-out"
    >
      <td className="px-4 py-3 ">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-[0.5px] border-[#71839B] rounded-md shadow-sm p-3 md:p-6 mb-5">
          <div className="">
            <h4 className="font-semibold md:text-xl text-[#454545] ">
              {row?.application?.purpose ?? "N/A"}
            </h4>
            <p className="font-light text-[#545454] my-3">
              Payment Date: {moment(row?.date_paid).format("LL")}
            </p>
            <h6 className="font-medium md:text-lg text-[#454545] mb-3">
              GHS {row?.amount}
            </h6>
            <h6
              className={`font-semibold md:text-lg 
                ${row?.status === "APPROVED" ? "text-[#2D9632]" : ""}
         ${row?.status === "PENDING REVIEW" ? "text-[#BAB21D]" : ""}
        ${row?.status === "UNDER REVIEW" ? "text-[#1da5ba]" : ""}
         ${row?.status === "DRAFT" ? "text-[#71839B]" : ""}
         ${row?.status === "WAITING NO`S APPROVAL" ? "text-[#719b96]" : ""}
         ${row?.status === "REJECTED" ? "text-red" : ""}
               mb-3`}
            >
              {row.status}
            </h6>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#EFEFEF] ">
                {isImageFileByExtension(row?.proof_of_payment) ? (
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

                <p className="font-light text-sm md:text-base text-[#545454]">
                  {row?.proof_of_payment?.replace("/assets/repayments/", "")}
                </p>
              </div>
            </div>
            <p className="font-light text-sm md:text-base text-[#545454] mt-3">
              Ref: {row?.payment_reference ?? "N/A"}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() =>
                navigate({
                  to: `/repayment/${row?.repayment_id}`,
                  search: {
                    id: row?.repayment_id,
                    purpose: row?.application?.purpose,
                    status: row?.status,
                    amount: row?.amount,
                    date_paid: row?.date_paid,
                    proof_of_payment: row?.proof_of_payment,
                    repayment_id: row?.repayment_id,
                    application_id: row?.application?.id,
                    created_at: row?.created_at,
                    payment_reference: row?.payment_reference,
                  },
                })
              }
              className="font-poppins font-light w-full md:w-40 h-10 flex justify-center items-center border border-[#324054] rounded-md text-[#324054] hover:bg-[#324054] hover:text-white transition-all duration-200 ease-in-out "
            >
              View Details
            </button>
            <button
              disabled={isDeleting}
              onClick={() => handleDelete(row?.repayment_id)}
              className="font-poppins font-light w-full md:w-40 h-10 flex justify-center items-center border border-[#CE5347] rounded-md text-[#CE5347] hover:bg-[#CE5347] hover:text-white transition-all duratioin-200 ease-in-out "
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
    <div className="p-3 md:p-5">
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
        loading={isLoading}
        searchable={false}
        searchableFields={["application id"]}
        filters={[
          { name: "project", fields: [] },
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

export default Repayment;
