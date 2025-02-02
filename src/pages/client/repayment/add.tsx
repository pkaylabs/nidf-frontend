import Select from "@/components/core/select";
import ButtonLoader from "@/components/loaders/button";
import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";
import { useNavigate } from "react-location";
import { IoIosArrowRoundBack } from "react-icons/io";

const options = [
  { name: "Option 1", value: "option1" },
  { name: "Option 2", value: "option2" },
  { name: "Option 3", value: "option3" },
];

const loan = [
  { name: "Total Loan Amount", value: "GHS 50,000" },
  { name: " Amount Repaid", value: "GHS 50,000" },
  { name: "Outstanding Balance", value: "GHS 50,000" },
  { name: "Next Repayment Due", value: "1/31/2025" },
];

const AddRepayment = () => {
  const [selectedProject, setSelectedProject] = useState({
    name: "",
    value: "",
  });

  const navigate = useNavigate();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // await uploadImage(file);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  };

  return (
    <section className="font-poppins p-5">
      <button
        onClick={() => navigate({ to: ".." })}
        className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2.5 px-4 rounded-md transition-all duration-150 ease-in-out mb-5"
      >
        <IoIosArrowRoundBack className="size-5" aria-hidden="true" />{" "}
        <span>Back to Repayments</span>
      </button>
      <div className=" mb-5 p-8 bg-white rounded-md ">
        <p className="font-medium  text-black mb-3">Outstanding Loan Details</p>
        <div className="flex space-x-2 justify-between items-center ">
          {loan.map((loans, index) => (
            <div className="max-w-[241px] w-full border px-3 py-5 border-[#71839B] rounded-md">
              <p className="font-light text-sm text-black ">{loans.name}</p>
              <p className="font-medium text-2xl text-black mt-3">
                {loans.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-8 bg-white rounded-md ">
        <div className="">
          <p className="font-medium text-lg text-black ">Submit Repayment</p>
          <p className="flex justify-between items-center w-full cursor-default text-gray-400 mt-1">
            Enter the details of your latest repayment
          </p>
        </div>
        <div className="mt-5">
          <Select
            label="Select Application"
            options={options}
            onChange={setSelectedProject}
          />
        </div>

        {/* Input*/}
        <div className="mt-5">
          <label className="font-medium text-lg text-black ">
            Payment Date
          </label>
          <input
            type="date"
            className="flex justify-between items-center w-full border border-[#71839B] cursor-default rounded-md bg-white py-3 pr-2 pl-3 text-left text-gray-400  outline-gray-300 sm:text-sm"
          />
        </div>
        <div className="mt-5">
          <label className="font-medium text-lg text-black ">Amount Paid</label>
          <input
            type="text"
            placeholder="Enter Amount "
            className="flex justify-between items-center w-full border border-[#71839B] cursor-default rounded-md bg-white py-3 pr-2 pl-3 text-left text-gray-400  outline-gray-300 sm:text-sm"
          />
        </div>

        <div className="mt-5">
          <label className="font-medium text-lg text-black ">
            Payment Reference Number
          </label>
          <input
            type="text"
            placeholder="Enter reference  number"
            className="flex justify-between items-center w-full border border-[#71839B] cursor-default rounded-md bg-white py-3 pr-2 pl-3 text-left text-gray-400  outline-gray-300 sm:text-sm"
          />
        </div>

        {/* image input */}
        <div className="flex flex-col mt-5">
          <p className="font-medium text-lg text-black mb-2">
            Upload Proof of Payment
          </p>
          <div className="w-full py-12 border border-[#71839B] relative group overflow-hidden rounded-xl transition-all duration-200 ease-in-out">
            <div className="flex h-full justify-center items-center transition-all duration-200 ease-in-out">
              <div className="flex flex-col items-center">
                <FiUpload className="w-7 h-7 text-[#71839B] mb-3" />
                <p className="font-light text-center text-[#71839B]">
                  Drag and drop files here, or click to browse <br />
                </p>
                <label
                  htmlFor="file"
                  className="w-full flex justify-center items-center cursor-pointer"
                >
                  <div className="w-40 h-10 flex justify-center items-center border border-[#324054] rounded-md mt-5">
                    Browse Files
                  </div>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
            {false && (
              <div className="absolute z-20 inset-0 flex justify-center items-center bg-black bg-opacity-40 transition-all duration-200 ease-in-out">
                <ButtonLoader title="" />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-5 mt-6">
          <button className="font-poppins font-light w-56 h-10 bg-primary text-[#F5F5F5] flex justify-center items-center border border-primary rounded-md  ">
            Submit Repayment Data
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddRepayment;
