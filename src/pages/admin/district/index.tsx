import Table from "@/components/table";
import { ADMIN_DISTRICTS } from "@/constants/page-path";
import { Edit2, Eye, Trash } from "iconsax-react";
import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-location";
import { motion } from "framer-motion";
import {
  useDeleteDivisionMutation,
  useGetDivisionsQuery,
} from "@/redux/features/divisions/divisionApiSlice";
import Swal from "sweetalert2";
import { useGetRegionsQuery } from "@/redux/features/regions/regionApiSlice";

const Districts = () => {
  const [pagNumb, setPagNumb] = useState<number>(10);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPagNumb(Number(e.target.value));
  };

  const [regionsList, setRegionsList] = useState([]);

  const navigate = useNavigate();

  const headers = [
    { name: "Division Name", value: "division name" },
    { name: "Region", value: "region" },
    { name: "Number of Churches", value: "number of churches" },
    { name: "Division Head", value: "division head" },
    { name: "Action", value: "action" },
  ];

  const { data, isLoading, refetch, isError } = useGetDivisionsQuery({});
  const rows = data?.divisions ?? [];

  const { data: regionsData } = useGetRegionsQuery({});

  useEffect(() => {
    if (regionsData?.region) {
      const names = regionsData.region.map((region: any) => region.name);
      setRegionsList(names);
    }
  }, [regionsData]);


  const [deleteDivision, { isLoading: isDeleting }] =
    useDeleteDivisionMutation();

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
            const res = await deleteDivision({ division: id }).unwrap();
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Division successfully deleted!",
              icon: "success",
            });
          } catch (error: any) {
            Swal.fire({
              title: "Error!",
              text:
                error?.data?.message ??
                "An error occurred while deleting the division.",
              icon: "error",
            });
          }
        }
      });
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error?.data?.message ?? "An error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  interface RowData {
    region?: {
      name?: string;
      id?: any;
    };
    name?: string;
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
      <td className="px-4 py-3 text-nowrap">{row?.name ?? "N/A"}</td>
      <td className="px-4 py-3 text-nowrap">{row?.region?.name ?? "0"}</td>
      <td className="px-4 py-3 text-nowrap">{row?.churches ?? "0"}</td>
      <td className="px-4 py-3 text-nowrap">{row?.overseer_name ?? "N/A"}</td>

      <td className="px-4 py-4 ">
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              navigate({
                to: `/${ADMIN_DISTRICTS}/add`,
                search: {
                  id: row?.id,
                  name: row.name,
                  email: row?.email,
                  phone: row?.phone,
                  location: row?.location,
                  overseer_name: row?.overseer_name,
                  overseer_email: row?.overseer_email,
                  overseer_phone: row?.overseer_phone,
                  region: row?.region?.id,
                },
              })
            }
            className={` `}
          >
            <Edit2 size="20" color="#545454" />
          </button>
          <button
            onClick={() =>
              navigate({
                to: `${ADMIN_DISTRICTS}/${row?.name}`,
                search: {
                  name: row.name as string,
                  region: row?.region?.name as string,
                  churches: row?.churches as string,
                  head: row?.overseer_name as string,
                },
              })
            }
            className={` `}
          >
            <Eye size="20" color="#545454" />
          </button>
          <button
            disabled={isDeleting}
            onClick={() => handleDelete(row?.id)}
            className={` `}
          >
            <Trash size="20" color="#CE5347" />
          </button>
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
    <div className="p-3 md:p-5 h-full ">
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
        addButtonText="Add New Division"
        onAddButtonClick={() => navigate({ to: `/${ADMIN_DISTRICTS}/add` })}
        rows={rows}
        renderRow={customRowRenderer}
        footer={<div>Pagination goes here</div>}
        maxRows={pagNumb}
        loading={isLoading}
        searchableFields={["name", "region"]}
        filters={[
          {
            name: "region",
            fields: regionsList,
          },
        ]}
      />
    </div>
  );
};

export default Districts;
