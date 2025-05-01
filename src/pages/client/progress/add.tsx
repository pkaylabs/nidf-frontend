import Select from "@/components/core/select";
import ButtonLoader from "@/components/loaders/button";
import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useSearch } from "react-location";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateProgressReportMutation } from "@/redux/features/progress/progressApiSlice";
import SelectDropdown from "../applications/support/components/select";
import { useGetApplicationsQuery } from "@/redux/features/applications/applicationsApiSlice";

const AddProgressReport = () => {
  const navigate = useNavigate();

  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [reportProgress, { isLoading }] = useCreateProgressReportMutation();
  const {
    data,
    isLoading: fetchingApplications,
    refetch,
    isError,
  } = useGetApplicationsQuery({});

  const applicationOptions = data?.map((app: any) => {
    return { label: app?.purpose, value: app?.id };
  });

  const formik = useFormik({
    initialValues: {
      application: "",
      progressDescription: "",
      doc: null as File | null,
    },
    validationSchema: Yup.object({
      progressDescription: Yup.string().required(
        "Progress description is required"
      ),
      doc: Yup.mixed().required("Supporting document is required"),
    }),
    onSubmit: async (values) => {
      console.log("Submitted values: ", values);

      try {
        const formData = new FormData();
        formData.append("application", formik.values.application as string);
        formData.append(
          "progress_description",
          formik.values.progressDescription
        );
        formData.append("proof_of_progress", formik.values.doc as Blob);

        const res = await reportProgress(formData).unwrap();
        

        if (res?.id) {
          toast(
            JSON.stringify({
              type: "success",
              title: res?.message ?? `Progress report submitted successfully`,
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

  return (
    <section className="font-poppins p-3 md:p-5">
      <button
        onClick={() => navigate({ to: ".." })}
        className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2.5 px-4 rounded-md transition-all duration-150 ease-in-out mb-5"
      >
        <IoIosArrowRoundBack className="size-5" aria-hidden="true" />{" "}
        <span className="hidden md:block">Back to Progress</span>
      </button>
      <div className="p-4 md:p-10 bg-white rounded-md ">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="mt-5">
              <label
                htmlFor="application"
                className="block md:text-lg font-medium text-black"
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
            {/* Progress Description */}
            <div className="mt-5">
              <label
                htmlFor="progressDescription"
                className="font-medium md:text-lg text-black"
              >
                Progress Description
              </label>
              <textarea
                name="progressDescription"
                id="progressDescription"
                value={formik.values.progressDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Write a brief description of the current projects’ status..."
                className="border border-[#71839B] w-full h-36 rounded-md p-4 mt-2 text-sm md:text-base resize-none"
              />
              {formik.touched.progressDescription &&
                formik.errors.progressDescription && (
                  <p className="font-normal text-sm text-[#fc8181]">
                    {typeof formik.errors.progressDescription === "string" &&
                      formik.errors.progressDescription}
                  </p>
                )}
            </div>

            {/* File Upload */}
            <div className="mt-5">
              <label className="font-medium md:text-lg text-black">
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
                          <p className="text-center">
                            {formik.values.doc.name}
                          </p>
                        )
                      ) : (
                        <>
                          <FiUpload className="w-7 h-7 text-[#71839B] mb-3" />
                          <p className="font-light text-sm md:text-base px-2 text-center text-[#71839B]">
                            Drag and drop files here, or click to browse.
                            <br />
                            Supported formats: PDF, DOCX, XLSX, JPG, PNG (max
                            10MB per file)
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

            {/* Submit Button */}
            <div className="flex items-center gap-3 md:gap-5 mt-6">
              <button
                disabled={isLoading}
                type="submit"
                className="font-poppins font-light w-full px-2 md:w-56 h-10 bg-primary text-[#F5F5F5] flex justify-center items-center border border-primary rounded-md  "
              >
                {isLoading ? (
                  <ButtonLoader title="Submitting..." />
                ) : (
                  " Submit Progress Report"
                )}
              </button>
              <button
                onClick={() => formik.resetForm()}
                type="button"
                className="font-poppins font-light px-2 w-40 h-10 flex justify-center items-center border border-[#324054] rounded-md text-[#324054]  "
              >
                Reset Form
              </button>
            </div>
          </div>
        </form>

        {/* <div className="flex flex-col mt-5">
          <label className="font-medium text-lg text-black ">
            Previously Uploaded Files
          </label>
          <div className="mt-2">
            {[1, 2, 3].map((_, i) => (
              <div className="flex justify-between items-start mb-3.5">
                <div className="flex items-start space-x-2">
                  <FaRegFileAlt
                    className="size-6 text-[#17567E] mt-1.5"
                    aria-hidden="true"
                  />
                  <div className="">
                    <p className="text-black">progress_report.pdf</p>
                    <p className="text-[#71839B] text-sm">
                      Uploaded on Jan 10, 2025 by Pastor John Sam.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="font-poppins font-light w-40 h-10 flex justify-center items-center border border-[#324054] rounded-md text-[#324054] hover:bg-[#324054] hover:text-white transition-all duration-200 ease-in-out ">
                    View
                  </button>
                  <button className="font-poppins font-light w-40 h-10 flex justify-center items-center border border-[#CE5347] rounded-md text-[#CE5347] hover:bg-[#CE5347] hover:text-white transition-all duratioin-200 ease-in-out ">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default AddProgressReport;
