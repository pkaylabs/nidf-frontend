import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-location";
import { motion } from "framer-motion";
import Table from "@/components/table";
import { ADMIN_REGIONS } from "@/constants/page-path";
import { Edit2, Trash } from "iconsax-react";
import {
  useDeleteRegionMutation,
  useGetRegionsQuery,
} from "@/redux/features/regions/regionApiSlice";
import Swal from "sweetalert2";
import ButtonLoader from "@/components/loaders/button";

const Regions = () => {
  const navigate = useNavigate();
  const headers = [{ name: "Name", value: "name" }];

  const { data, isLoading, refetch, isError } = useGetRegionsQuery({});
  const rows = data?.region ?? [];

  const [deleteRegion, { isLoading: isDeleting }] = useDeleteRegionMutation();

  const handleDelete = async (id: any) => {
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
            const res = await deleteRegion({ region: id }).unwrap();
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Region successfully deleted!",
              icon: "success",
            });
          } catch (error: any) {
            Swal.fire({
              title: "Error!",
              text: error?.data?.message ?? "An error occurred while deleting the region.",
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
      <td className="px-4 py-3 ">
        <div className="flex justify-between items-center space-x-4 border-[0.5px] border-[#71839B] rounded-md shadow-sm p-6 mb-5">
          <div className="">
            <h4 className="font-semibold text-xl text-[#454545] ">
              {row?.name ?? "N/A"}
            </h4>
            <div className="flex gap-2 items-center">
              <p className="font-light text-[#545454] my-3">
                {row?.districts ?? "0"} Districts
              </p>
              ·
              <p className="font-light text-[#545454] my-3">
                {row?.churches ?? "0"} Churches
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() =>
                navigate({
                  to: `/admin/regions/${row.name}`,
                  search: {
                    id: row?.id,
                    name: row.name,
                    districts: row?.districts,
                    churches: row?.churches,
                    created_by: row?.created_by_user,
                  },
                })
              }
              className="font-poppins font-light w-40 h-12 flex justify-center items-center border border-[#324054] rounded-md text-[#324054] hover:bg-[#324054] hover:text-white transition-all duration-200 ease-in-out "
            >
              View Details
            </button>
            <button
              onClick={() =>
                navigate({
                  to: `${ADMIN_REGIONS}/add`,
                  search: {
                    id: row?.id,
                    name: row.name,
                    email: row?.email,
                    phone: row?.phone,
                    location: row?.location,
                    overseer_name: row?.overseer_name,
                    overseer_email: row?.overseer_email,
                    overseer_phone: row?.overseer_phone,
                  },
                })
              }
              className="font-poppins font-light w-12 h-12 flex justify-center items-center border border-[#324054] rounded-md text-[#324054] hover:text-white transition-all duration-200 ease-in-out "
            >
              <Edit2 size="24" color="#324054" />
            </button>
            <button
              disabled={isDeleting}
              onClick={() => handleDelete(row?.id)}
              className="font-poppins font-light w-12 h-12 flex justify-center text-white items-center border
               border-[#CE5347] bg-[#CE5347] rounded-md transition-all duration-200 ease-in-out disabled:bg-opacity-80 "
            >
              {isDeleting ? (
                <ButtonLoader title="" />
              ) : (
                <Trash size="24" color="#FFF" />
              )}
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
    <div className="p-5">
      <Table
        displayHeader={false}
        showAddButton={true}
        addButtonText="Add New Region"
        onAddButtonClick={() => navigate({ to: `${ADMIN_REGIONS}/add` })}
        headers={headers}
        rows={rows}
        renderRow={customRowRenderer}
        footer={<div>Pagination goes here</div>}
        maxRows={5}
        loading={isLoading}
        searchable={true}
        searchableFields={["name"]}
        //   filters={[
        //     { name: "project", fields: [] },
        //     {
        //       name: "status",
        //       fields: ["Reconciled", "Pending"],
        //     },
        //   ]}
      />
    </div>
  );
};

export default Regions;
