import React from "react";
import { FormikProps } from "formik";
import SelectDropdown from "./select";

interface ChurchInfoProps {
  title: string;
  description: string;
  formik: FormikProps<any>;
}

const supportTypes = [
  { label: "Financial Support", value: "financial" },
  { label: "Material Support", value: "material" },
  { label: "Prayer Support", value: "prayer" },
  { label: "Moral Support", value: "moral" },
  { label: "Other", value: "other" },
];

const SupportInfo: React.FC<ChurchInfoProps> = ({
  formik,
  title,
  description,
}) => {
  const { values, handleBlur, handleChange, touched, errors } = formik;

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
            htmlFor="supportType"
            className=" block text-lg font-medium text-black"
          >
            Purpose For Aid
          </label>
          <SelectDropdown
            options={supportTypes}
            onChange={(value) => formik.setFieldValue("purposeForAid", value)}
          />
          {errors.purposeForAid && typeof errors.purposeForAid === "string" && (
            <p className="font-normal text-sm text-[#fc8181]">
              {errors.purposeForAid}
            </p>
          )}
        </div>

        <div className="mt-5">
          <label
            htmlFor="supportType"
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

        <div className="font-poppins mt-5">
          <label
            htmlFor="amountRequested"
            className=" block text-lg font-medium text-black"
          >
            Amount Requested
          </label>
          <input
            placeholder="Enter only the figure"
            type="number"
            name="amountRequested"
            id="amountRequested"
            value={values.amountRequested || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 mt-2 text-lg border border-[#71839B] placeholder:font-light disabled:bg-[#EFEFEF] rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent`}
          />
          {errors.amountRequested &&
            touched.amountRequested &&
            typeof errors.amountRequested === "string" && (
              <p className="font-normal text-sm text-[#fc8181]">
                {errors.amountRequested}
              </p>
            )}
        </div>

        <div className="font-poppins mt-5">
          <label
            htmlFor="amountRequested"
            className=" block text-lg font-medium text-black"
          >
            Expected Completion Date
          </label>
          <input
            // placeholder="Enter only the figure"
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
        </div>
      </div>
    </div>
  );
};

export default SupportInfo;
