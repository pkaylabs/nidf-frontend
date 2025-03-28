import { Edit2, Eye } from "iconsax-react";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { LiaFileAltSolid } from "react-icons/lia";
import { RxDownload } from "react-icons/rx";
import { useNavigate, useSearch } from "react-location";
import PDFModal from "../../../components/pdf/pdf-modal";
import moment from "moment";
import { downloadFile } from "@/helpers/file-downlaoder";
import { ADD_REPAYMENT, BACKEND_BASE_URL } from "@/constants/page-path";
import { isImageFileByExtension } from "@/helpers/image-checker";
import { IoImageOutline } from "react-icons/io5";

const RepaymentDetails = () => {
  const [openPDFModal, setOpenPDFModal] = React.useState(false);
  const [fileName, setFileName] = React.useState("");
  const [url, setURL] = React.useState("");
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
            <p className="font-light text-[#545454] mt-6 mb-2">Project ID</p>
            <h2 className="font-semibold text-2xl text-[#252525] ">
              {search?.id ?? "N/A"}
            </h2>
            <p className="font-light text-[#545454] mt-6 mb-2">Payment Date</p>
            <h2 className="font-semibold text-2xl text-[#252525] ">
              {moment(search?.date_paid).format("LL") ?? "N/A"}
            </h2>
            <p className="font-light text-[#545454] mt-6 mb-2">Amount Paid</p>
            <h2 className="font-semibold text-2xl text-[#252525] ">
              GHS {search?.amount}
            </h2>
            <p className="font-light text-[#545454] mt-6 mb-2">
              Payment Reference
            </p>
            <h2 className="font-semibold text-2xl text-[#252525] ">
              {search?.payment_reference}
            </h2>
            <p className="font-light text-[#545454] mt-6 mb-2">
              Project purpose
            </p>
            <h2 className="font-semibold text-2xl text-[#252525] ">
              {search?.purpose ?? "N/A"}
            </h2>
          </div>
          <p
            className={`font-semibold text-xl ${
              status === "Reconciled" ? "text-[#2D9632]" : "text-[#AD6915]"
            }  `}
          >
            {" "}
            {status}{" "}
          </p>
        </div>

        <div className="my-5 border-[0.5px] border-[#71839B] p-8 rounded-md shadow ">
          <h4 className="font-semibold text-xl text-[#454545] mb-4">
            Attached Documents
          </h4>

          {/* {[1, 2, 3].map((item, index) => ( */}
          <div className="bg-[#F6F6F6] py-2.5 px-4 rounded-md mb-2.5 flex justify-between items-center">
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
              <p className="font-light text-[#545454] text-xl">
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
                      search?.proof_of_payment
                    ),
                    search?.proof_of_payment?.replace("/assets/repayments/", "")
                  );
                }}
                className="flex items-center gap-2 border border-[#71839B] text-[#545454] text-lg px-4 py-1.5  rounded-md hover:shadow-md transition-all duration-150 ease-in-out"
              >
                <RxDownload className="size-5" aria-hidden="true" />
                <span>Download</span>
              </button>
            </div>
          </div>
          {/* ))} */}
        </div>

        <div className="flex justify-end ">
          {status !== "Reconciled" && (
            <button
              onClick={() =>
                navigate({
                  to: `${ADD_REPAYMENT}`,
                  search: {
                    id: search.repayment_id,
                    purpose: search?.purpose,
                    amount: search.amount,
                    date_paid: search.date_paid,
                    proof_of_payment: search.proof_of_payment,
                    repayment_id: search.repayment_id,
                    application_id: search.application_id,
                    created_at: search.created_at,
                    payment_reference: search.payment_reference,
                  },
                })
              }
              className="font-medium bg-primary-50 flex items-center gap-2 px-12 py-3 rounded-md text-white text-lg hover:bg-primary-100 transition-all duration-150 ease-in-out"
            >
              <Edit2 size="22" color="#fff" />
              <span className="">Edit</span>
            </button>
          )}
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

export default RepaymentDetails;
