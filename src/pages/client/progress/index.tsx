import { ADD_PROGRESS } from "@/constants/page-path";
import { isImageFileByExtension } from "@/helpers/image-checker";
import { useGetProgressReportsQuery } from "@/redux/features/progress/progressApiSlice";
import moment from "moment";
import React from "react";
import { LiaFileAltSolid } from "react-icons/lia";
import { useNavigate } from "react-location";
import { IoImageOutline } from "react-icons/io5";

const ProgressReport = () => {
  const navigate = useNavigate();

  const { data, isLoading, refetch, isError } = useGetProgressReportsQuery({});
  console.log(data, "data");
  const rows = data ?? [];

  // const isImage = isImageFileByExtension(row);

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
          {rows?.map((row: any) => (
            <div className="flex justify-between items-center space-x-4 border-[0.5px] border-[#71839B] rounded-md shadow-sm p-6 mb-5">
              <div className="">
                <h4 className="font-semibold text-xl text-[#454545] ">
                  {row?.application?.purpose ?? "N/A"}
                </h4>
                <p className="font-light text-[#545454] my-3">
                  {" "}
                  {moment(row?.created_at).format("LL") ?? "N/A"}{" "}
                </p>
                <h6 className="font-medium text-lg text-[#454545] mb-3">
                  {row?.progress_description ?? "N/A"}
                </h6>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#EFEFEF] ">
                    {isImageFileByExtension(row?.proof_of_progress) ? (
                      <IoImageOutline
                        className="size-5 text-[#545454]"
                        aria-hidden="true"
                      />
                    ) : (
                      <LiaFileAltSolid
                        className="size-5 text-[#545454]"
                        aria-hidden="true"
                      />
                    )}

                    <p className="font-light text-[#545454]">
                      {row?.proof_of_progress.replace("/assets/progress/", "")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    navigate({
                      to: `/progress-report/${row?.report_id}`,

                      search: {
                        id: row?.report_id,
                        status: row?.status ?? "",
                        purpose: row?.application?.purpose,
                        proof_of_progress: row?.proof_of_progress,
                        progress_description: row?.progress_description,
                        created_at: row?.created_at,
                      },
                    })
                  }
                  className="font-poppins font-light w-40 h-10 flex justify-center items-center border border-[#324054] rounded-md text-[#324054] hover:bg-[#324054] hover:text-white transition-all duration-200 ease-in-out "
                >
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
