import ButtonLoader from "@/components/loaders/button";
import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateProgressReportMutation } from "@/redux/features/progress/progressApiSlice";
import { useNavigate, useSearch } from "react-location";
import toast from "react-hot-toast";

interface ProgressReportingComponentProps {
  data?: any;
}

const ProgressReportingComponent: React.FC<ProgressReportingComponentProps> = ({
  data,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const search = useSearch();

  const application = search?.id;

  const [reportProgress, { isLoading }] = useCreateProgressReportMutation();

  const formik = useFormik({
    initialValues: {
      progressDescription: data?.progressDescription || "",
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
        formData.append("application", application as string);
        formData.append(
          "progress_description",
          formik.values.progressDescription
        );
        formData.append("proof_of_progress", formik.values.doc as Blob);

        const res = await reportProgress(formData).unwrap();
        console.log("res ", res);

        if (res?.id) {
          toast(
            JSON.stringify({
              type: "success",
              title: res?.message ?? `Progress report submitted successfully`,
            })
          );
          formik.resetForm();
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
    <section className="font-poppins px-4 py-5">
      <h4 className="font-medium text-lg text-[#454545] mb-5">
        Submit Progress Report
      </h4>
      <form onSubmit={formik.handleSubmit}>
        <div>
          {/* Progress Description */}
          <div className="mt-5">
            <label
              htmlFor="progressDescription"
              className="font-medium text-lg text-black"
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
              className="border border-[#71839B] w-full h-36 rounded-md p-4 mt-2 text-base resize-none"
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
                        <p className="text-center">{formik.values.doc.name}</p>
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

          {/* Submit Button */}
          <div className="mt-5">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full h-14 text-white rounded-md bg-primary-50 hover:bg-primary-100 disabled:bg-opacity-80"
            >
              {isLoading ? (
                <ButtonLoader title="Submitting..." />
              ) : (
                " Submit Progress Update"
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ProgressReportingComponent;
