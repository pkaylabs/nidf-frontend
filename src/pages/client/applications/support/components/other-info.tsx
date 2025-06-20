import React from "react";
import { FormikProps } from "formik";
import SelectDropdown from "./select";
import { supportTypes } from "@/constants";

interface ChurchInfoProps {
  title: string;
  description: string;
  formik: FormikProps<any>;
}

const OtherInfo: React.FC<ChurchInfoProps> = ({
  formik,
  title,
  description,
}) => {
  const { values, handleBlur, handleChange, touched, errors } = formik;

  const input = (
    label: string,
    name: string,
    type: string = "text",
    disabled: boolean = false,
    placeholder: string = "",
    additionalInfo: string = ""
  ) => {
    return (
      <div className="font-poppins mt-5">
        <label
          htmlFor={name}
          className=" block md:text-lg font-medium text-black"
        >
          {label}
        </label>
        <input
          disabled={disabled}
          placeholder={placeholder}
          type={type}
          name={name}
          id={name}
          value={values[name] || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 mt-2 md:text-lg border border-[#71839B] placeholder:font-light disabled:bg-[#EFEFEF] rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent`}
        />
        <p className="font-light text-gray-400 text-sm mt-1 ">
          {additionalInfo}
        </p>
        {errors[name] && touched[name] && typeof errors[name] === "string" && (
          <p className="font-normal text-sm text-[#fc8181]">{errors[name]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="font-poppins">
      <h4 className="font-semibold md:text-lg text-black">{title} </h4>
      <p className="font-light md:text-lg text-[#71839B]">{description}</p>

      <div className="mt-8">
        {input(
          "Average Service Attendance",
          "avgServiceAttendance",
          "text",
          false,
          "Enter only numbers"
        )}
        {input(
          "Average Monthly Income",
          "avgMonthlyIncome",
          "text",
          false,
          "Enter only numbers"
        )}
        {input(
          "Average Monthly Contributions",
          "avgMonthlyContributions",
          "text",
          false,
          "Enter only numbers",
          "Average monthly contributions towards the building or other infrastructure projects over the past six (6) months"
        )}

        {input(
          "Average Monthly Expenses",
          "avgMonthlyExpenses",
          "text",
          false,
          "Enter only numbers"
        )}
        {input(
          "Available Funds for Project",
          "availableFundsForProject",
          "text",
          false,
          "Enter only numbers"
        )}
      </div>
    </div>
  );
};

export default OtherInfo;
