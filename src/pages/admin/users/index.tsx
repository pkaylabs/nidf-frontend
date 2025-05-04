import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-location";
import { motion } from "framer-motion";
import { Edit2, Eye, Trash } from "iconsax-react";
import Table from "@/components/table";
import { ADMIN_USERS } from "@/constants/page-path";
import ViewUserModal from "./components/view-modal";
import { useGetUsersQuery } from "@/redux/features/user/userApiSlice";

const Users = () => {
  const navigate = useNavigate();

  const headers = [
    { name: "Name", value: "name" },
    { name: "Type", value: "user_type" },
    { name: "Email", value: "email" },
    { name: "Phone", value: "phone" },
    { name: "Status", value: "status" },
    { name: "Action", value: "action" },
  ];

  const { data, isLoading, refetch, isError } = useGetUsersQuery({});
  // console.log("dataaaaa", data);
  const rows = data ?? [];

  const customRowRenderer = (
    row: { [key: string]: ReactNode },
    index: number
  ) => (
    <motion.tr
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="font-poppins border-b md:text-lg  text-black  border-gray-200 hover:bg-gray-100 transition-all duration-150 ease-in-out"
    >
      <td className="px-4 py-3 text-nowrap">{row?.name}</td>
      <td className="px-4 py-3 text-nowrap capitalize">{row?.user_type}</td>
      <td className="px-4 py-3 text-nowrap">{row?.email}</td>
      <td className="px-4 py-3 text-nowrap">{row?.phone}</td>
      <td className="px-4 py-3 text-nowrap">
        <p
          className={`text-sm md:text-base px-2 py-1 rounded-md text-center ${
            row.is_active
              ? "bg-[#2D9632] bg-opacity-40 text-[#2D9632] "
              : "bg-[#CE5347] bg-opacity-40 text-[#CE5347]"
          } `}
        >
          {row.is_active ? "Active" : "Inactive"}
        </p>
      </td>
      <td className="px-4 py-4 ">
        <div className="flex justify-center items-center gap-3">
          {/* <button
            onClick={() =>
              navigate({
                to: `${ADMIN_USERS}/add`,
                search: {
                  name: row?.name,
                  type: row?.user_type,
                  email: row?.email,
                  phone: row?.phone,
                  status: row?.is_active,
                },
              })
            }
            className={` `}
          >
            <Edit2 size="20" color="#545454" />
          </button> */}
          <button
            onClick={() => {
              setOpenUserModal(true);

              navigate({
                to: `.`,
                search: {
                  name: row?.name,
                  type: row?.user_type,
                  email: row?.email,
                  phone: row?.phone,
                  status: row?.is_active,
                  last_login: row?.last_login,
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
  const [openUserModal, setOpenUserModal] = useState(false);

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data]);

  return (
    <div className="p-3 md:p-5">
      <Table
        headers={headers}
        showAddButton={true}
        addButtonText="Add New User"
        onAddButtonClick={() => navigate({ to: `${ADMIN_USERS}/add` })}
        rows={rows}
        renderRow={customRowRenderer}
        footer={<div>Pagination goes here</div>}
        maxRows={10}
        loading={isLoading}
        searchableFields={["user id", "name", "email", "phone"]}
        filters={[
          {
            name: "user_type",
            fields: ["CHURCH_USER", "ADMIN", "FINANCE_OFFICER"],
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
