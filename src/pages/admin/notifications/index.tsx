import Table from "@/components/table";
import { ADMIN_NOTIFICATIONS } from "@/constants/page-path";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-location";
import { motion } from "framer-motion";
import {
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
} from "@/redux/features/notifications/notificationApiSlice";
import moment from "moment";
import ButtonLoader from "@/components/loaders/button";
import { Edit2, Trash } from "iconsax-react";
import Swal from "sweetalert2";
import { useAppSelector } from "@/redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const Notifications = () => {
  const [pagNumb, setPagNumb] = useState<number>(10);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPagNumb(Number(e.target.value));
  };

  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  const headers = [{ name: "Name", value: "name" }];

  const { data, isLoading, refetch, isError } = useGetNotificationsQuery({});
  // console.log(data, "data");
  const rows = data ?? [];

  const [deleteNotification, { isLoading: isDeleting }] =
    useDeleteNotificationMutation();

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
            const res = await deleteNotification({ notification: id }).unwrap();
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Notification successfully deleted!",
              icon: "success",
            });
          } catch (error: any) {
            Swal.fire({
              title: "Error!",
              text:
                error?.data?.message ??
                "An error occurred while deleting the notification.",
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
      className="font-poppins border-b md:text-lg  text-black  border-gray-200 hover:bg-gray-100 transition-all duration-150 ease-in-out"
    >
      <td className="px-4 py-3 ">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-[0.5px] border-[#71839B] rounded-md shadow-sm p-3 md:p-6 mb-5">
          <div className="">
            <h4 className="font-semibold md:text-xl text-[#454545] ">
              {row.title}
            </h4>

            <p className=" text-[#545454] md:text-lg my-3">{row?.message}</p>

            <p className="font-light text-[#545454] my-3">
              Recipients: <span className="font-semibold">{row?.target}</span>
              {"  "}
              {row?.is_scheduled ? (
                <>
                  Schedule:{" "}
                  <span className="font-semibold">
                    {typeof row?.schedule_start_date === "string" ||
                    typeof row?.schedule_start_date === "number" ||
                    row?.schedule_start_date instanceof Date
                      ? moment(row.schedule_start_date).format("LL")
                      : "No date"}{" "}
                    -{" "}
                    {typeof row?.schedule_start_end === "string" ||
                    typeof row?.schedule_start_end === "number" ||
                    row?.schedule_start_end instanceof Date
                      ? moment(row.schedule_start_end).format("LL")
                      : "No date"}{" "}
                    ({row?.schedule_frequency})
                  </span>
                </>
              ) : (
                ", Not Scheduled"
              )}
            </p>
          </div>
          <div className="flex flex-col items-end  gap-3">
            <p
              className={`font-semibold md:text-lg  ${
                !row?.is_scheduled ? "text-[#2D9632]" : "text-[#AD6915] "
              } my-3`}
            >
              {row.is_scheduled ? "Scheduled" : "Sent"}
            </p>
            <button
              onClick={() =>
                navigate({
                  to: `/admin/notifications/${row?.id}`,
                  search: {
                    title: row?.title,
                    message: row?.message,
                    target: row?.target,
                    scheduled: row?.is_scheduled,
                    schedule_start_date: row?.schedule_start_date,
                    schedule_start_end: row?.schedule_start_end,
                    schedule_frequency: row?.schedule_frequency,
                    id: row?.id,
                    attachment: row?.attachment,
                  },
                })
              }
              className="hidden md:flex font-poppins font-light w-40 h-12  justify-center items-center border border-[#324054] rounded-md text-[#324054] hover:bg-[#324054] hover:text-white transition-all duration-200 ease-in-out "
            >
              View Details
            </button>
            <div className="w-full md:w-[unset] flex items-center gap-3 mt-3">
              <button
                onClick={() =>
                  navigate({
                    to: `/admin/notifications/${row?.id}`,
                    search: {
                      title: row?.title,
                      message: row?.message,
                      target: row?.target,
                      scheduled: row?.is_scheduled,
                      schedule_start_date: row?.schedule_start_date,
                      schedule_start_end: row?.schedule_start_end,
                      schedule_frequency: row?.schedule_frequency,
                      id: row?.id,
                      attachment: row?.attachment,
                    },
                  })
                }
                className="font-poppins flex-1 font-light w-40 h-12 flex justify-center items-center border border-[#324054] rounded-md text-[#324054] hover:bg-[#324054] hover:text-white transition-all duration-200 ease-in-out "
              >
                View Details
              </button>
              <button
                onClick={() =>
                  navigate({
                    to: `${ADMIN_NOTIFICATIONS}/add`,
                    search: {
                      title: row?.title,
                      message: row?.message,
                      target: row?.target,
                      scheduled: row?.is_scheduled,
                      schedule_start_date: row?.schedule_start_date,
                      schedule_start_end: row?.schedule_start_end,
                      schedule_frequency: row?.schedule_frequency,
                      id: row?.id,
                      attachment: row?.attachment,
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
        showAddButton={
          user?.user_type === "ADMIN" || user?.user_type === "FINANCE_OFFICER"
        }
        addButtonText="Create New Notification"
        onAddButtonClick={() => navigate({ to: `${ADMIN_NOTIFICATIONS}/add` })}
        headers={headers}
        rows={rows}
        renderRow={customRowRenderer}
        footer={<div>Pagination goes here</div>}
        maxRows={pagNumb}
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

export default Notifications;
