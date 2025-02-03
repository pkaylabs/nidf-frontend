import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useSearch } from "react-location";
import { motion } from "framer-motion";
import TransaactionDetails from "./components/transaction-detail";
import BankingInfo from "./components/banking-info";
import ApprovalLog from "./components/approval-log";
import { IoCheckmark } from "react-icons/io5";


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

const DisbursementDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleTabClick = (index: number) => {
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
  };

  const navigate = useNavigate();
  const search = useSearch<any>();
  const reference = search.reference;
  const status = search.status;

  const tabs = [
    { label: "Transaction Details", component: <TransaactionDetails data={status} /> },
    { label: "Banking Information", component: <BankingInfo /> },
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
          <span>Back to Lists</span>
        </button>
      </div>

      <section className="p-8 bg-white rounded-md ">
        <div className="flex justify-between items-center gap-5 ">
          <div className="">
            <h4 className="font-medium text-xl text-[#454545] ">
              Church Hall Renovation
            </h4>
            <p className="font-light text-lg text-[#545454] mt-5 ">
              Reference: {reference}
            </p>
          </div>

          <div className="">
            <h4 className="font-bold text-3xl text-[#121212] ">GHS 5,000</h4>
            <div className="flex gap-2 items-center bg-[#252525] rounded-md py-3 px-4 mt-2">
              <div
                className={`w-6 h-6 rounded-sm flex justify-center items-center ${
                  status === "Completed" ? "bg-[#2D9632] " : "bg-[#AD6915] "
                } `}
              > {status === "Completed" && (<IoCheckmark className="text-white size-4" />) } </div>
              <p className="font-semibold text-base text-white">{status}</p>
            </div>
          </div>
        </div>
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
    </main>
  );
};

export default DisbursementDetails;
