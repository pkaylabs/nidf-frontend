import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useSearch } from "react-location";
import { RxDownload } from "react-icons/rx";
import { motion } from "framer-motion";
import AppDetailsComponent from "./components/app-details";
import ProgressReportingComponent from "./components/progress-reporting";
import Documents from "./components/docs";

const summery = [
  {
    title: "Application ID",
    value: "APP-12345",
  },
  {
    title: "Amount Requested",
    value: "GHS 50,000",
  },
  {
    title: "Amount Approved",
    value: "GHS 40,000",
  },
  {
    title: "Date Submitted",
    value: "Jan 10, 2025",
  },
];

interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const Tab = ({ label, active, onClick }: TabProps) => (
  <button
    onClick={onClick}
    className={`font-poppins px-4 py-2 text-lg  transition-colors duration-300 ${
      active
        ? " font-medium bg-primary-50 text-white rounded-md shadow-sm"
        : "border-transparent text-[#545454]"
    }`}
  >
    {label}
  </button>
);



const ViewApplicationDetail = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleTabClick = (index: number) => {
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
  };

  const navigate = useNavigate();
  const search = useSearch<any>();
  const status = search.status;

  const tabs = [
    { label: "Application Details", component: <AppDetailsComponent /> },
    { label: "Progress Reporting", component: <ProgressReportingComponent /> },
    { label: "Documents", component: <Documents data={status} /> },
  ];

  return (
    <main className="font-poppins p-5">
      <div className="flex items-center gap-x-4">
        <button
          onClick={() => navigate({ to: ".." })}
          className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2.5 px-4 rounded-md transition-all duration-150 ease-in-out "
        >
          <IoIosArrowRoundBack className="size-5" aria-hidden="true" />{" "}
          <span>Back to Progress</span>
        </button>
        <h4 className="font-medium text-2xl text-[#252525] ">
          Aid Application Details
        </h4>
      </div>
      <p className="font-light text-xl text-[#545454] my-5">
        Track, update, and view information regarding your aid application.
      </p>

      <section className="p-8 bg-white rounded-md ">
        <div className="flex justify-between items-center gap-5 ">
          <h4 className="font-medium text-xl text-[#454545] ">
            Application Summary
          </h4>

          <p
            className={`text-[#F5F5F5] text-base py-1.5 px-4 rounded-md text-center ${
              status === "Approved" ? "bg-[#2D9632]" : ""
            } ${status === "Pending" ? "bg-[#BAB21D]" : ""} ${
              status === "Reviewing" ? "bg-[#71839B]" : ""
            } `}
          >
            {status}
          </p>
        </div>

        <div className="flex justify-between gap-4 mt-10">
          {summery.map((item, index) => (
            <div key={index} className="flex flex-col gap-1 ">
              <p className="font-light text-[#545454] mb-1.5">{item.title}</p>
              <p className="font-semibold  text-2xl text-[#252525] ">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex space-x-4 flex-wrap items-center mt-5">
          {["Download Acceptance Aggreement", "Download Award Letter"].map(
            (item, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 cursor-pointer border-[0.8px] border-[#545454] bg-[#F7F7F7] text-black px-3 py-2 rounded-md text-center"
              >
                <RxDownload className="size-6" aria-hidden="true" />
                <span>{item}</span>
              </div>
            )
          )}
        </div>
      </section>

      <div className="mt-10">
        <div className="flex  bg-white rounded-md px-6 py-3 space-x-6 mb-6 ">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              active={activeTab === index}
              onClick={() => handleTabClick(index)}
            />
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ x: direction * 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction * -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-white rounded-md p-4"
        >
          {tabs[activeTab].component}
        </motion.div>
      </div>
    </main>
  );
};

export default ViewApplicationDetail;
