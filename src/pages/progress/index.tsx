import Select from "@/components/core/select";
import ButtonLoader from "@/components/loaders/button";
import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";

const options = [
  { name: "Option 1", value: "option1" },
  { name: "Option 2", value: "option2" },
  { name: "Option 3", value: "option3" },
];

const ProgressReport = () => {
  const [selectedProject, setSelectedProject] = useState({
    name: "",
    value: "",
  });

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
      <div className="p-10 bg-white rounded-md ">
        <Select
          label="Select Project"
          options={options}
          onChange={setSelectedProject}
        />

        <div className="flex flex-col mt-5">
          <label className="font-medium text-lg text-black ">
            Progress Description
          </label>
          <textarea
            name=""
            id=""
            placeholder="Write a brief description of the current projects' status..."
            className="border border-[#71839B] h-32 rounded-md p-4 mt-2 text-base"
          ></textarea>
        </div>

        {/* image input */}

        <div className="flex flex-col mt-5">
          <p className="font-medium text-lg text-black mb-2">
            Upload Supporting Documents or Photos
          </p>
          <div className="w-full py-12 border border-[#71839B] relative group overflow-hidden rounded-xl transition-all duration-200 ease-in-out">
            <div className="flex h-full justify-center items-center transition-all duration-200 ease-in-out">
              <div className="flex flex-col items-center">
                <FiUpload className="w-7 h-7 text-[#71839B] mb-3" />
                <p className="font-light text-center text-[#71839B]">
                  Drag and drop files here, or click to browse <br />
                  Supported formats: PDF, DOCX, XLSX, JPG, PNG (max 10MB per
                  file)
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

        <div className="flex flex-col mt-5">
          <label className="font-medium text-lg text-black ">
          Previously Uploaded Files
          </label>
          <div className="mt-2">
            {[1, 2, 3].map((_, i) => (
              <div className="flex justify-between items-start mb-3.5">
                <div className="flex items-start space-x-2">
                  <FaRegFileAlt
                    className="size-6 text-[#17567E] mt-1.5"
                    aria-hidden="true"
                  />
                  <div className="">
                    <p className="text-black">progress_report.pdf</p>
                    <p className="text-[#71839B] text-sm">
                      Uploaded on Jan 10, 2025 by Pastor John Sam.
                    </p>
                  </div>
                </div>
                <button className="font-poppins font-light w-40 h-10 flex justify-center items-center border border-[#324054] rounded-md text-[#324054]  ">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-5 mt-6">
          <button className="font-poppins font-light w-56 h-10 bg-primary text-[#F5F5F5] flex justify-center items-center border border-primary rounded-md  ">
            Submit Progress Report
          </button>
          <button className="font-poppins font-light w-40 h-10 flex justify-center items-center border border-[#324054] rounded-md text-[#324054]  ">
            Reset Form
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProgressReport;
