import React, { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { useNavigate, useSearch } from "react-location";
import SendHistory from "./components/send-history";
import Recipeints from "./components/recipeints";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Tab } from "../region/details";
import { motion } from "framer-motion";
import { RxDownload } from "react-icons/rx";
import moment from "moment";
import { downloadFile } from "@/helpers/file-downlaoder";
import { BACKEND_BASE_URL } from "@/constants/page-path";

const NotificationDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleTabClick = (index: number) => {
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
  };

  const navigate = useNavigate();
  const search = useSearch<any>();
  const {
    title,
    message,
    target,
    scheduled,
    schedule_start_date,
    schedule_start_end,
    schedule_frequency,
    attachment,
  } = search;

  const tabs = [
    { label: "Send Histories", component: <SendHistory /> },
    { label: "Recipients", component: <Recipeints data={target} /> },
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
        <div className="flex justify-between items-start gap-5 ">
          <div className="flex-1">
            <h4 className="font-medium text-2xl text-[#252525] ">{title}</h4>
            <p className="font-light text-lg text-[#545454] mt-5 ">{message}</p>
            <div className=" mt-5 flex w-full">
              <div className="flex-1">
                <p className="font-light text-base text-[#545454] ">
                  Recipients
                </p>
                <h2 className="font-semibold text-2xl text-[#454545] mt-2">
                  {target}
                </h2>
              </div>
              <div className="flex-1">
                <p className="font-light text-base text-[#545454] ">Schedule</p>
                <h2 className="font-semibold text-2xl text-[#454545] mt-2">
                  {scheduled ? (
                    <>
                      Schedule:{" "}
                      <span className="font-semibold">
                        {typeof schedule_start_date === "string" ||
                        typeof schedule_start_date === "number" ||
                        schedule_start_date instanceof Date
                          ? moment(schedule_start_date).format("LL")
                          : "No date"}{" "}
                        -{" "}
                        {typeof schedule_start_end === "string" ||
                        typeof schedule_start_end === "number" ||
                        schedule_start_end instanceof Date
                          ? moment(schedule_start_end).format("LL")
                          : "No date"}{" "}
                        ({schedule_frequency})
                      </span>
                    </>
                  ) : (
                    "Not Scheduled"
                  )}
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                downloadFile(
                  BACKEND_BASE_URL.replace("/api-v1/", "").concat(attachment),
                  attachment?.replace("/assets/notifications/", "")
                );
              }}
              className="flex items-center gap-2 border border-[#71839B] text-[#545454] text-lg px-4 py-1.5 mt-8  rounded-md hover:shadow-md transition-all duration-150 ease-in-out"
            >
              <RxDownload className="size-5" aria-hidden="true" />
              <span>{attachment?.replace("/assets/notifications/", "")}</span>
            </button>
          </div>

          <div className="">
            <div className="flex gap-2 items-center bg-[#252525] rounded-md py-3 px-4 mt-2">
              <div
                className={`w-6 h-6 rounded-sm flex justify-center items-center ${
                  !scheduled ? "bg-[#2D9632] " : "bg-[#AD6915] "
                } `}
              >
                {" "}
                {!scheduled && (
                  <IoCheckmark className="text-white size-4" />
                )}{" "}
              </div>
              <p className="font-semibold text-base text-white">
                {scheduled ? "Scheduled" : "Sent"}
              </p>
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

export default NotificationDetails;
