import Table from "@/components/table";
import { ADMIN_DISTRICTS } from "@/constants/page-path";
import { Edit2, Eye, Trash } from "iconsax-react";
import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-location";
import { motion } from "framer-motion";

const Districts = () => {
  const navigate = useNavigate();

  const headers = [
    { name: "District Name", value: "district name" },
    { name: "Region", value: "regions" },
    { name: "Number of Churches", value: "number of churches" },
    { name: "District Head", value: "district head" },
    { name: "Action", value: "action" },
  ];

  const rows = [
    {
      "district name": "Adenta District",
      regions: "Greater Accra",
      "number of churches": "25",
      "district head": "Rev. John Mensah",
    },
    {
      "district name": "Adenta District",
      regions: "Northern",
      "number of churches": "50",
      "district head": "Rev. John Mensah",
    },
    {
      "district name": "Adenta District",
      regions: "Ashanti",
      "number of churches": "89",
      "district head": "Rev. John Mensah",
    },
    // {
    //   "district name": "Adenta District",
    //   region: "",
    //   "number of churches": "566",
    //   "district head": "Rev. John Mensah",
    // },
  ];

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
      <td className="px-4 py-3 ">{row["district name"]}</td>
      <td className="px-4 py-3 ">{row.regions}</td>
      <td className="px-4 py-3">{row["number of churches"]}</td>
      <td className="px-4 py-3 ">{row["district head"]}</td>

      <td className="px-4 py-4 ">
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              navigate({
                to: `${ADMIN_DISTRICTS}/${row["district name"]}`,
                search: {
                  status: row.status as string,
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
                to: `${ADMIN_DISTRICTS}/${row["district name"]}`,
                search: {
                  name: row["district name"] as string,
                  region: row.regions as string,
                  churches: row["number of churches"] as string,
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000); // Simulating a 3-second data load
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="p-5 h-full ">
      <Table
        headers={headers}
        showAddButton={true}
        addButtonText="Add New District"
        onAddButtonClick={() => navigate({ to: `/${ADMIN_DISTRICTS}/add` })}
        rows={rows}
        renderRow={customRowRenderer}
        footer={<div>Pagination goes here</div>}
        maxRows={5}
        loading={loading}
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
