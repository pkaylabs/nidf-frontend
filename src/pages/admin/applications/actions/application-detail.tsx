import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useSearch } from "react-location";
import ApplicationDetail from "./components/application-detail";
import SupportingDocuments from "./components/supporting-docs";
import ApprovalLog from "./components/approval-log";
import { motion } from "framer-motion";
import { IoCheckmark } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import AdditionalInfoModal from "./components/additional-info-modal";

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

const summery = [
  {
    title: "Application ID",
    value: "APP-12345",
  },
  {
    title: "Applicant Church",
    value: "DLCF Legon",
  },
  {
    title: "Amount Requested",
    value: "GHS 40,000",
  },
  {
    title: "Division/District",
    value: "Accra",
  },
];

const AdminApplicationDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1);

  const [openAdditionalInfoModal, setOpenAdditionalIfoModal] = useState(false);

  const handleTabClick = (index: number) => {
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
  };

  const navigate = useNavigate();
  const search = useSearch<any>();
  const status = search.status;

  const tabs = [
    { label: "Application Details", component: <ApplicationDetail /> },
    { label: "Supporting Document", component: <SupportingDocuments /> },
    { label: "Approval Log", component: <ApprovalLog /> },
  ];
  //
  return (
    <main className="font-poppins p-5">
      <div className="flex items-center gap-x-4 mb-5">
        <button
          onClick={() => navigate({ to: ".." })}
          className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2.5 px-4 rounded-md transition-all duration-150 ease-in-out "
        >
          <IoIosArrowRoundBack className="size-5" aria-hidden="true" />{" "}
          <span>Back to Applications</span>
        </button>
      </div>

      <section className="p-8 bg-white rounded-md ">
        <div className="flex justify-between items-center gap-5 ">
          <h4 className="font-medium text-xl text-[#454545] ">
            Application Summary
          </h4>

          <p
            className={`text-[#F5F5F5] text-base py-1.5 px-4 rounded-md text-center ${
              status === "Approved" ? "bg-[#2D9632]" : ""
            } ${status === "Pending" ? "bg-[#71839B]" : ""} ${
              status === "Rejected" ? "bg-[#F75656]" : ""
            } `}
          >
            {status}
          </p>
        </div>

        <div className="flex justify-between gap-4 mt-10">
          <div className="w-2/3 flex flex-wrap justify-between  ">
            {summery.map((item, index) => (
              <div key={index} className="flex flex-col gap-1 w-1/2 mb-6">
                <p className="font-light text-[#545454] mb-1.5">{item.title}</p>
                <p className="font-semibold  text-2xl text-[#252525] ">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <div className="flex-1 pl-8">
            {status === "Pending" && (
              <>
                <button className="w-full h-11 flex justify-center items-center space-x-3 bg-[#2D9632] rounded-md  text-[#FEFEFE] text-lg mb-5 ">
                  <IoCheckmark className="size-5" aria-hidden="true" />
                  <span>Approve Appication</span>
                </button>
                <button
                  onClick={() => setOpenAdditionalIfoModal(true)}
                  className="w-full h-11 flex justify-center items-center space-x-3 border border-[#71839B] rounded-md  text-[#71839B] text-lg mb-5 "
                >
                  <span>Request Additional Info</span>
                </button>
                <button className="w-full h-11 flex justify-center items-center space-x-3 bg-[#F75656] rounded-md  text-[#FEFEFE] text-lg  ">
                  <MdClose className="size-5" aria-hidden="true" />
                  <span>Reject Appication</span>
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
      <AdditionalInfoModal
        open={openAdditionalInfoModal}
        setOpen={setOpenAdditionalIfoModal}
      />
    </main>
  );
};
export default AdminApplicationDetails;
