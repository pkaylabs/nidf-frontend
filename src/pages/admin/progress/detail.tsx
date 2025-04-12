import { Eye } from "iconsax-react";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { LiaFileAltSolid } from "react-icons/lia";
import { RxDownload } from "react-icons/rx";
import { useNavigate, useSearch } from "react-location";
import { IoCheckmark, IoImageOutline } from "react-icons/io5";
import PDFModal from "@/components/pdf/pdf-modal";
import moment from "moment";
import { isImageFileByExtension } from "@/helpers/image-checker";
import { BACKEND_BASE_URL } from "@/constants/page-path";
import { downloadFile } from "@/helpers/file-downlaoder";
import Swal from "sweetalert2";
import { useVerifyProgressReportMutation } from "@/redux/features/progress/progressApiSlice";
import ButtonLoader from "@/components/loaders/button";

const AdminProgressReportDetails = () => {
  const [openPDFModal, setOpenPDFModal] = React.useState(false);
  const [fileName, setFileName] = React.useState("");
  const [url, setURL] = React.useState("");
  const navigate = useNavigate();
  const search = useSearch<any>();

  const [veryReport, { isLoading }] = useVerifyProgressReportMutation();

  const handleVerifyReport = async () => {
    try {
      const res = await veryReport({ reportid: search?.id }).unwrap();
      console.log(res, "res verifying");

      if (res) {
        Swal.fire({
          title: "Report verified successfully!",
          icon: "success",
          draggable: true,
        });

        navigate({ to: ".." });
      } else {
        Swal.fire({
          title: "Error!",
          text: "An error occurred. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <main className="font-poppins p-5">
      <button
        onClick={() => navigate({ to: ".." })}
        className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2.5 px-4 rounded-md transition-all duration-150 ease-in-out "
      >
        <IoIosArrowRoundBack className="size-5" aria-hidden="true" />{" "}
        <span>Back to Progress List</span>
      </button>

      <section className="p-8 bg-white rounded-md mt-5">
        <div className="border-[0.5px] border-[#71839B] p-8 rounded-md flex items-start justify-between gap-5 shadow ">
          <div className="">
            <h4 className="font-semibold text-xl text-[#454545] ">
              Progress Summary
            </h4>
            <p className="font-light text-[#545454] mt-6 mb-2">Project Name</p>
            <h2 className="font-semibold text-2xl text-[#252525] ">
              {search?.purpose ?? "N/A"}
            </h2>
            <p className="font-light text-[#545454] mt-6 mb-2">
              Reporting Date
            </p>
            <h2 className="font-semibold text-2xl text-[#252525] ">
              {moment(search?.created_at).format("LL") ?? "N/A"}
            </h2>
          </div>
          <p
            className={`font-semibold text-xl 
          ${search?.status === "VERIFIED" ? "text-[#2D9632]" : ""}
         
         ${search?.status === "PENDING" ? "text-[#BAB21D]" : ""}
        ${search?.status === "UNDER REVIEW" ? "text-[#1da5ba]" : ""}
         ${search?.status === "DRAFT" ? "text-[#71839B]" : ""}
         ${search?.status === "WAITING NO`S APPROVAL" ? "text-[#719b96]" : ""}
         ${search?.status === "REJECTED" ? "text-red" : ""}
             `}
          >
            {search?.status ?? "N/A"}
          </p>
        </div>
        <div className="my-5 border-[0.5px] border-[#71839B] p-8 rounded-md shadow ">
          <h5 className="font-medium text-lg mb-5">Progress Description</h5>
          <h4 className="font-medium text-xl text-[#545454] ">
            {search?.progress_description ?? "N/A"}
          </h4>
        </div>

        <div className="my-5 border-[0.5px] border-[#71839B] p-8 rounded-md shadow ">
          <h4 className="font-semibold text-xl text-[#454545] mb-4">
            Attached Documents
          </h4>

          <div className="bg-[#F6F6F6] py-2.5 px-4 rounded-md mb-2.5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              {isImageFileByExtension(search?.proof_of_progress) ? (
                <IoImageOutline
                  className="size-6 text-[#545454]"
                  aria-hidden="true"
                />
              ) : (
                <LiaFileAltSolid
                  className="size-6 text-[#545454]"
                  aria-hidden="true"
                />
              )}
              <p className="font-light text-[#545454] text-xl">
                {search?.proof_of_progress?.replace("/assets/progress/", "")}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setFileName(
                    search?.proof_of_progress.replace("/assets/progress/", "")
                  );
                  setURL(
                    BACKEND_BASE_URL.replace("/api-v1/", "").concat(
                      search?.proof_of_progress
                    )
                  );
                  setOpenPDFModal(true);
                }}
                className="flex items-center gap-2 border border-[#71839B] text-[#545454] text-lg px-4 py-1.5 rounded-md hover:shadow-md transition-all duration-150 ease-in-out"
              >
                <Eye
                  size="22"
                  color="#545454"
                  className=""
                  aria-hidden="true"
                />
                <span className="group-hover:text-white">View</span>
              </button>
              <button
                onClick={() => {
                  downloadFile(
                    BACKEND_BASE_URL.replace("/api-v1/", "").concat(
                      search?.proof_of_progress
                    ),
                    search?.proof_of_progress?.replace("/assets/progress/", "")
                  );
                }}
                className="flex items-center gap-2 border border-[#71839B] text-[#545454] text-lg px-4 py-1.5  rounded-md hover:shadow-md transition-all duration-150 ease-in-out"
              >
                <RxDownload className="size-5" aria-hidden="true" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>

        {search?.status !== "VERIFIED" && (
          <div className="flex justify-end ">
            <button
              disabled={isLoading}
              onClick={handleVerifyReport}
              className="w-48 h-14 rounded-md bg-primary-50 flex justify-center items-center gap-3 text-white font-medium hover:bg-primary-100 transition-all duration-150 ease-in-out "
            >
              {isLoading ? (
                <ButtonLoader title="Verifying" />
              ) : (
                <>
                  <IoCheckmark className="size-6" aria-hidden="true" />
                  <span>Verify Report</span>
                </>
              )}
            </button>
          </div>
        )}
      </section>
      <PDFModal
        open={openPDFModal}
        setOpen={setOpenPDFModal}
        fileName={fileName}
        file={url}
      />
    </main>
  );
};

export default AdminProgressReportDetails;
