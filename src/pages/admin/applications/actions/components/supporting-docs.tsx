import React from "react";
import { motion } from "framer-motion";

const SupportingDocuments = () => {
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
                    <button
                      className={`w-fit border border-[#71839B] text-[#71839B] text-base py-1 px-5 rounded-md text-center `}
                    >
                      View
                    </button>
                  </td>
                 
                </tr>
              </tbody>
            </motion.table>
    </section>
  );
};

export default SupportingDocuments;
