import React from "react";
import { VscTarget } from "react-icons/vsc";
import { GrPowerCycle } from "react-icons/gr";
import { BsExclamationDiamond } from "react-icons/bs";
import { useNavigate } from "react-location";
import { APPLICATIONS } from "@/constants/page-path";

const applicationTypes = [
  {
    icon: VscTarget,
    title: "Aid Application",
    description: "Financial support for general church activities or projects.",
    link: "/aid-application",
  },
  {
    icon: GrPowerCycle,
    title: "Revolving Fund",
    description: "Short-term loans to support church initiatives.",
    link: "/revolving-fund",
  },
  {
    icon: BsExclamationDiamond,
    title: "Emergency Support",
    description: "Urgent funding for disasters or critical issues.",
    link: "/emergency-support",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <main className="font-poppins">
      {true && (
        <div className="bg-[#A0D1EF] py-4 px-8 flex justify-between items-center ">
          <p className="text-[#324054] text-lg ">
            Your Aid Application <span>(APP-12345)</span> is pending review.
          </p>
          <button
            onClick={() => navigate({ to: APPLICATIONS })}
            className="px-4 py-3 bg-primary text-white text-lg rounded-md "
          >
            See Applications
          </button>
        </div>
      )}

      <div className="px-5 mt-5">
        <h1 className="font-medium text-2xl text-[#252525] ">
          Key Applications
        </h1>

        <section className="flex space-x-5 mt-5">
          {applicationTypes.map((application, index) => (
            <div
              key={index}
              className="flex-1 max-w-96 px-5 py-6 bg-white rounded-md"
            >
              <div className="flex items-center space-x-4">
                <application.icon className="size-7 text-[#454545] " />
                <h2 className="font-medium text-xl text-[#454545]  ">
                  {application.title}
                </h2>
              </div>

              <p className="text-[#6B7280] mt-6">{application.description}</p>
              <button className="w-full mt-6 border border-[#979797]  text-black px-4 py-2 rounded-md hover:bg-gray-50 transition-all duration-150 ease-in-out">
                View Details
              </button>
            </div>
          ))}
        </section>

        <section className="mt-5 bg-white py-6 px-5 rounded-md ">
          <h4 className="font-medium text-xl text-[#454545] ">
            Financial Summary
          </h4>
          <div className="flex space-x-5 mt-7">
            <div className="flex-1 ">
              <p className="font-light text-[#545454] mb-2">
                Total Balance Owed
              </p>
              <h2 className="font-semibold text-[1.75rem] text-[#252525] ">
                GHS 15,000
              </h2>
            </div>
            <div className="flex-1">
              <p className="font-light text-[#545454] mb-2">
                Total Amount Paid
              </p>
              <h2 className="font-semibold text-[1.75rem] text-[#252525] ">
                GHS 5,000
              </h2>
            </div>
            <div className="flex-1 ">
              <p className="font-light text-[#545454] mb-3">Next Payment Due</p>
              <h2 className="font-semibold text-xl text-[#252525] ">
                February 1, 2025
              </h2>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex justify-between items-center mb-4">
              <p className="font-light text-[#545454] ">Repayment Progress</p>
              <p className="font-light text-[#545454]">50%</p>
            </div>
            <div className="w-full h-4 rounded-full bg-[#EBEBEB] ">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: "50%" }}
              ></div>
            </div>
            <p className="font-light text-[#545454] mt-4">
              Last payment: January 10, 2025
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
