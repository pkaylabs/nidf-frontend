import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useSearch } from "react-location";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Edit2 } from "iconsax-react";
import { ADMIN_USERS } from "@/constants/page-path";
import moment from "moment";

interface ViewUserModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user?: any;
}

export default function ViewUserModal({
  open,
  setOpen,
  user,
}: ViewUserModalProps) {
  const navigate = useNavigate();
  const search = useSearch<any>();

  const data = [
    {
      name: "Full Name:",
      value: search?.name,
    },
    {
      name: "Email Address:",
      value: search?.email,
    },
    {
      name: "Phone Number:",
      value: search?.phone,
    },
    {
      name: "Role:",
      value: search?.type,
    },
    {
      name: "Assigned Region:",
      value: "Greater Accra",
    },
    {
      name: "Last Login:",
      value: `${moment(search?.last_login).format("LL") ?? "N/A"}`,
    },
    {
      name: "Status:",
      value: search?.status,
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={setOpen}
      className="font-poppins relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate({
                    to: "..",
                  });
                }}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-2xl font-semibold text-gray-900"
                >
                  User Details
                </DialogTitle>
                <div className="mt-2">
                  <p className="font-light text-lg text-[#71839B] ">
                    View detailed information about this user
                  </p>
                </div>

                <div className="w-full py-5">
                  {data.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-3 ">
                      <p className="font-medium  text-lg text-gray-900 flex-1">
                        {item.name}
                      </p>
                      <p
                        className={`text-lg w-fit  flex-[1.5]
                        ${
                          idx === data.length - 1
                            ? item.value
                              ? " text-[#2D9632] "
                              : " text-[#CE5347] "
                            : "text-[#737373]"
                        } `}
                      >
                        <span
                          className={`
                             ${
                               idx === data.length - 1
                                 ? item.value
                                   ? "bg-[#2D9632] bg-opacity-40 p-1 px-4 rounded-md"
                                   : "bg-[#CE5347] bg-opacity-40 p-1 px-4 rounded-md "
                                 : "text-[#737373]"
                             } 

                            `}
                        >
                          {idx === data.length - 1
                            ? item.value
                              ? "Active"
                              : "Inactive"
                            : item.value}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="mt-5 flex items-center gap-3 ">
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate({
                      to: "..",
                    });
                  }}
                  className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2 px-4 rounded-md transition-all"
                >
                  <IoIosArrowRoundBack className="size-5" />
                  <span>Back to List</span>
                </button>
                {/* <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    navigate({
                      to: `${ADMIN_USERS}/add`,
                      search: {
                        name: search?.name,
                        email: search?.email,
                        phone: search?.phone,
                        type: search?.user_type,
                        status: search?.status,
                      },
                    });
                  }}
                  className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2 px-4 rounded-md transition-all"
                >
                  <Edit2 size="20" color="#545454" />
                  <span>Edit User</span>
                </button> */}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
