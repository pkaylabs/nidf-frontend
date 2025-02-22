// import React from 'react'

// const Users = () => {
//   return (
//     <div>Users</div>
//   )
// }

// export default Users

import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-location";
import { motion } from "framer-motion";
import { Edit2, Eye, Trash } from "iconsax-react";
import Table from "@/components/table";
import {
  ADMIN_APPLICATIONS,
  ADMIN_USERS,
  CREATE_APPLICATIONS,
} from "@/constants/page-path";
import ViewUserModal from "./components/view-modal";

const Users = () => {
  const navigate = useNavigate();

  const headers = [
    { name: "Name", value: "name" },
    { name: "Type", value: "type" },
    { name: "Email", value: "email" },
    { name: "Phone", value: "phone" },
    { name: "Status", value: "status" },
    { name: "Action", value: "action" },
  ];

  const rows = [
    {
      "user id": "APP-12345",
      name: "Prince Kay",
      email: "prince@gmail.com",
      phone: "024567890",
      type: "Admin User",
      status: "Active",
    },
    {
      "user id": "APP-12346",
      name: "Kwame Mensah",
      email: "kwame.mensah@gmail.com",
      phone: "024567891",
      type: "Church User",
      status: "Inactive",
    },
    {
      "user id": "APP-12347",
      name: "Abena Boateng",
      email: "abena.boateng@gmail.com",
      phone: "024567892",
      type: "Finance User",
      status: "Active",
    },
    {
      "user id": "APP-12348",
      name: "Kofi Asante",
      email: "kofi.asante@gmail.com",
      phone: "024567893",
      type: "Admin User",
      status: "Inactive",
    },
    {
      "user id": "APP-12349",
      name: "Ama Agyemang",
      email: "ama.agyemang@gmail.com",
      phone: "024567894",
      type: "Super User",
      status: "Active",
    },
    {
      "user id": "APP-12350",
      name: "Yaw Owusu",
      email: "yaw.owusu@gmail.com",
      phone: "024567895",
      type: "Church User",
      status: "Inactive",
    },
    {
      "user id": "APP-12351",
      name: "Adwoa Opoku",
      email: "adwoa.opoku@gmail.com",
      phone: "024567896",
      type: "Finance User",
      status: "Active",
    },
    {
      "user id": "APP-12352",
      name: "Kojo Addo",
      email: "kojo.addo@gmail.com",
      phone: "024567897",
      type: "Admin User",
      status: "Inactive",
    },
    {
      "user id": "APP-12353",
      name: "Esi Adjei",
      email: "esi.adjei@gmail.com",
      phone: "024567898",
      type: "Church User",
      status: "Active",
    },
    {
      "user id": "APP-12354",
      name: "Mensah Agyapong",
      email: "mensah.agyapong@gmail.com",
      phone: "024567899",
      type: "Finance User",
      status: "Inactive",
    },
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
      <td className="px-4 py-3 ">{row.name}</td>
      <td className="px-4 py-3 ">{row.type}</td>
      <td className="px-4 py-3">{row.email}</td>
      <td className="px-4 py-3 ">{row.phone}</td>
      <td className="px-4 py-3 ">
        <p
          className={` text-base py-1 rounded-md text-center ${
            row.status === "Active"
              ? "bg-[#2D9632] bg-opacity-40 text-[#2D9632] "
              : ""
          } ${
            row.status === "Inactive"
              ? "bg-[#CE5347] bg-opacity-40 text-[#CE5347] "
              : ""
          }  `}
        >
          {row.status}
        </p>
      </td>
      <td className="px-4 py-4 ">
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              navigate({
                to: `#`,
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
            onClick={() => {
              setOpenUserModal(true);

              navigate({
                to: `.`,
                search: {
                  name: row.name,
                  type: row.type,
                  email: row.email,
                  phone: row.phone,
                  status: row.status,
                },
              });
            }}
            className={` `}
          >
            <Eye size="20" color="#545454" />
          </button>
          {/* <button onClick={() => {}} className={` `}>
            <Trash size="20" color="#CE5347" />
          </button> */}
        </div>
      </td>
    </motion.tr>
  );

  const [loading, setLoading] = useState(true);
  const [openUserModal, setOpenUserModal] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000); // Simulating a 3-second data load
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="p-5">
      <Table
        headers={headers}
        showAddButton={true}
        addButtonText="Add New User"
        onAddButtonClick={() => navigate({ to: `${ADMIN_USERS}/add` })}
        rows={rows}
        renderRow={customRowRenderer}
        footer={<div>Pagination goes here</div>}
        maxRows={5}
        loading={loading}
        searchableFields={["user id", "name", "email", "phone"]}
        filters={[
          {
            name: "type",
            fields: ["Church User", "Admin User", "Finance User", "Super User"],
          },
        ]}
      />
      <ViewUserModal
        open={openUserModal}
        setOpen={() => {
          setOpenUserModal(false);
          navigate({
            to: "..",
          });
        }}
      />
    </div>
  );
};

export default Users;
