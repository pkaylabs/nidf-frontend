import { ADD_DIBURSEMENT, ADMIN_NOTIFICATIONS } from "@/constants/page-path";
import React from "react";
import { Link, useNavigate } from "react-location";

const applicationOverview = [
  {
    title: "Pending",
    value: "100",
  },
  {
    title: "Approved",
    value: "50",
  },
  {
    title: "Rejected",
    value: "50",
  },
];
const finacialSummary = [
  {
    title: "Total Disbursed",
    value: "GHS 350,000",
  },
  {
    title: "Total Repayments",
    value: "GHS 250,000",
  },
  {
    title: "Outstanding",
    value: "GHS 100,000",
  },
];

const quickActions = [
  {
    title: "Create Applications",
    bg: "bg-[#2B7BE4]",
    to: "/admin/applications/create",
  },
  {
    title: "Create Disbursment",
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
  return (
    <main className="font-poppins p-5">
      <h2 className="font-medium text-3xl text-[#252525] ">
        Welcome Back, Prince!
      </h2>

      <section className="my-5">
        <div className="bg-white p-5 rounded-md mb-5">
          <h5 className="font-medium text-xl text-[#454545] mb-5 ">
            Applications Overview
          </h5>

          <div className="flex items-center gap-4 justify-between ">
            {applicationOverview.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md border border-[#71839B] py-4 px-5 shadow w-1/3"
              >
                <h5 className="font-light text-xl text-[#545454] mb-3">
                  {item.title}
                </h5>
                <h3 className="font-semibold text-3xl text-[#545454]">
                  {item.value}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-md mb-5 ">
          <h5 className="font-medium text-xl text-[#454545] mb-5 ">
            Financial Summary
          </h5>

          <div className="flex items-center gap-4 justify-between ">
            {finacialSummary.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md border border-[#71839B] py-4 px-5 shadow w-1/3"
              >
                <h5 className="font-light text-xl text-[#545454] mb-3">
                  {item.title}
                </h5>
                <h3 className="font-semibold text-3xl text-[#545454]">
                  {item.value}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-md mb-5 ">
          <h5 className="font-medium text-xl text-[#454545] mb-5 ">
            Quick Actions
          </h5>

          <div className="flex items-center gap-4 justify-between ">
            {quickActions.map((item, index) => (
              <button
                onClick={() => navigate({ to: item.to })}
                key={index}
                className={`${item.bg} p-4 h-28 flex justify-center items-center rounded-md py-4 px-5 shadow w-1/3`}
              >
                <h5 className="font-light text-xl text-white ">
                  {item.title}
                </h5>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
