import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Edit2, Eye, Trash } from "iconsax-react";
import { useState } from "react";
import Table from "@/components/table";
import { LiaFileAltSolid } from "react-icons/lia";
import { ADD_REPAYMENT } from "@/constants/page-path";
import { useNavigate } from "react-location";
import { useGetRepaymentsQuery } from "@/redux/features/repayment/repaymentApiSlice";
import moment from "moment";
import { isImageFileByExtension } from "@/helpers/image-checker";
import { IoImageOutline } from "react-icons/io5";

const Repayment = () => {
  const navigate = useNavigate();

  const headers = [{ name: "Status", value: "status" }];

  // const rows = [
  //   {
  //     "application id": "APP-12345",
  //     category: "Emergency Support",
  //     "submitted date": "Jan 15, 2025",
  //     status: "Reconciled",
  //   },
  //   {
  //     "application id": "BPP-12345",
  //     category: "Aid",
  //     "submitted date": "Jan 15, 2025",
  //     status: "Pending",
  //   },
  //   {
  //     "application id": "CPP-12345",
  //     category: "Revolving Fund",
  //     "submitted date": "Jan 15, 2025",
  //     status: "Pending",
  //   },
  //   {
  //     "application id": "DPP-12345",
  //     category: "Emergency Support",
  //     "submitted date": "Jan 15, 2025",
  //     status: "Reconciled",
  //   },
  //   {
  //     "application id": "APP-12345",
  //     category: "Emergency Support",
  //     "submitted date": "Jan 15, 2025",
  //     status: "Reconciled",
  //   },
  //   {
  //     "application id": "BPP-12345",
  //     category: "Aid",
  //     "submitted date": "Jan 15, 2025",
  //     status: "Pending",
  //   },
  //   {
  //     "application id": "CPP-12345",
  //     category: "Revolving Fund",
  //     "submitted date": "Jan 15, 2025",
  //     status: "Pending",
  //   },
  //   {
  //     "application id": "DPP-12345",
  //     category: "Emergency Support",
  //     "submitted date": "Jan 15, 2025",
  //     status: "Pending",
  //   },
  // ];

  const { data, isLoading, refetch, isError } = useGetRepaymentsQuery({});
  console.log(data, "data");
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
              Payment Date: {moment(row?.date_paid).format("LL")}
            </p>
            <h6 className="font-medium text-lg text-[#454545] mb-3">
              GHS {row?.amount}
            </h6>
            <h6
              className={`font-semibold text-lg 
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

                <p className="font-light text-[#545454]">
                  {row?.proof_of_payment?.replace("/assets/repayments/", "")}
                </p>
              </div>
            </div>
            <p className="font-light text-[#545454] mt-3">
              Ref: {row?.payment_reference}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() =>
                navigate({
                  to: `/repayment/${row?.repayment_id}`,
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
              className="font-poppins font-light w-40 h-10 flex justify-center items-center border border-[#324054] rounded-md text-[#324054] hover:bg-[#324054] hover:text-white transition-all duration-200 ease-in-out "
            >
              View Details
            </button>
            <button className="font-poppins font-light w-40 h-10 flex justify-center items-center border border-[#CE5347] rounded-md text-[#CE5347] hover:bg-[#CE5347] hover:text-white transition-all duratioin-200 ease-in-out ">
              Delete
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
        addButtonText="Add Repayment"
        onAddButtonClick={() => navigate({ to: ADD_REPAYMENT })}
        headers={headers}
        rows={rows}
        renderRow={customRowRenderer}
        footer={<div>Pagination goes here</div>}
        maxRows={5}
        loading={loading}
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
