import React from "react";
import { motion } from "framer-motion";
import moment from "moment";

const AppDetailsComponent = ({data}: any) => {
  return (
    <section className="font-poppins px-4 py-5">
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
          <tr className="border-b">
            <td className="py-3 font-medium md:text-lg text-black">
              Purpose of Aid
            </td>
            <td className="py-2 md:text-lg text-black">
              {data?.purpose ?? "Not Available"}
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-3 font-medium md:text-lg text-black">
              Estimated Completion
            </td>
            <td className="py-2 md:text-lg text-black">{moment(data?.estimated).format("LL") ?? "Not Available"}</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 font-medium md:text-lg text-black">
              Endorsements
            </td>
            <td className="py-2 md:text-lg text-black">
              Divisional Pastor, Local Leaders
            </td>
          </tr>
        </tbody>
      </motion.table>
    </section>
  );
};

export default AppDetailsComponent;
