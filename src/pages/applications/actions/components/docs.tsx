import React from "react";
import { motion } from "framer-motion";
import { Eye, Trash } from "iconsax-react";

interface DocumentsProps {
  data: any;
}

const Documents = ({ data }: DocumentsProps) => {
  return (
    <section className="font-poppins px-4 py-5">
      <h4 className="font-medium text-lg text-[#454545] mb-5">Documents</h4>

      <motion.table
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full table-auto border-collapse"
      >
        <thead>
          <tr className="border-b">
            <th className="py-3 font-semibold text-left text-lg text-[#212121] ">
              Document Name
            </th>
            <th className="py-3 font-semibold text-left text-lg text-[#212121] ">
              Uploaded Date
            </th>
            <th className="py-3 font-semibold text-left text-lg text-[#212121] ">
              Status
            </th>
            <th className="py-3 font-semibold text-left text-lg text-[#212121] ">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className=" border-b">
            <td className="w-[35%] py-3  text-lg text-black">
              Cost Estimate Document.pdf
            </td>
            <td className="w-[25%] flex-1 py-3 text-lg text-black ">Jan 15, 2025</td>
            <td className="w-[25%] py-3 text-lg text-black ">
              <p
                className={`w-fit text-[#F5F5F5] text-base py-1 px-5 rounded-md text-center ${
                  data === "Approved" ? "bg-[#2D9632]" : ""
                } ${data === "Pending" ? "bg-[#BAB21D]" : ""} ${
                  data === "Reviewing" ? "bg-[#71839B]" : ""
                } `}
              >
                {data}
              </p>
            </td>
            <td className="w-[10%] py-3 text-lg text-black">
              <div className="flex items-center space-x-3">
                <div
                  onClick={() => {}}
                  className="cursor-pointer hover:bg-gray-50 p-1 rounded-full"
                >
                  <Eye size="22" color="#545454" />
                </div>
                <div className="cursor-pointer hover:bg-gray-50 p-1 rounded-full">
                  <Trash size="22" color="#FF8A65" />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </motion.table>
    </section>
  );
};

export default Documents;
