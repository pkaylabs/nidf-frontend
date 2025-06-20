import React, { useState } from "react";
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
  const [showAidJustification, setShowAidJustification] = useState(false);
  const [showMonthlyRepayment, setShowMonthlyRepayment] = useState(false);

  const input = (
    label: string,
    name: string,
    type: string = "text",
    disabled: boolean = false,
    placeholder: string = ""
  ) => {
    return (
      <div className="font-poppins mt-5">
        <label
          htmlFor={name}
          className="block md:text-lg font-medium text-black"
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
          className="w-full px-4 py-3 mt-2 md:text-lg border border-[#71839B] placeholder:font-light disabled:bg-[#EFEFEF] rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
        />
        {errors[name] && touched[name] && typeof errors[name] === "string" && (
          <p className="font-normal text-sm text-[#fc8181]">{errors[name]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="font-poppins">
      <h4 className="font-semibold md:text-lg text-black">{title}</h4>
      <p className="font-light md:text-lg text-[#71839B]">{description}</p>

      <div className="mt-8">
        <div className="mt-5">
          <span className="md:text-lg font-medium text-black">
            Is this an emergency application?
          </span>
          <div className="flex items-center gap-4 mt-2">
            <label className="flex items-center">
              <input
                id="isEmergencyYes"
                name="isEmergency"
                type="radio"
                value="true"
                className="mr-2 size-5 bg-primary-50 border border-primary rounded-full focus:outline-none focus:ring-primary"
                checked={values.isEmergency === true}
                onChange={() =>
                  handleChange({ target: { name: "isEmergency", value: true } })
                }
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                id="isEmergencyNo"
                name="isEmergency"
                type="radio"
                value="false"
                className="mr-2 size-5 bg-primary-50 border border-primary rounded-full focus:outline-none focus:ring-primary"
                checked={values.isEmergency === false}
                onChange={() =>
                  handleChange({
                    target: { name: "isEmergency", value: false },
                  })
                }
              />
              No
            </label>
          </div>
          {errors.isEmergency && typeof errors.isEmergency === "string" && (
            <p className="font-normal text-sm text-[#fc8181]">
              {errors.isEmergency}
            </p>
          )}
        </div>

        {/* Support Type */}
        <div className="mt-5">
          <label
            htmlFor="supportType"
            className="block md:text-lg font-medium text-black"
          >
            Select Support Type
          </label>
          <SelectDropdown
            options={supportTypes}
            value={values.supportType || ""}
            onChange={(value) => {
              formik.setFieldValue("supportType", value);
              if (value === "AID") {
                setShowAidJustification(true);
              } else {
                setShowAidJustification(false);
              }

              if (value === "REVOLVING_FUND") {
                setShowMonthlyRepayment(true);
              } else {
                setShowMonthlyRepayment(false);
              }
            }}
          />
          {touched.supportType &&
            errors.supportType &&
            typeof errors.supportType === "string" && (
              <p className="font-normal text-sm text-[#fc8181]">
                {errors.supportType}
              </p>
            )}
        </div>

        {showAidJustification &&
          input(
            "Justification for Aid (For Aid only)",
            "purposeForAid",
            "text",
            false,
            "Enter Justification For Aid"
          )}

        {/* Church Project Type */}
        <div className="mt-5">
          <label
            htmlFor="typeOfChurchProject"
            className="block md:text-lg font-medium text-black"
          >
            Select Church Project Type
          </label>
          <SelectDropdown
            options={churchProjectTypes}
            value={values.typeOfChurchProject || ""}
            onChange={(value) =>
              formik.setFieldValue("typeOfChurchProject", value)
            }
          />
          {touched.typeOfChurchProject &&
            errors.typeOfChurchProject &&
            typeof errors.typeOfChurchProject === "string" && (
              <p className="font-normal text-sm text-[#fc8181]">
                {errors.typeOfChurchProject}
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

        {/* should only show when support type is revolving fund*/}
        {showMonthlyRepayment &&
          input(
            "Monthly Repayment Amount (Revolving Fund only)",
            "monthlyRepayment",
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

        {/* should be a dropdown. options: 1. Land acquisition, 2. Foundation, 3. Superstructure (columns, beams, blockwork etc.), 4. Roofing, 5. General finishes 6. Others (specify)*/}
        {input(
          "Project Phase to be Tackled/Supported",
          "phase",
          "text",
          false,
          "Enter Phase"
        )}

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
