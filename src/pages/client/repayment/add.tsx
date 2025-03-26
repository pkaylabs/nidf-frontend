import Select from "@/components/core/select";
import ButtonLoader from "@/components/loaders/button";
import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";
import { useNavigate, useSearch } from "react-location";
import { IoIosArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { useCreateRepaymentMutation } from "@/redux/features/repayment/repaymentApiSlice";
import { useGetApplicationsQuery } from "@/redux/features/applications/applicationsApiSlice";
import SelectDropdown from "../applications/support/components/select";
import { useGetDashboardDataQuery } from "@/redux/features/dashbaord/dashbaordApiSlice";
import moment from "moment";

const AddRepayment = () => {
  const navigate = useNavigate();
  const search = useSearch<any>();

  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [addRepayment, { isLoading }] = useCreateRepaymentMutation();
  const {
    data,
    isLoading: fetchingApplications,
    refetch,
    isError,
  } = useGetApplicationsQuery({});
  const { data: dashboardStat, isLoading: loadingDashboadStat } =
    useGetDashboardDataQuery({});
  // console.log(dashboardStat, "dashboardStat");

  const applicationOptions = data?.map((app: any) => {
    return { label: app?.purpose, value: app?.id };
  });

  const loan = [
    { name: "Total Loan Amount", value: dashboardStat?.arrears ?? "0" },
    { name: " Amount Repaid", value: dashboardStat?.amount_repaid ?? "0" },
    {
      name: "Outstanding Balance",
      value: dashboardStat?.outstanding_balance ?? "0",
    },
    {
      name: "Next Repayment Due",
      value:
        moment(dashboardStat?.next_due_date).format("LL") ?? "Date not set",
    },
  ];

  const formik = useFormik({
    initialValues: {
      application: "",
      paymentDate: "",
      amountPaid: "",
      paymentReference: "",
      doc: null as File | null,
    },
    validationSchema: Yup.object({
      application: Yup.string().required("Application is required"),
      paymentDate: Yup.string().required("Payment date is required"),
      amountPaid: Yup.string().required("Amount paid is required"),
      paymentReference: Yup.string().required("Payment reference is required"),
      doc: Yup.mixed().required("Supporting document is required"),
    }),
    onSubmit: async (values) => {
      console.log("Submitted values: ", values);

      try {
        const formData = new FormData();
        formData.append("application", formik.values.application as string);
        formData.append("date_paid", formik.values.paymentDate);
        formData.append("amount", formik.values.amountPaid);
        formData.append("payment_reference", formik.values.paymentReference);
        formData.append("proof_of_payment", formik.values.doc as Blob);

        const res = await addRepayment(formData).unwrap();

        if (res?.id) {
          toast(
            JSON.stringify({
              type: "success",
              title:
                res?.message ??
                `Repayment Reconciliation submitted successfully`,
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
            title: error?.data?.error ?? "An error occurred",
          })
        );
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      formik.setFieldValue("doc", file);
    }
  };

  // Clean up the object URL when the component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (search?.repayment_id) {
      formik.setValues({
        application: search?.application_id,
        paymentDate: search?.date_paid,
        amountPaid: search?.amount,
        paymentReference: search?.payment_reference,
        doc: search?.proof_of_payment,
      });
    }
  }, [search]);

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
  }: FormikProps<any> = formik;

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
    <section className="font-poppins p-5">
      <button
        onClick={() => navigate({ to: ".." })}
        className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2.5 px-4 rounded-md transition-all duration-150 ease-in-out mb-5"
      >
        <IoIosArrowRoundBack className="size-5" aria-hidden="true" />{" "}
        <span>Back to Repayments</span>
      </button>
      <div className=" mb-5 p-8 bg-white rounded-md ">
        <p className="font-medium  text-black mb-3">Outstanding Loan Details</p>
        <div className="flex space-x-2 justify-between items-center ">
          {loan.map((loans, index) => (
            <div className="max-w-[241px] w-full border px-3 py-5 border-[#71839B] rounded-md">
              <p className="font-light text-sm text-black ">{loans.name}</p>
              <p className="font-medium text-2xl text-black mt-3">
                {index !== 3 && "GHS"} {loans.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-8 bg-white rounded-md ">
        <div className="">
          <p className="font-medium text-lg text-black ">Submit Repayment</p>
          <p className="flex justify-between items-center w-full cursor-default text-gray-400 mt-1">
            Enter the details of your latest repayment
          </p>
        </div>
        <div className="mt-5">
          <label
            htmlFor="application"
            className="block text-lg font-medium text-black"
          >
            Select Application
          </label>
          <SelectDropdown
            options={applicationOptions}
            value={formik.values.application || ""}
            onChange={(value) => formik.setFieldValue("application", value)}
          />
          {formik.touched.application &&
            formik.errors.application &&
            typeof formik.errors.application === "string" && (
              <p className="font-normal text-sm text-[#fc8181]">
                {formik.errors.application}
              </p>
            )}
        </div>

        {/* Input*/}
        <div className="mt-5">
          {input(
            "Payment Date",
            "paymentDate",
            "date",
            false,
            "Enter Payment Date"
          )}
        </div>

        {/* Input */}
        <div className="mt-5">
          {input(
            "Amount Paid",
            "amountPaid",
            "text",
            false,
            "Enter Amount Paid"
          )}
        </div>

        {/* Input */}
        <div className="mt-5">
          {input(
            "Payment Reference",
            "paymentReference",
            "text",
            false,
            "Enter Payment Reference"
          )}
        </div>

        {/* File Upload */}
        <div className="mt-5">
          <label className="font-medium text-lg text-black">
            Upload Supporting Documents or Photos
          </label>
          <div className="mt-5">
            <div className="w-full py-12 border border-dashed border-[#71839B] relative group overflow-hidden rounded-xl transition-all duration-200 ease-in-out mt-3">
              <div className="flex h-full justify-center items-center transition-all duration-200 ease-in-out">
                <div className="flex flex-col items-center mb-5">
                  {formik.values.doc ? (
                    formik.values.doc instanceof File &&
                    formik.values.doc.type.startsWith("image/") ? (
                      previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-40 h-40 object-cover"
                        />
                      ) : null
                    ) : (
                      // <p className="text-center">{formik.values.doc.name}</p>
                      <p>
                        {!formik.values.doc.name
                          ? search?.proof_of_payment
                            ? search?.proof_of_payment?.replace(
                                "/assets/repayments/",
                                ""
                              )
                            : formik.values.doc.name
                          : formik.values.doc.name}
                      </p>
                    )
                  ) : (
                    <>
                      <FiUpload className="w-7 h-7 text-[#71839B] mb-3" />
                      <p className="font-light text-center text-[#71839B]">
                        Drag and drop files here, or click to browse.
                        <br />
                        Supported formats: PDF, DOCX, XLSX, JPG, PNG (max 10MB
                        per file)
                      </p>
                    </>
                  )}
                </div>
              </div>
              {/* Optional overlay loader */}
              {false && (
                <div className="absolute z-20 inset-0 flex justify-center items-center bg-black bg-opacity-40 transition-all duration-200 ease-in-out">
                  <ButtonLoader title="" />
                </div>
              )}
              {/* Browse Files Button */}
              <div className="absolute bottom-4 w-full flex justify-center">
                <label
                  htmlFor="doc"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="w-40 h-10 flex justify-center items-center border border-[#324054] rounded-md">
                    Browse Files
                  </div>
                  <input
                    type="file"
                    name="doc"
                    id="doc"
                    accept="image/*,application/pdf,.doc,.docx,.xlsx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
            {formik.touched.doc && formik.errors.doc && (
              <p className="font-normal text-sm text-[#fc8181]">
                {formik.errors.doc}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-5 mt-6">
          <button
            onClick={() => handleSubmit()}
            className="font-poppins font-light w-56 h-10 bg-primary text-[#F5F5F5] flex justify-center items-center border border-primary rounded-md  "
          >
            {isLoading ? (
              <ButtonLoader title="Submitting..." />
            ) : (
              <span>Submit Repayment Data</span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddRepayment;
