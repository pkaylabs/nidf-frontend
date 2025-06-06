import PDFModal from "@/components/pdf/pdf-modal";
import { BACKEND_BASE_URL } from "@/constants/page-path";
import { downloadFile } from "@/helpers/file-downlaoder";
import { isImageFileByExtension } from "@/helpers/image-checker";
import { useVerifyRepaymentMutation } from "@/redux/features/repayment/repaymentApiSlice";
import { Edit2, Eye } from "iconsax-react";
import moment from "moment";
import React from "react";
import toast from "react-hot-toast";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoCheckmark, IoImageOutline } from "react-icons/io5";
import { LiaFileAltSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { RxDownload } from "react-icons/rx";
import { useNavigate, useSearch } from "react-location";

const AdminRepaymentDetails = () => {
  const [openPDFModal, setOpenPDFModal] = React.useState(false);
  const [fileName, setFileName] = React.useState("");
  const [url, setURL] = React.useState("");
  const navigate = useNavigate();
  const search = useSearch<any>();

  const status = search?.status;
  const [verifyRepayment, { isLoading }] = useVerifyRepaymentMutation();

  const handleVerify = async (status: string) => {
    try {
      const res = await verifyRepayment({
        repaymentid: search?.id,
        status: status,
      }).unwrap();

      if (res) {
        toast(
          JSON.stringify({
            type: "success",
            title:
              res?.message ??
              `Repayment status updated to ${status} successfully`,
          })
        );
        navigate({ to: ".." });
      } else {
        toast(
          JSON.stringify({
            type: "error",
            title: "An error occurred",
          })
        );
      }
    } catch (error: any) {
      console.log(error);
      toast(
        JSON.stringify({
          type: "error",
          title: error?.data?.message ?? "An error occurred",
        })
      );
    }
  };

  return (
    <main className="font-poppins p-3 md:p-5">
      <button
        onClick={() => navigate({ to: ".." })}
        className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2.5 px-4 rounded-md transition-all duration-150 ease-in-out mb-5"
      >
        <IoIosArrowRoundBack className="size-5" aria-hidden="true" />{" "}
        <span className="hidden md:block">Back to Repayment List</span>
      </button>

      <section className="p-3 md:p-10 bg-white rounded-md">
        <div className="border-[0.5px] border-[#71839B] p-3 md:p-8 rounded-md flex flex-col md:flex-row items-start justify-between gap-5 shadow ">
          <div className="">
            <h4 className="font-semibold md:text-xl text-[#454545] ">
              Progress Summary
            </h4>
            <p className="font-light text-[#545454] mt-6 mb-2">Project Name</p>
            <h2 className="font-semibold md:text-2xl text-[#252525] ">
              {search?.id ?? "N/A"}
            </h2>
            <p className="font-light text-[#545454] mt-6 mb-2">Payment Date</p>
            <h2 className="font-semibold md:text-2xl text-[#252525] ">
              {moment(search?.date_paid).format("LL") ?? "N/A"}
            </h2>
            <p className="font-light text-[#545454] mt-6 mb-2">Amount Paid</p>
            <h2 className="font-semibold md:text-2xl text-[#252525] ">
              GHS {search?.amount ?? "0.00"}
            </h2>
            <p className="font-light text-[#545454] mt-6 mb-2">
              Payment Reference
            </p>
            <h2 className="font-semibold md:text-2xl text-[#252525] ">
              {search?.payment_reference}
            </h2>
            <p className="font-light text-[#545454] mt-6 mb-2">
              Project purpose
            </p>
            <h2 className="font-semibold md:text-2xl text-[#252525] ">
              {search?.purpose ?? "N/A"}
            </h2>
          </div>

          <div className="w-full md:w-[unset] flex flex-col justify-between md:h-96">
            <p
              className={`font-semibold md:text-xl mb-4 md:mb-0
                ${status === "APPROVED" ? "text-[#2D9632]" : ""}
         ${status === "PENDING REVIEW" ? "text-[#BAB21D]" : ""}
        ${status === "UNDER REVIEW" ? "text-[#1da5ba]" : ""}
         ${status === "DRAFT" ? "text-[#71839B]" : ""}
         ${status === "WAITING NO`S APPROVAL" ? "text-[#719b96]" : ""}
         ${status === "REJECTED" ? "text-red" : ""}
              }  `}
            >
              {" "}
              {status}{" "}
            </p>

            {status !== "APPROVED" && (
              <div className="w-full">
                <>
                  <button
                    onClick={() => handleVerify("APPROVED")}
                    disabled={isLoading}
                    className="w-full md:w-64 h-11 flex justify-center items-center space-x-3 bg-[#2D9632] rounded-md  text-[#FEFEFE] md:text-lg mb-5 disabled:bg-opacity-75 "
                  >
                    <IoCheckmark className="size-5" aria-hidden="true" />
                    <span>Approve Application</span>
                  </button>

                  {status !== "REJECTED" && (
                    <button
                      onClick={() => handleVerify("REJECTED")}
                      disabled={isLoading}
                      className="w-full md:w-64 h-11 flex justify-center items-center space-x-3 bg-[#F75656] rounded-md  text-[#FEFEFE] md:text-lg disabled:bg-opacity-75 "
                    >
                      <MdClose className="size-5" aria-hidden="true" />
                      <span>Reject Application</span>
                    </button>
                  )}
                </>
              </div>
            )}
          </div>
        </div>

        <div className="my-5 border-[0.5px] border-[#71839B] p-3 md:p-8 rounded-md shadow ">
          <h4 className="font-semibold md:text-xl text-[#454545] mb-4">
            Attached Documents
          </h4>

          <div className="bg-[#F6F6F6] py-2.5 px-2 md:px-4 rounded-md mb-2.5 flex flex-wrap gap-4 flex-col md:flex-row justify-between md:items-center">
            <div className="flex items-center gap-2">
              {isImageFileByExtension(search?.roof_of_payment) ? (
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
              <p className="font-light text-[#545454] text-sm md:text-xl">
                {search?.proof_of_payment?.replace("/assets/repayments/", "")}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setFileName(
                    search?.proof_of_payment.replace("/assets/repayments/", "")
                  );
                  setURL(
                    BACKEND_BASE_URL.replace("/api-v1/", "").concat(
                      search?.proof_of_payment
                    )
                  );
                  setOpenPDFModal(true);
                }}
                className="flex items-center gap-2 border border-[#71839B] text-[#545454] text-lg px-3 md:px-4 py-1.5 rounded-md hover:shadow-md transition-all duration-150 ease-in-out"
              >
                <Eye
                  size="22"
                  color="#545454"
                  className=""
                  aria-hidden="true"
                />
                <span className="group-hover:text-white hidden md:block">
                  View
                </span>
              </button>
              <button
                onClick={() => {
                  downloadFile(
                    BACKEND_BASE_URL.replace("/api-v1/", "").concat(
                      search?.proof_of_payment
                    ),
                    search?.proof_of_payment?.replace("/assets/repayments/", "")
                  );
                }}
                className="flex items-center gap-2 border border-[#71839B] text-[#545454] text-lg px-3 md:px-4 py-1.5  rounded-md hover:shadow-md transition-all duration-150 ease-in-out"
              >
                <RxDownload className="size-5" aria-hidden="true" />
                <span className="hidden md:block">Download</span>
              </button>
            </div>
          </div>
        </div>
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

export default AdminRepaymentDetails;
