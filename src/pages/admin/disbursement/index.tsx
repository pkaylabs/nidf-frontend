import React, { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-location";
import { LiaFileAltSolid } from "react-icons/lia";
import Table from "@/components/table";
import { ADD_DIBURSEMENT } from "@/constants/page-path";
import { useGetDisbursementsQuery } from "@/redux/features/disbursements/disbursementsApiSlice";
import { computeSignature } from "@/helpers";
import moment from "moment";

const Disbursement = () => {
  const [pagNumb, setPagNumb] = useState<number>(10);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPagNumb(Number(e.target.value));
  };

  const navigate = useNavigate();

  const headers = [{ name: "Status", value: "status" }];

  const { data, isLoading, refetch, isError } = useGetDisbursementsQuery({});
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
      className="font-poppins border-b md:text-lg  text-black  border-gray-200 hover:bg-gray-100 transition-all duration-150 ease-in-out"
    >
      <td className="px-4 py-3 ">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-[0.5px] border-[#71839B] rounded-md shadow-sm p-3 md:p-6 mb-3 md:mb-5">
          <div className="">
            <h4 className="font-semibold md:text-xl text-[#454545] ">
              {row?.application?.purpose}
            </h4>
            <p className="font-light text-[#545454] my-3">
              Payment Date: {moment(row?.date_paid).format("LL") ?? "N/A"}{" "}
            </p>
            <p className="font-light text-[#545454] my-3">
              Account Number: {row?.account_number}
            </p>

            <p className="font-light text-[#545454]">
              Ref: {row?.payment_reference}{" "}
            </p>
          </div>
          <div className="">
            <h5 className="font-bold text-lg md:text-2xl text-[#252525] mb-3">
              GHS {row?.amount ?? "0"}
            </h5>
            <h6
              className={`font-semibold md:text-lg ${
                row.status === "COMPLETED" ? "text-[#2D9632]" : "text-[#AD6915]"
              }  mb-3`}
            >
              {row.status}
            </h6>
            <button
              onClick={() => {
                // Build your query data object
                const queryData = {
                  status: row?.status?.toString().trim(),
                  reference: row?.payment_reference?.toString().trim(),
                  project_name: row?.application?.purpose?.toString().trim(),
                  amount: parseFloat(row?.amount).toFixed(2), // Force two decimals
                  payment_date: row?.date_paid?.toString().trim(),
                  account_name: row?.account_name?.toString().trim(),
                  account_num: row?.account_number?.toString().trim(),
                  trans_id: row?.disbursement_id?.toString().trim(),
                  bank_name: row?.bank_name?.toString().trim(),
                };

                // Use an environment variable or other secure means to store your secret
                const secretKey =
                  import.meta.env.REACT_APP_URL_SECRET || "fallback-secret";
                const signature = computeSignature(queryData, secretKey);

                // Navigate with the signature attached
                navigate({
                  to: `/admin/disbursement/${row?.disbursement_id}`,
                  search: {
                    ...queryData,
                    sig: signature,
                  },
                });
              }}
              className="font-poppins font-light w-full md:w-40 h-10 flex justify-center items-center border border-[#324054] rounded-md text-[#324054] hover:bg-[#324054] hover:text-white transition-all duration-200 ease-in-out"
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
        showAddButton={true}
        addButtonText="Add Disbursement"
        onAddButtonClick={() => navigate({ to: ADD_DIBURSEMENT })}
        headers={headers}
        rows={rows}
        renderRow={customRowRenderer}
        footer={<div>Pagination goes here</div>}
        maxRows={pagNumb}
        loading={isLoading}
        searchable
        searchableFields={["project"]}
        filters={[
          { name: "project", fields: [] },
          {
            name: "status",
            fields: ["PENDING REVIEW", "APPROVED", "REJECTED"],
          },
        ]}
      />
    </div>
  );
};

export default Disbursement;
