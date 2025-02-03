import { Edit2, Eye } from "iconsax-react";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { LiaFileAltSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { RxDownload } from "react-icons/rx";
import { useNavigate, useSearch } from "react-location";

const AdminRepaymentDetails = () => {
  const navigate = useNavigate();
  const search = useSearch<any>();

  const status = search.status;

  return (
    <main className="font-poppins p-5">
      <button
        onClick={() => navigate({ to: ".." })}
        className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2.5 px-4 rounded-md transition-all duration-150 ease-in-out mb-5"
      >
        <IoIosArrowRoundBack className="size-5" aria-hidden="true" />{" "}
        <span>Back to Repayment List</span>
      </button>

      <section className="p-10 bg-white rounded-md">
        <div className="border-[0.5px] border-[#71839B] p-8 rounded-md flex items-start justify-between gap-5 shadow ">
          <div className="">
            <h4 className="font-semibold text-xl text-[#454545] ">
              Progress Summary
            </h4>
            <p className="font-light text-[#545454] mt-6 mb-2">Project Name</p>
            <h2 className="font-semibold text-2xl text-[#252525] ">
              Church Hall Renovation
            </h2>
            <p className="font-light text-[#545454] mt-6 mb-2">Payment Date</p>
            <h2 className="font-semibold text-2xl text-[#252525] ">
              Jan 15, 2025
            </h2>
            <p className="font-light text-[#545454] mt-6 mb-2">Amount Paid</p>
            <h2 className="font-semibold text-2xl text-[#252525] ">
              GHS 5,000
            </h2>
            <p className="font-light text-[#545454] mt-6 mb-2">
              Payment Reference
            </p>
            <h2 className="font-semibold text-2xl text-[#252525] ">
              REF-12345
            </h2>
          </div>

          <div className="flex flex-col justify-between h-96">
            <p
              className={`font-semibold text-xl ${
                status === "Reconciled" ? "text-[#2D9632]" : "text-[#AD6915]"
              }  `}
            >
              {" "}
              {status}{" "}
            </p>
            <div className="">
              <>
                <button className="w-64 h-11 flex justify-center items-center space-x-3 bg-[#2D9632] rounded-md  text-[#FEFEFE] text-lg mb-5 ">
                  <IoCheckmark className="size-5" aria-hidden="true" />
                  <span>Approve Appication</span>
                </button>

                <button className="w-64 h-11 flex justify-center items-center space-x-3 bg-[#F75656] rounded-md  text-[#FEFEFE] text-lg  ">
                  <MdClose className="size-5" aria-hidden="true" />
                  <span>Reject Appication</span>
                </button>
              </>
            </div>
          </div>
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
                <button className="flex items-center gap-2 border border-[#71839B] text-[#545454] text-lg px-4 py-1.5 rounded-md hover:shadow-md transition-all duration-150 ease-in-out">
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
          {/* {status !== "Reconciled" && ( */}
            <button className="font-medium bg-[#E0E0E0] flex items-center gap-2 px-12 py-3 rounded-md text-[#737373] text-lg hover:bg-primary-100 transition-all duration-150 ease-in-out">
              <IoCheckmark size="22" color="#737373" />
              <span className="">#737373</span>
            </button>
        {/* //   )} */}
        </div>
      </section>
    </main>
  );
};

export default AdminRepaymentDetails;
