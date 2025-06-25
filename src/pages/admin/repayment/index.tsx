import Table from "@/components/table";
import React, { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-location";
import { LiaFileAltSolid } from "react-icons/lia";
import { useGetRepaymentsQuery } from "@/redux/features/repayment/repaymentApiSlice";
import moment from "moment";
import { isImageFileByExtension } from "@/helpers/image-checker";
import { IoImageOutline } from "react-icons/io5";

const AdminRepayment = () => {
  const [pagNumb, setPagNumb] = useState<number>(10);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPagNumb(Number(e.target.value));
  };

  const navigate = useNavigate();

  const headers = [{ name: "Status", value: "status" }];

  const { data, isLoading, refetch, isError } = useGetRepaymentsQuery({});
  // console.log("dataaaaa", data);
  const rows = data ?? [];

  interface RowData {
    application?: {
      purpose?: string;
      id?: string;
    };
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
      <td className="px-2 md:px-4 py-2 md:py-3 ">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-[0.5px] border-[#71839B] rounded-md shadow-sm p-3 md:p-6 mb-5">
          <div className="">
            <h4 className="font-semibold md:text-xl text-[#454545]">
              {row.application?.purpose ?? "N/A"}
            </h4>
            <p className="font-light text-[#545454] my-3">
              Payment Date: {moment(data?.date_paid).format("LL") ?? "N/A"}
            </p>
            <h6 className="font-medium md:text-lg text-[#454545] mb-3">
              GHS {row?.amount ?? "0.00"}
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
              {row?.status ?? "N/A"}
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
            <p className="font-light text-[#545454] mt-3">
              Ref: {row?.payment_reference ?? "N/A"}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() =>
                navigate({
                  to: `admin/repayment/${row?.repayment_id}`,
                  search: {
                    id: row.repayment_id,
                    purpose: row?.application?.purpose,
                    status: row.status,
                    amount: row.amount,
                    date_paid: row.date_paid,
                    proof_of_payment: row.proof_of_payment,
                    repayment_id: row.repayment_id,
                    application_id: row?.application?.id,
                    created_at: row.created_at,
                    payment_reference: row.payment_reference,
                  },
                })
              }
              className="font-poppins font-light w-full md:w-40 h-10 flex justify-center items-center border border-[#324054] rounded-md text-[#324054] hover:bg-[#324054] hover:text-white transition-all duration-200 ease-in-out "
            >
              View Details
            </button>
          </div>
        </div>
      </td>
    </motion.tr>
  );

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data]);

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
        displayHeader={false}
        showAddButton={false}
        headers={headers}
        rows={rows}
        renderRow={customRowRenderer}
        footer={<div>Pagination goes here</div>}
        maxRows={pagNumb}
        loading={isLoading}
        searchable={true}
        searchableFields={["application id", "project"]}
        filters={[
          { name: "project", fields: [] },
          {
            name: "status",
            fields: ["APPROVED", "PENDING REVIEW", "REJECTED"],
          },
        ]}
      />
    </div>
  );
};

export default AdminRepayment;
