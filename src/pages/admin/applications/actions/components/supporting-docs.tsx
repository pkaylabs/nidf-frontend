import React from "react";
import { motion } from "framer-motion";
import PDFModal from "@/components/pdf/pdf-modal";
import { DocumentsProps } from "@/pages/client/applications/actions/components/docs";
import { Eye } from "iconsax-react";

const SupportingDocuments = ({ data }: DocumentsProps) => {
  const [openPDFModal, setOpenPDFModal] = React.useState(false);
  const [fileName, setFileName] = React.useState("");
  const [url, setURL] = React.useState("");
  return (
    <section className="font-poppins md:px-4 md:py-5">
      <h4 className="font-medium md:text-lg text-[#454545] mb-5">Documents</h4>

      <div className="w-full overflow-auto">
        <motion.table
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full table-auto border-collapse"
        >
          <thead>
            <tr className="border-b">
              <th className="py-3 font-semibold text-left md:text-lg pr-4 text-[#212121] text-nowrap ">
                Document Name
              </th>
              <th className="py-3 font-semibold text-left md:text-lg pr-4 text-[#212121] text-nowrap ">
                Uploaded Date
              </th>

              <th className="py-3 font-semibold text-left md:text-lg pr-4 text-[#212121] text-nowrap ">
                Status
              </th>
              <th className="py-3 font-semibold text-left md:text-lg pr-4 text-[#212121] text-nowrap ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((doc, index) => (
              <tr className=" border-b">
                <td className="w-[35%] py-3 pr-4  md:text-lg text-black">{doc.name}</td>
                <td className="w-[25%] flex-1 py-3 pr-4  md:text-lg text-black ">
                  {doc.date}
                </td>
                <td className="w-[25%] py-3 pr-4  md:text-lg text-black ">
                  <p
                    className={`w-fit text-[#F5F5F5] text-xs md:text-base py-1 px-2.5 md:px-5 rounded-md text-center text-nowrap ${
                      doc.status === "APPROVED" ? "bg-[#2D9632]" : ""
                    }
          ${doc.status === "PENDING REVIEW" ? "bg-[#BAB21D]" : ""}
          ${doc.status === "UNDER REVIEW" ? "bg-[#1da5ba]" : ""}
          ${doc.status === "DRAFT" ? "bg-[#71839B]" : ""}
          ${doc.status === "WAITING NO`S APPROVAL" ? "bg-[#719b96]" : ""}
          ${doc.status === "REJECTED" ? "bg-red" : ""}
           `}
                  >
                    {doc.status}
                  </p>
                </td>
                <td className="w-[10%] py-3 text-lg text-black">
                  <div className="flex justify-center md:justify-start items-center space-x-3">
                    <div
                      onClick={() => {
                        setFileName(doc.name);
                        setURL(doc.url);
                        setOpenPDFModal(true);
                      }}
                      className="cursor-pointer hover:bg-gray-50 p-1 rounded-full"
                    >
                      <Eye size="22" color="#545454" />
                    </div>
                    {/* <div className="cursor-pointer hover:bg-gray-50 p-1 rounded-full">
                              <Trash size="22" color="#FF8A65" />
                            </div> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      </div>
      <PDFModal
        open={openPDFModal}
        setOpen={setOpenPDFModal}
        fileName={fileName}
        file={url}
      />
    </section>
  );
};

export default SupportingDocuments;
