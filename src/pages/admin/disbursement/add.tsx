import React from "react";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-location";
import SelectDropdown from "../applications/support/components/select";
import { supportTypes } from "@/pages/client/applications/support/components/support-info";

const AddDisbursement = () => {
  const navigate = useNavigate();
  const formik: FormikProps<any> = useFormik({
    initialValues: {
      projectName: "",
      bankName: "",
      applicantChurchName: "DLCF Legon ",
      bankAccountNumber: "",
      amountToDisburse: 0,
      paymentReferenceId: "",
      disbursementDate: "",
      uploadPaymentProof: "",
    },
    validationSchema: Yup.object().shape({
      projectName: Yup.string().required("Project name is required"),
      bankName: Yup.string().required("Bank name is required"),
      applicantChurchName: Yup.string().required(
        "Applicant church name is required"
      ),
      bankAccountNumber: Yup.string().required(
        "Bank account number is required"
      ),
      amountToDisburse: Yup.number().required("Amount to disburse is required"),
      paymentReferenceId: Yup.string().required(
        "Payment reference ID is required"
      ),
      disbursementDate: Yup.string().required("Disbursement date is required"),
      uploadPaymentProof: Yup.string().required("Payment proof is required"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted: ", values);
    },
  });

  const { handleSubmit, handleChange, values, errors, handleBlur, touched } =
    formik;

  const input = (
    label: string,
    name: string,
    type: string = "text",
    disabled: boolean = false,
    placeholder: string = ""
  ) => {
    return (
      <div className="font-poppins ">
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
    <main className="font-poppins p-5">
      <div className="flex items-center gap-x-4 mb-5">
        <button
          onClick={() => navigate({ to: ".." })}
          className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2.5 px-4 rounded-md transition-all duration-150 ease-in-out "
        >
          <IoIosArrowRoundBack className="size-5" aria-hidden="true" />{" "}
          <span>Back</span>
        </button>
        <h4 className="font-medium text-2xl text-[#252525] ">
          Add New Disbursement
        </h4>
      </div>

      <section className="p-5 rounded-md bg-white ">
        <h4 className="font-semibold text-lg text-black mb-4">
          Add New Disbursement
        </h4>
        <p className=" font-light text-lg text-[#71839B] ">
          Enter the details of your latest Disbursement
        </p>

        <div className="w-full mt-3">
          <div className="w-full flex items-center gap-4 mt-5">
            <div className="flex-1 ">
              <label
                htmlFor="projectName"
                className=" block text-lg font-medium text-black"
              >
                Project Name
              </label>
              <SelectDropdown
                options={supportTypes}
                onChange={(value) => formik.setFieldValue("projectName", value)}
              />
              {errors.projectName && typeof errors.projectName === "string" && (
                <p className="font-normal text-sm text-[#fc8181]">
                  {errors.projectName}
                </p>
              )}
            </div>
            <div className="flex-1 ">
              <label
                htmlFor="bankName"
                className=" block text-lg font-medium text-black"
              >
                Bank Name
              </label>
              <SelectDropdown
                options={supportTypes}
                onChange={(value) => formik.setFieldValue("bankName", value)}
              />
              {errors.bankName && typeof errors.bankName === "string" && (
                <p className="font-normal text-sm text-[#fc8181]">
                  {errors.bankName}
                </p>
              )}
            </div>
          </div>

          <div className="w-full flex items-center gap-4 mt-5">
            <div className="flex-1 ">
              {input(
                "Applicant Church Name",
                "applicantChurchName",
                "text",
                true
              )}
            </div>
            <div className="flex-1 ">
              {input(
                "Bank Account Number",
                "bankAccountNumber",
                "text",
                false,
                "Enter"
              )}
            </div>
          </div>

          <div className="w-full flex items-center gap-4 mt-5">
            <div className="flex-1 ">
              {input(
                "Amount to Disburse",
                "amountToDisburse",
                "number",
                false,
                "Enter"
              )}
            </div>
            <div className="flex-1 ">
              {input(
                "Payment Reference ID",
                "paymentReferenceId",
                "text",
                false,
                "Enter"
              )}
            </div>
          </div>

          <div className="w-full flex items-center gap-4 mt-5">
            <div className="flex-1 ">
              {input(
                "Disbursement Date",
                "disbursementDate",
                "date",
                false,
                "Enter"
              )}
            </div>
            <div className="flex-1 ">
              {input(
                "Upload Payment Proof",
                "uploadPaymentProof",
                "file",
                false,
                "Enter"
              )}
            </div>
          </div>


          <button className="my-6 bg-primary-50 w-60 h-[50px] flex justify-center items-center text-white rounded-md">Submit Disbursement</button>
        </div>
      </section>
    </main>
  );
};

export default AddDisbursement;
