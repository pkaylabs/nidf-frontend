import ButtonLoader from "@/components/loaders/button";
import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";

const ProgressReportingComponent = ({ data }: any) => {
  const [desc, setDesc] = useState(data?.description ?? "");

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
    <section className="font-poppins px-4 py-5">
      <h4 className="font-medium text-lg text-[#454545] mb-5">
        Submit Progress Report
      </h4>

      <div className="mt-5">
        <div className="">
          <label className="font-medium text-lg text-black">
            Progress Description
          </label>
          <textarea
            name="description"
            id="description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Write a brief description of the current projects’ status..."
            className="border border-[#71839B] w-full h-36  rounded-md p-4 mt-2 text-base resize-none"
          ></textarea>
        </div>

        <div className="mt-5">
          <label className="font-medium text-lg text-black">
            Upload Supporting Documents or Photos
          </label>
          <div className="w-full py-12 border border-dashed border-[#71839B] relative group overflow-hidden rounded-xl transition-all duration-200 ease-in-out mt-3">
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

        <div className="mt-5">
          <button className="w-full h-14 text-white rounded-md bg-primary-50 hover:bg-primary-100 ">
            Submit Progress Update
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProgressReportingComponent;
