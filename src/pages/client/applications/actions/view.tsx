import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useSearch } from "react-location";
import { RxDownload } from "react-icons/rx";
import { motion } from "framer-motion";
import AppDetailsComponent from "./components/app-details";
import ProgressReportingComponent from "./components/progress-reporting";
import Documents from "./components/docs";
import moment from "moment";
import { BACKEND_BASE_URL } from "@/constants/page-path";

interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export interface documentsDataProps {
  name: string;
  date: string;
  status: string;
  url: string;
}

const Tab = ({ label, active, onClick }: TabProps) => (
  <button
    onClick={onClick}
    className={`font-poppins px-4 py-2 text-sm md:text-lg  transition-colors duration-300 ${
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
  console.log(search, "search");

  const status = search.status;

  const summery = [
    {
      title: "Application ID",
      value: search?.application_id ?? "N/A",
    },
    {
      title: "Amount Requested",
      value: `GHS ${search?.amount ?? "0.00"}`,
    },
    {
      title: "Amount Approved",
      value: "GHS 40,000",
    },
    {
      title: "Date Submitted",
      value: moment(search.created_at).format("LL") ?? "N/A",
    },
  ];

  const projectDetailsData = {
    purpose: search?.purpose ?? "N/A",
    estimated: search?.expected_completion_date ?? "N/A",
  };
  const progressDetailsData = {
    description: search?.description ?? "N/A",
  };
  const documentsData: documentsDataProps[] = [
    {
      name:
        search?.cost_estimate?.replace(
          "/assets/applications/cost_estimate/",
          ""
        ) ?? "Cost Estimate Document",
      date: moment(search.created_at).format("LL") ?? "N/A",
      status: search.status,
      url:
        BACKEND_BASE_URL.replace("/api-v1/", "").concat(
          search?.cost_estimate
        ) ?? "",
    },
    {
      name:
        search?.current_stage?.replace(
          "/assets/applications/current_stage/",
          ""
        ) ?? "Current Stage Document",
      date: moment(search.created_at).format("LL") ?? "N/A",
      status: search.status,
      url:
        BACKEND_BASE_URL.replace("/api-v1/", "").concat(
          search?.current_stage
        ) ?? "",
    },
    {
      name:
        search?.land_ownership?.replace(
          "/assets/applications/land_ownership/",
          ""
        ) ?? "Land Ownership Document",
      date: moment(search.created_at).format("LL") ?? "N/A",
      status: search.status,
      url:
        BACKEND_BASE_URL.replace("/api-v1/", "").concat(
          search?.land_ownership
        ) ?? "",
    },
    {
      name:
        search?.invoices?.replace("/assets/applications/invoices/", "") ??
        "Invoices",
      date: moment(search.created_at).format("LL") ?? "N/A",
      status: search.status,
      url:
        BACKEND_BASE_URL.replace("/api-v1/", "").concat(search?.invoices) ?? "",
    },
  ];

  const tabs = [
    {
      label: "Application Details",
      component: <AppDetailsComponent data={projectDetailsData} />,
    },
    {
      label: "Progress Reporting",
      component: <ProgressReportingComponent data={progressDetailsData} />,
    },
    { label: "Documents", component: <Documents data={documentsData} /> },
  ];
  //
  return (
    <main className="font-poppins p-3 md:p-5">
      <div className="flex items-center gap-x-4">
        <button
          onClick={() => navigate({ to: ".." })}
          className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2.5 px-4 rounded-md transition-all duration-150 ease-in-out "
        >
          <IoIosArrowRoundBack className="size-5" aria-hidden="true" />{" "}
          <span className="hidden md:block">Back</span>
        </button>
        <h4 className="font-medium text-lg md:text-2xl text-[#252525] ">
          Aid Application Details
        </h4>
      </div>
      <p className="font-light md:text-xl text-[#545454] my-5">
        Track, update, and view information regarding your aid application.
      </p>

      <section className="p-4 md:p-8 bg-white rounded-md ">
        <div className="flex justify-between items-center gap-5 ">
          <h4 className="font-medium md:text-xl text-[#454545] ">
            Application Summary
          </h4>

          <p
            className={`text-[#F5F5F5] text-xs md:text-sm py-2 px-4 rounded-md text-center text-nowrap !capitalize ${
              status === "APPROVED" ? "bg-[#2D9632]" : ""
            }
           
           ${status === "PENDING REVIEW" ? "bg-[#BAB21D]" : ""}
          ${status === "UNDER REVIEW" ? "bg-[#1da5ba]" : ""}
           ${status === "DRAFT" ? "bg-[#71839B]" : ""}
           ${status === "WAITING NO`S APPROVAL" ? "bg-[#719b96]" : ""}
           ${status === "REJECTED" ? "bg-red" : ""}
            `}
          >
            {status}
          </p>
        </div>

        <div className="flex flex-wrap justify-between gap-4 mt-10">
          {summery.map((item, index) => (
            <div key={index} className="flex flex-col gap-1 ">
              <p className="font-light text-sm md:text-base text-[#545454] mb-1.5">
                {item.title}
              </p>
              <p className="font-semibold text-lg md:text-2xl text-[#252525] ">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* {status === "APPROVED" && (
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
        )} */}
        
      </section>

      <div className="mt-8">
        <div className="flex  bg-white rounded-md px-3 md:px-6 py-3 space-x-6 mb-6 ">
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
          className="bg-white rounded-md md:p-4"
        >
          {tabs[activeTab].component}
        </motion.div>
      </div>
    </main>
  );
};

export default ViewApplicationDetail;
