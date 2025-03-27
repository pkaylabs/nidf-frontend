import { Eye } from "iconsax-react";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { LiaFileAltSolid } from "react-icons/lia";
import { RxDownload } from "react-icons/rx";
import { useNavigate } from "react-location";
import { IoCheckmark } from "react-icons/io5";
import PDFModal from "@/components/pdf/pdf-modal";

const AdminProgressReportDetails = () => {
  const [openPDFModal, setOpenPDFModal] = React.useState(false);
  const navigate = useNavigate();
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
              Church Hall Renovation
            </h2>
            <p className="font-light text-[#545454] mt-6 mb-2">
              Reporting Date
            </p>
            <h2 className="font-semibold text-2xl text-[#252525] ">
              Jan 15, 2025
            </h2>
          </div>
          {/* <p className={`font-semibold text-xl text-[#2D9632] `}>Verified</p> */}
        </div>
        <div className="my-5 border-[0.5px] border-[#71839B] p-8 rounded-md shadow ">
          <h5 className="font-medium text-lg mb-5">Progress Description</h5>
          <h4 className="font-medium text-xl text-[#545454] ">
            Roofing completed, electrical wiring underway.
          </h4>
        </div>

        <div className="my-5 border-[0.5px] border-[#71839B] p-8 rounded-md shadow ">
          <h4 className="font-semibold text-xl text-[#454545] mb-4">
            Attached Documents
          </h4>

          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="bg-[#F6F6F6] py-2.5 px-4 rounded-md mb-2.5 flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <LiaFileAltSolid
                  className="size-6 text-[#545454]"
                  aria-hidden="true"
                />
                <p className="font-light text-[#545454] text-xl">
                  progress_report.pdf
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setOpenPDFModal(true)}
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
                <button className="flex items-center gap-2 border border-[#71839B] text-[#545454] text-lg px-4 py-1.5  rounded-md hover:shadow-md transition-all duration-150 ease-in-out">
                  <RxDownload className="size-5" aria-hidden="true" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end ">
          <button className="w-48 h-14 rounded-md bg-primary-50 flex justify-center items-center gap-3 text-white font-medium hover:bg-primary-100 transition-all duration-150 ease-in-out ">
            <IoCheckmark className="size-6" aria-hidden="true" />
            <span>Verify Report</span>
          </button>
        </div>
      </section>
      <PDFModal open={openPDFModal} setOpen={setOpenPDFModal} />
    </main>
  );
};

export default AdminProgressReportDetails;
