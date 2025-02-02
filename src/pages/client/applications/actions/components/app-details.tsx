import React from "react";
import { motion } from "framer-motion";

const AppDetailsComponent = () => {
  return (
    <section className="font-poppins px-4 py-5">
      <h4 className="font-medium text-lg text-[#454545] mb-5">
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
            <td className="py-3 font-medium text-lg text-black">
              Purpose of Aid
            </td>
            <td className="py-2 text-lg text-black">
              Renovation of the church building
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-3 font-medium text-lg text-black">
              Estimated Completion
            </td>
            <td className="py-2 text-lg text-black">June 10, 2025</td>
          </tr>
          <tr className="border-b">
            <td className="py-3 font-medium text-lg text-black">
              Endorsements
            </td>
            <td className="py-2 text-lg text-black">
              Divisional Pastor, Local Leaders
            </td>
          </tr>
        </tbody>
      </motion.table>
    </section>
  );
};

export default AppDetailsComponent;
