import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useMatch, useNavigate, useSearch } from "react-location";
import { motion } from "framer-motion";
import BankingInfo from "./components/banking-info";
import ApprovalLog from "./components/approval-log";
import { IoCheckmark } from "react-icons/io5";
import { computeSignature } from "@/helpers";
import { useAppDispatch } from "@/redux";
import { logout } from "@/redux/features/auth/authSlice";
import TransactionDetails from "./components/transaction-detail";

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

const DisbursementDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleTabClick = (index: number) => {
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
  };

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { params, search } = useMatch<any>();

  const secretKey = import.meta.env.REACT_APP_URL_SECRET || "fallback-secret";

  const { sig: providedSignature, ...rest } = search;

  // Recompute the signature on the client side
  const expectedKeys = [
    "status",
    "reference",
    "project_name",
    "amount",
    "payment_date",
    "account_name",
    "account_num",
    "trans_id",
    "bank_name",
  ];

  const unsignedParams = expectedKeys.reduce((obj, key) => {
    if (rest[key]) {
      let value = rest[key].toString().trim();
      if (key === "amount") {
        // Ensure the amount is formatted as two decimals
        value = parseFloat(value).toFixed(2);
      }
      obj[key] = value;
    }
    return obj;
  }, {} as Record<string, string>);

  // Compute signature using the same helper
  const computedSignature = computeSignature(unsignedParams, secretKey);

  
  const tabs = [
    {
      label: "Transaction Details",
      component: <TransactionDetails data={search} />,
    },
    { label: "Banking Information", component: <BankingInfo data={search}  /> },
    { label: "Approval Log", component: <ApprovalLog /> },
  ];

  useEffect(() => {
    console.log("Provided signature:", providedSignature);
    console.log("Computed signature:", computedSignature);
    if (providedSignature !== computedSignature) {
      dispatch(logout());
    }
  }, [providedSignature, computedSignature, dispatch]);

  return (
    <main className="font-poppins p-3 md:p-5">
      <div className="flex items-center gap-x-4 mb-5">
        <button
          onClick={() => navigate({ to: ".." })}
          className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454]
           bg-white text-black py-2.5 px-4 rounded-md transition-all duration-150 ease-in-out "
        >
          <IoIosArrowRoundBack className="size-5" aria-hidden="true" />{" "}
          <span className="hidden md:block">Back to Lists</span>
        </button>
      </div>

      <section className="p-3 md:p-8 bg-white rounded-md ">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 md:gap-5">
          <div className="">
            <h4 className="font-medium text-lg md:text-xl text-[#454545]">
              {search?.project_name}
            </h4>
            <p className="font-light md:text-lg text-[#545454] mt-3 md:mt-5 ">
              Reference: {search.reference}
            </p>
          </div>

          <div className="">
            <h4 className="font-bold text-xl md:text-3xl text-[#121212] ">GHS {search?.amount} </h4>
            <div className="flex w-fit gap-2 items-center bg-[#252525] rounded-md py-2 md:py-3 px-2 md:px-4 mt-2">
              <div
                className={`w-4 md:w-6 h-4 md:h-6 rounded-sm flex justify-center items-center ${
                  search?.status === "COMPLETED" ? "bg-[#2D9632] " : "bg-[#AD6915] "
                } `}
              >
                {" "}
                {search?.status === "COMPLETED" && (
                  <IoCheckmark className="text-white size-4" />
                )}{" "}
              </div>
              <p className="font-semibold text-sm md:text-base text-white">
                {search?.status}
              </p>
            </div>
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

export default DisbursementDetails;
