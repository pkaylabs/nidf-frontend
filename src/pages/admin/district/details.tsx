import React, { useState } from "react";
import { useNavigate, useSearch } from "react-location";
import Churches from "./components/churches";
import ActivityLog from "./components/activity-log";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Tab } from "../region/details";
import { motion } from "framer-motion";

const DistrictDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();
  const search = useSearch<any>();

  const handleTabClick = (index: number) => {
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
  };

  const { name, churches, region, head } = search;

  const tabs = [
    { label: "Churches", component: <Churches /> },
    { label: "Activity Log", component: <ActivityLog /> },
  ];

  const churchData = [
    {
      label: "Division Name",
      value: name ?? "N/A",
    },
    {
      label: "Region",
      value: region ?? "N/A",
    },
    {
      label: "Number Of Churches",
      value: churches ?? "0",
    },
    {
      label: "Division Head",
      value: head ?? "N/A",
    },
  ];

  return (
    <main className="font-poppins p-3 md:p-5">
      <button
        onClick={() => navigate({ to: ".." })}
        className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2.5 px-4 rounded-md transition-all duration-150 ease-in-out mb-5"
      >
        <IoIosArrowRoundBack className="size-5" aria-hidden="true" />{" "}
        <span className="hidden md:block">Back to Divisions</span>
      </button>

      <section className="p-3 md:p-8 bg-white rounded-md ">
        <div className="border-[0.5px] border-[#71839B] rounded-md p-3 md:p-5 ">
          <h3 className="font-semibold md:text-xl text-[#454545] ">
            Division Details
          </h3>

          <div className="mt-6 flex flex-wrap justify-between">
            {churchData.map((data, idx) => (
              <div className="w-full md:w-1/2 mb-5">
                <p className="font-light text-[#545454] mb-3">{data.label}</p>
                <h2 className="font-semibold text-lg md:text-2xl text-[#252525] ">
                  {data.value}{" "}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8">
        <div className="flex  bg-white rounded-md px-3 md:px-6 py-1.5 md:py-3 space-x-3 md:space-x-6 mb-6 ">
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

export default DistrictDetails;
