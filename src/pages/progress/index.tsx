import { ADD_PROGRESS } from "@/constants/page-path";
import React from "react";
import { LiaFileAltSolid } from "react-icons/lia";
import { useNavigate } from "react-location";

const ProgressReport = () => {
  const navigate = useNavigate();
  return (
    <section className="font-poppins p-5 ">
      <div className="bg-white rounded-md p-6">
        <div className="flex justify-end mb-6">
         
          <button
            onClick={() => navigate({ to: ADD_PROGRESS })}
            className="font-medium flex items-center space-x-2 bg-primary-500 text-lg text-white py-2.5 px-4 rounded-md hover:bg-primary-600 transition-all duration-150 ease-in-out "
          >
            <span>+</span> <span>Add Progress Report</span>{" "}
          </button>
        </div>

        <div className="">
          {[1, 2, 3].map((_, i) => (
            <div className="flex justify-between items-center space-x-4 border-[0.5px] border-[#71839B] rounded-md shadow-sm p-6 mb-5">
              <div className="">
                <h4 className="font-semibold text-xl text-[#454545] ">
                  Church Hall Renovation
                </h4>
                <p className="font-light text-[#545454] my-3">Jan 15, 2025</p>
                <h6 className="font-medium text-lg text-[#454545] mb-3">
                  Roofing completed, electrical wiring underway.
                </h6>
                <div className="flex items-center space-x-4">
                  {[1, 2].map((_, i) => (
                    <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#EFEFEF] ">
                      <LiaFileAltSolid
                        className="size-5 text-[#545454]"
                        aria-hidden="true"
                      />
                      <p className="font-light text-[#545454]">
                        progress_report.pdf
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="font-poppins font-light w-40 h-10 flex justify-center items-center border border-[#324054] rounded-md text-[#324054] hover:bg-[#324054] hover:text-white transition-all duration-200 ease-in-out ">
                  View Details
                </button>
                <button className="font-poppins font-light w-40 h-10 flex justify-center items-center border border-[#CE5347] rounded-md text-[#CE5347] hover:bg-[#CE5347] hover:text-white transition-all duratioin-200 ease-in-out ">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgressReport;
