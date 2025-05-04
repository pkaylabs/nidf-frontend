import React from "react";
import { motion } from "framer-motion";

const ApplicationDetail = ({ data }: any) => {
  return (
    <section className="font-poppins md:px-4 md:py-5">
      <h4 className="font-medium md:text-lg text-[#454545] mb-5">
        Project Details
      </h4>

      <motion.table
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full table-auto border-collapse"
      >
        <tbody>
          {data.map((item: any, idx: number) => (
            <tr key={idx} className="border-b">
              <td className="py-3 font-medium md:text-lg text-black">
                {item?.name}{" "}
              </td>
              <td className="py-2 md:text-lg text-black">{item?.value} </td>
            </tr>
          ))}
        </tbody>
      </motion.table>
    </section>
  );
};

export default ApplicationDetail;
