import { ADD_DIBURSEMENT, ADMIN_NOTIFICATIONS } from "@/constants/page-path";
import { useAppSelector } from "@/redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetDashboardDataQuery } from "@/redux/features/dashbaord/dashbaordApiSlice";
import React from "react";
import { Link, useNavigate } from "react-location";

const quickActions = [
  {
    title: "Create Applications",
    bg: "bg-[#2B7BE4]",
    to: "/admin/applications/create",
  },
  {
    title: "Create Disbursement",
    bg: "bg-[#40BB27]",
    to: ADD_DIBURSEMENT,
  },
  {
    title: "Broadcast Notification",
    bg: "bg-[#E4AC2B]",
    to: `/${ADMIN_NOTIFICATIONS}/add`,
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  const { data, isLoading } = useGetDashboardDataQuery({});

  const applicationOverview = [
    {
      title: "Pending",
      value: data?.total_pending ?? "0",
    },
    {
      title: "Approved",
      value: data?.total_approved ?? "0",
    },
    {
      title: "Rejected",
      value: data?.total_rejected ?? "0",
    },
  ];
  const finacialSummary = [
    {
      title: "Total Disbursed",
      value: data?.total_disbursed ?? "0",
    },
    {
      title: "Total Repayments",
      value: data?.total_repaid ?? "0",
    },
    {
      title: "Outstanding",
      value: data?.outstanding_balance ?? "0",
    },
  ];

  return (
    <main className="font-poppins p-3 md:p-5">
      <h2 className="font-medium text-2xl md:text-3xl text-[#252525] ">
        Welcome {user?.name?.split(" ")[0] ?? "User"}!
      </h2>

      <section className="my-5">
        <div className="bg-white p-3 md:p-5 rounded-md mb-5">
          <h5 className="font-medium text-lg md:text-xl text-[#454545] mb-5 ">
            Applications Overview
          </h5>

          <div className="flex flex-wrap md:flex-nowrap md:items-center gap-4 justify-between ">
            {applicationOverview.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md border border-[#71839B] py-4 px-5 shadow w-full md:w-1/3"
              >
                <h5 className="font-light text-lg md:text-xl text-[#545454] mb-3">
                  {item.title}
                </h5>
                {isLoading ? (
                  <div className=" animate-pulse ">
                    <div className="w-full max-w-64 h-10 rounded bg-gray-300"></div>
                  </div>
                ) : (
                  <h3 className="font-semibold text-2xl md:text-3xl text-[#545454]">
                    {item.value}
                  </h3>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-3 md:p-5 rounded-md mb-5 ">
          <h5 className="font-medium text-lg md:text-xl text-[#454545] mb-5 ">
            Financial Summary
          </h5>

          <div className="flex flex-wrap md:flex-nowrap md:items-center gap-4 justify-between ">
            {finacialSummary.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md border border-[#71839B] py-4 px-5 shadow w-full md:w-1/3"
              >
                <h5 className="font-light text-lg md:text-xl text-[#545454] mb-3">
                  {item.title}
                </h5>
                {isLoading ? (
                  <div className=" animate-pulse ">
                    <div className="w-full max-w-64 h-10 rounded bg-gray-300"></div>
                  </div>
                ) : (
                  <h3 className="font-semibold text-2xl md:text-3xl text-[#545454]">
                    GHS {item.value}
                  </h3>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-3 md:p-5 rounded-md mb-5">
          <h5 className="font-medium text-lg md:text-xl text-[#454545] mb-5">
            Quick Actions
          </h5>

          <div className="flex flex-wrap md:flex-nowrap md:items-center gap-4 justify-between">
            {quickActions.map((item, index) => (
              <button
                onClick={() => navigate({ to: item.to })}
                key={index}
                className={`${item.bg} p-4 h-28 flex justify-center items-center rounded-md py-4 px-5 shadow w-full md:w-1/3`}
              >
                <h5 className="font-light text-xl text-white ">{item.title}</h5>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
