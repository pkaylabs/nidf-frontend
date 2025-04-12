import React from "react";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-location";

import { bankNames, supportTypes } from "@/constants";
import { useCreateDisbursementMutation } from "@/redux/features/disbursements/disbursementsApiSlice";
import toast from "react-hot-toast";
import { useGetApplicationsQuery } from "@/redux/features/applications/applicationsApiSlice";
import SelectDropdown from "@/pages/client/applications/support/components/select";
import ButtonLoader from "@/components/loaders/button";

const AddDisbursement = () => {
  const navigate = useNavigate();

  const [createDisbursement, { isLoading }] = useCreateDisbursementMutation();

  const {
    data,
  } = useGetApplicationsQuery({});

  const applicationOptions = data?.map((app: any) => {
    return { label: app?.purpose, value: app?.id };
  });

  const formik: FormikProps<any> = useFormik({
    initialValues: {
      application: "",
      bankName: "",
      applicantChurchName: "",
      bankAccountNumber: "",
      bankAccountName: "",
      amountToDisburse: 0,
      paymentReferenceId: "",
      disbursementDate: "",
      uploadPaymentProof: null as File | null,
    },
    validationSchema: Yup.object().shape({
      application: Yup.string().required("Application is required"),
      bankName: Yup.string().required("Bank name is required"),
      applicantChurchName: Yup.string().required(
        "Applicant church name is required"
      ),
      bankAccountNumber: Yup.string().required(
        "Bank account number is required"
      ),
      bankAccountName: Yup.string().required("Bank account name is required"),
      amountToDisburse: Yup.number()
        .required("Amount to disburse is required")
        .moreThan(0),
      paymentReferenceId: Yup.string().required(
        "Payment reference ID is required"
      ),
      disbursementDate: Yup.string().required("Disbursement date is required"),
      uploadPaymentProof: Yup.mixed().required("Payment proof is required"),
    }),
    onSubmit: async (values) => {
      // console.log("Form Submitted: ", values);
      try {
        const formData = new FormData();
        formData.append("application", values.application as string);
        formData.append("date_paid", values.disbursementDate);
        formData.append("bank_name", values.bankName as string);
        formData.append("account_name", values.bankAccountName as string);
        formData.append("account_number", values.bankAccountNumber as string);
        formData.append("amount", values.amountToDisburse as any);
        formData.append("payment_reference", values.paymentReferenceId as string);
        formData.append("proof_of_payment", values.uploadPaymentProof as Blob);

        const res = await createDisbursement(formData).unwrap();
        console.log(res, "reposeifnerfvef");
        
        if (res) {
          toast(
            JSON.stringify({
              type: "success",
              title: res?.message ?? "Disbursement added successfully",
            })
          );

          formik.resetForm();

          navigate({ to: ".." });
        } else {
          toast(
            JSON.stringify({
              type: "error",
              title: "An error occurred",
            })
          );
        }
      } catch (error: any) {
        console.log(error);
        toast(
          JSON.stringify({
            type: "error",
            title: error?.data?.message ?? "An error occurred",
          })
        );
      }
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
    const isFile = type === "file";

    return (
      <div className="font-poppins">
        <label htmlFor={name} className="block text-lg font-medium text-black">
          {label}
        </label>
        <input
          disabled={disabled}
          placeholder={placeholder}
          type={type}
          name={name}
          id={name}
          value={isFile ? undefined : values[name] || ""}
          onChange={(e) => {
            if (isFile) {
              formik.setFieldValue(name, e.currentTarget.files?.[0] ?? null);
            } else {
              handleChange(e);
            }
          }}
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

      {/* Wrap your form fields in a form element */}
      <form onSubmit={handleSubmit}>
        <section className="p-5 rounded-md bg-white ">
          <h4 className="font-semibold text-lg text-black mb-4">
            Add New Disbursement
          </h4>
          <p className=" font-light text-lg text-[#71839B] ">
            Enter the details of your latest Disbursement
          </p>

          <div className="w-full mt-3">
            <div className="w-full flex items-center gap-4 mt-5">
              <div className="flex-1">
                <label
                  htmlFor="application"
                  className="block text-lg font-medium text-black"
                >
                  Select Application
                </label>
                <SelectDropdown
                  options={applicationOptions}
                  value={values.application}
                  onChange={(value) => {
                    const selectedApp = data?.find(
                      (app: any) => app.id === value
                    );
                    formik.setFieldValue("application", value);
                    formik.setFieldValue(
                      "applicantChurchName",
                      selectedApp?.church?.name ?? ""
                    );
                  }}
                />
                {touched.application &&
                  errors.application &&
                  typeof errors.application === "string" && (
                    <p className="font-normal text-sm text-[#fc8181]">
                      {errors.application}
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
                  options={bankNames}
                  value={values.bankName}
                  onChange={(value) => formik.setFieldValue("bankName", value)}
                />
                {touched.bankName &&
                  errors.bankName &&
                  typeof errors.bankName === "string" && (
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
                  "Bank Account Name",
                  "bankAccountName",
                  "text",
                  false,
                  "Enter"
                )}
              </div>
              <div className="flex-1 ">
                {input(
                  "Amount to Disburse",
                  "amountToDisburse",
                  "number",
                  false,
                  "Enter"
                )}
              </div>
            </div>

            <div className="w-full flex items-center gap-4 mt-5">
              <div className="flex-1 ">
                {input(
                  "Payment Reference ID",
                  "paymentReferenceId",
                  "text",
                  false,
                  "Enter"
                )}
              </div>
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

            {/* Now the button is inside the form and of type="submit" */}
            <button
              disabled={isLoading}
              type="submit"
              className="my-6 bg-primary-50 w-60 h-[50px] flex justify-center items-center text-white
               rounded-md disabled:bg-opacity-80 "
            >
              {isLoading ? (
                <ButtonLoader title="Submitting..." />
              ) : (
                "Submit Disbursement "
              )}
            </button>
          </div>
        </section>
      </form>
    </main>
  );
};

export default AddDisbursement;
