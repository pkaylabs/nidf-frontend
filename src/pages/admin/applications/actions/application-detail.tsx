import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useSearch } from "react-location";
import ApplicationDetail from "./components/application-detail";
import SupportingDocuments from "./components/supporting-docs";
import ApprovalLog from "./components/approval-log";
import { motion } from "framer-motion";
import { IoCheckmark } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import AdditionalInfoModal from "./components/additional-info-modal";
import { useProcessApplicationMutation } from "@/redux/features/applications/applicationsApiSlice";
import Swal from "sweetalert2";

import { statuses } from "@/constants";
import ButtonLoader from "@/components/loaders/button";
import { BACKEND_BASE_URL } from "@/constants/page-path";
import moment from "moment";
import { documentsDataProps } from "@/pages/client/applications/actions/view";
import SelectDropdown from "@/pages/client/applications/support/components/select";

interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
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

const AdminApplicationDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1);

  const search = useSearch<any>();

  const [openAdditionalInfoModal, setOpenAdditionalIfoModal] = useState(false);

  const handleTabClick = (index: number) => {
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
  };

  const navigate = useNavigate();

  const status = search.status;

  const [statusValue, setStatusValue] = useState("");
  //
  const summery = [
    {
      title: "Application ID",
      value: search?.application_id ?? "N/A",
    },
    {
      title: "Award Reference",
      value:
        search?.award_reference?.length > 0
          ? search?.award_reference
          : "--------",
    },
    {
      title: "Applicant Church",
      value: search?.church_name ?? "N/A",
    },
    {
      title: "Amount Requested",
      value: `GHS ${search?.amount ?? "0"}`,
    },
    {
      title: "Division/District",
      value: search?.division ?? "N/A",
    },
  ];

  const applicationDetailData = [
    { name: "Category", value: search?.support_type },
    { name: "Purpose of Aid", value: search?.purpose },
    { name: "Estimated Completion", value: search?.expected_completion_date },
    { name: "Pastor’s Name", value: search?.pastor },
    { name: "Project Location", value: search?.project_location },
    { name: "Project Phase", value: search?.project_phase },
  ];

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

  const [processApplication, { isLoading }] = useProcessApplicationMutation();

  const handleApplicationProcess = async () => {
    if (!statusValue) return alert("Make sure you have selected a status");

    try {
      const res = await processApplication({
        application: search?.application_id,
        status: statusValue,
      }).unwrap();

      console.log(res, "res PROCESSINg");

      if (res) {
        Swal.fire({
          title: "Application status successfully updated!",
          icon: "success",
          draggable: true,
        });

        navigate({ to: ".." });
      } else {
        Swal.fire({
          title: "Error!",
          text: "An error occurred. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  const tabs = [
    {
      label: "Application Details",
      component: <ApplicationDetail data={applicationDetailData} />,
    },
    {
      label: "Supporting Document",
      component: <SupportingDocuments data={documentsData} />,
    },
    { label: "Approval Log", component: <ApprovalLog /> },
  ];

  const handleStatusChange = (val: string) => {
    setStatusValue(val);
  };

  useEffect(() => {
    const validStatus = statuses.find((s) => s.value === status);
    if (validStatus) {
      handleStatusChange(validStatus.value);
    }
  }, [status]);

  return (
    <main className="font-poppins p-3 md:p-5">
      <div className="flex items-center gap-x-4 mb-5">
        <button
          onClick={() => navigate({ to: ".." })}
          className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2.5 px-4 rounded-md transition-all duration-150 ease-in-out "
        >
          <IoIosArrowRoundBack className="size-5" aria-hidden="true" />{" "}
          <span className="hidden md:block">Back to Applications</span>
        </button>
      </div>

      <section className="p-3 md:p-8 bg-white rounded-md">
        <div className="flex justify-between items-center gap-5 ">
          <h4 className="font-medium md:text-xl text-[#454545] ">
            Application Summary
          </h4>

          <p
            className={`text-[#F5F5F5] text-sm md:text-base py-1.5 px-2 md:px-4 rounded-md text-center ${
              search.status === "APPROVED" ? "bg-[#2D9632]" : ""
            }
             
             ${search.status === "PENDING REVIEW" ? "bg-[#BAB21D]" : ""}
            ${search.status === "UNDER REVIEW" ? "bg-[#1da5ba]" : ""}
             ${search.status === "DRAFT" ? "bg-[#71839B]" : ""}
             ${search.status === "WAITING NO'S APPROVAL" ? "bg-[#719b96]" : ""}
             ${search.status === "REJECTED" ? "bg-red" : ""} `}
          >
            {status}
          </p>
        </div>

        <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 mt-10">
          <div className="w-full md:w-2/3 flex flex-wrap justify-between  ">
            {summery.map((item, index) => (
              <div key={index} className="flex flex-col gap-1 w-1/2 mb-6">
                <p className="font-light text-[#545454] mb-1.5">{item.title}</p>
                <p className="font-semibold md:text-2xl text-[#252525] ">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <div className="flex-1 md:pl-8">
            {status !== "DRAFT" &&
              status !== "APPROVED" &&
              status !== "REJECTED" && (
                <>
                  {/* <button
                    disabled={isLoading}
                    onClick={() => handleApplicationProcess("APPROVED")}
                    className="w-full h-11 flex justify-center items-center space-x-3 bg-[#2D9632] rounded-md  text-[#FEFEFE] text-lg mb-5 "
                  >
                    <IoCheckmark className="size-5" aria-hidden="true" />
                    <span>Approve Application</span>
                  </button> */}
                  <div className="mb-5">
                    <label
                      htmlFor="typeOfChurchProject"
                      className="block md:text-lg font-medium text-black"
                    >
                      Select Application Status
                    </label>
                    <SelectDropdown
                      options={statuses}
                      value={statusValue}
                      onChange={handleStatusChange}
                    />
                  </div>
                  <button
                    disabled={isLoading}
                    onClick={() => setOpenAdditionalIfoModal(true)}
                    className="w-full h-11 flex justify-center items-center space-x-3 border border-[#71839B] 
                    rounded-md  text-[#71839B] text-lg mb-5 disabled:bg-opacity-80 "
                  >
                    <span>Request Additional Info</span>
                  </button>
                  <button
                    disabled={isLoading}
                    onClick={handleApplicationProcess}
                    className="w-full h-11 flex justify-center items-center space-x-3 bg-primary rounded-md  text-[#FEFEFE] text-lg  "
                  >
                    {isLoading ? (
                      <ButtonLoader title="Updating..." />
                    ) : (
                      "Update Application Status"
                    )}
                  </button>
                </>
              )}
          </div>
        </div>

        {status === "Approved" && (
          <div className="flex space-x-4 flex-wrap items-center mt-5"></div>
        )}
      </section>

      <div className="mt-8">
        <div className="flex  bg-white rounded-md px-3 md:px-6 py-1.5 md:py-3 space-x-2 md:space-x-6 mb-6 ">
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
      <AdditionalInfoModal
        appID={search?.application_id}
        open={openAdditionalInfoModal}
        setOpen={setOpenAdditionalIfoModal}
      />
    </main>
  );
};
export default AdminApplicationDetails;
