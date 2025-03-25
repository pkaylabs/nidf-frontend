import React from "react";
import { FormikProps } from "formik";
import SelectDropdown from "./select";
import { churchProjectTypes, supportTypes } from "@/constants";

interface ChurchInfoProps {
  title: string;
  description: string;
  formik: FormikProps<any>;
}

const SupportInfo: React.FC<ChurchInfoProps> = ({
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
    placeholder: string = ""
  ) => {
    return (
      <div className="font-poppins mt-5">
        <label htmlFor={name} className=" block text-lg font-medium text-black">
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
          className={`w-full px-4 py-3 mt-2 text-lg border border-[#71839B] placeholder:font-light disabled:bg-[#EFEFEF] rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent`}
        />
        {errors[name] && touched[name] && typeof errors[name] === "string" && (
          <p className="font-normal text-sm text-[#fc8181]">{errors[name]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="font-poppins">
      <h4 className="font-semibold text-lg text-black">{title} </h4>
      <p className="font-light text-lg text-[#71839B]">{description}</p>

      <div className="mt-8">
        <div className="mt-5">
          <label
            htmlFor="supportType"
            className=" block text-lg font-medium text-black"
          >
            Select Support Type
          </label>
          <SelectDropdown
            options={supportTypes}
            onChange={(value) => formik.setFieldValue("supportType", value)}
          />
          {errors.supportType && typeof errors.supportType === "string" && (
            <p className="font-normal text-sm text-[#fc8181]">
              {errors.supportType}
            </p>
          )}
        </div>

        <div className="mt-5">
          <label
            htmlFor="typeOfChurchProject"
            className=" block text-lg font-medium text-black"
          >
            Select Church Project Type
          </label>
          <SelectDropdown
            options={churchProjectTypes}
            onChange={(value) =>
              formik.setFieldValue("typeOfChurchProject", value)
            }
          />
          {errors.typeOfChurchProject &&
            typeof errors.typeOfChurchProject === "string" && (
              <p className="font-normal text-sm text-[#fc8181]">
                {errors.typeOfChurchProject}
              </p>
            )}
        </div>

        {input(
          "Purpose For Aid",
          "purposeForAid",
          "text",
          false,
          "Enter Purpose For Aid"
        )}

        <div className="mt-5">
          <label
            className=" flex items-center text-lg font-medium text-black"
            htmlFor="isEmergency"
          >
            <input
              id="isEmergency"
              name="isEmergency"
              type="checkbox"
              className="mr-2 size-5 bg-primary-50 border border-primary rounded-lg focus:outline-none  focus:ring-primary "
              checked={formik.values.isEmergency}
              onChange={formik.handleChange}
            />
            Is Emergency
          </label>
          {errors.isEmergency && typeof errors.isEmergency === "string" && (
            <p className="font-normal text-sm text-[#fc8181]">
              {errors.isEmergency}
            </p>
          )}
        </div>

        <div className="mt-5">
          <label
            htmlFor="progressDescription"
            className=" block text-lg font-medium text-black"
          >
            Progress Description
          </label>
          <textarea
            placeholder="Write a brief description of the current projects’ status..."
            name="progressDescription"
            id="progressDescription"
            value={values.progressDescription || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full h-32 px-4 py-3 mt-2 text-lg border border-[#71839B] placeholder:font-light rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent`}
          />
          {errors.progressDescription &&
            typeof errors.progressDescription === "string" && (
              <p className="font-normal text-sm text-[#fc8181]">
                {errors.progressDescription}
              </p>
            )}
        </div>

        {input(
          "Amount Requested",
          "amountRequested",
          "text",
          false,
          "Enter only the figure"
        )}
        {input(
          "Amount Requested In Words",
          "amountInWords",
          "text",
          false,
          "Enter Amount Requested In Words"
        )}
        {input(
          "Estimated Project Cost",
          "estimatedProjectCost",
          "text",
          false,
          "Enter only the figure"
        )}
        {input(
          "Project Location",
          "projectLocation",
          "text",
          false,
          "Enter Project Location"
        )}
        {input("Phase", "phase", "text", false, "Enter Phase")}

        {/* <div className="font-poppins mt-5">
          <label
            htmlFor="expectedCompletionDate"
            className=" block text-lg font-medium text-black"
          >
            Expected Completion Date
          </label>
          <input
            type="date"
            name="expectedCompletionDate"
            id="expectedCompletionDate"
            value={values.expectedCompletionDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 mt-2 text-lg border border-[#71839B] placeholder:font-light placeholder:text-gray-300 disabled:bg-[#EFEFEF] rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent`}
          />
          {errors.expectedCompletionDate &&
            touched.expectedCompletionDate &&
            typeof errors.expectedCompletionDate === "string" && (
              <p className="font-normal text-sm text-[#fc8181]">
                {errors.expectedCompletionDate}
              </p>
            )}
        </div> */}
        {input(
          "Expected Completion Date",
          "expectedCompletionDate",
          "date",
          false,
          "Enter Expected Completion Date"
        )}
      </div>
    </div>
  );
};

export default SupportInfo;
