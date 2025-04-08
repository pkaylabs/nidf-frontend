import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useSearch } from "react-location";
import Districts from "./components/districts";
import ActivityLog from "./components/activity-log";
import { motion } from "framer-motion";

export interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export const Tab = ({ label, active, onClick }: TabProps) => (
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

const RegionDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();
  const search = useSearch<any>();

  const handleTabClick = (index: number) => {
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
  };

  const { name, districts, churches } = search;

  const tabs = [
    { label: "Districts", component: <Districts /> },
    { label: "Activity Log", component: <ActivityLog /> },
  ];

  const churchData = [
    {
        label: "Region Name",
        value: name,
    
    },
    {
        label: "Number Of Districts",
        value: districts,
    
    },
    {
        label: "Number Of Churches",
        value: churches,
    
    },
    {
        label: "Created By",
        value: search?.created_by ?? "N/A",
    
    },
  ]

  return (
    <main className="font-poppins p-5">
      <button
        onClick={() => navigate({ to: ".." })}
        className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2.5 px-4 rounded-md transition-all duration-150 ease-in-out mb-5"
      >
        <IoIosArrowRoundBack className="size-5" aria-hidden="true" />{" "}
        <span>Back to Regions</span>
      </button>

      <section className="p-8 bg-white rounded-md ">
        <div className="border-[0.5px] border-[#71839B] rounded-md  p-5 ">
            <h3 className="font-semibold text-xl text-[#454545] ">Region Details</h3>

            <div className="mt-6 flex flex-wrap justify-between">
                {churchData.map((data, idx) => (
                    <div className="w-1/2 mb-5">
                        <p className="font-light text-[#545454] mb-3">{data.label} </p>
                        <h2 className="font-semibold text-2xl text-[#252525] ">{data.value} </h2>
                    </div>
                ))}

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

export default RegionDetails;
