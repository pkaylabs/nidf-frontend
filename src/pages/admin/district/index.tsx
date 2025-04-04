import Table from "@/components/table";
import { ADMIN_DISTRICTS } from "@/constants/page-path";
import { Edit2, Eye, Trash } from "iconsax-react";
import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-location";
import { motion } from "framer-motion";
import { useGetDivisionsQuery } from "@/redux/features/divisions/divisionApiSlice";

const Districts = () => {
  const navigate = useNavigate();

  const headers = [
    { name: "Division Name", value: "division name" },
    { name: "Region", value: "regions" },
    { name: "Number of Churches", value: "number of churches" },
    { name: "Division Head", value: "division head" },
    { name: "Action", value: "action" },
  ];

  const { data, isLoading, refetch, isError } = useGetDivisionsQuery({});
  console.log(data, "data div");
  const rows = data?.divisions ?? [];

  interface RowData {
    region?: {
      name?: string;
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
      className="font-poppins border-b text-lg  text-black  border-gray-200 hover:bg-gray-100 transition-all duration-150 ease-in-out"
    >
      <td className="px-4 py-3 ">{row?.name ?? "N/A"}</td>
      <td className="px-4 py-3 ">4</td>
      <td className="px-4 py-3">5</td>
      <td className="px-4 py-3 ">{row?.overseer_name ?? "N/A"}</td>

      <td className="px-4 py-4 ">
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              navigate({
                to: `${ADMIN_DISTRICTS}/${row?.name}`,
                search: {
                  name: row.name as string,
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
          <button onClick={() => {}} className={` `}>
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
    <div className="p-5 h-full ">
      <Table
        headers={headers}
        showAddButton={true}
        addButtonText="Add New Division"
        onAddButtonClick={() => navigate({ to: `/${ADMIN_DISTRICTS}/add` })}
        rows={rows}
        renderRow={customRowRenderer}
        footer={<div>Pagination goes here</div>}
        maxRows={5}
        loading={isLoading}
        searchableFields={["district name"]}
        filters={[
          {
            name: "regions",
            fields: [
              "Greater Accra",
              "Ashanti",
              "Northern",
              "Western",
              "Eastern",
              "Central",
              "Volta",
              "Oti",
              "Upper East",
              "Upper West",
              "Bono",
              "Bono East",
              "Ahafo",
              "Savannah",
              "North East",
            ],
          },
        ]}
      />
    </div>
  );
};

export default Districts;
