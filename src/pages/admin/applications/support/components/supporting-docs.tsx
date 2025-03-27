import React from "react";
import { FormikProps } from "formik";
import { FiUpload } from "react-icons/fi";
import ButtonLoader from "@/components/loaders/button";
import PDFModal from "@/components/pdf/pdf-modal";

interface ChurchInfoProps {
  title: string;
  description: string;
  formik: FormikProps<any>;
}

const SupportingDocs: React.FC<ChurchInfoProps> = ({
  formik,
  title,
  description,
}) => {
  const { values, handleBlur, handleChange, touched, errors } = formik;

  const docTypes = [
    {
      label: "Pictures of Current State",
      description: "Upload photos showing the current project state",
      value: values.currentStatePic,
      error: errors.currentStatePic,
    },
    {
      label: "Cost Estimates",
      description: "Attach cost estimates from contractors",
      value: values.costEstimateFIle,
      error: errors.costEstimateFIle,
    },
    {
      label: "Land Ownership Documents",
      description: "Upload land ownership or build permits",
      value: values.ownershipDoc,
      error: errors.ownershipDoc,
    },
    {
      label: "Invoices (Optional)",
      description: "Attach supplier invoices if available",
      value: values.invoices,
      error: errors.invoices,
    },
  ];

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        handleChange(e);
        // await uploadImage(file);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  };

  return (
    <div className="font-poppins">
      <h4 className="font-semibold text-lg text-black">{title} </h4>
      <p className="font-light text-lg text-[#71839B]">{description}</p>

      <div className="mt-8">
        {docTypes.map((doc, index) => (
          <div className="mt-5">
            <label className="font-medium text-lg text-black">
              {doc.label}
            </label>
            <div className="w-full py-12 border border-dashed border-[#71839B] relative group overflow-hidden rounded-xl transition-all duration-200 ease-in-out mt-3">
              <div className="flex h-full justify-center items-center transition-all duration-200 ease-in-out">
                <div className="flex flex-col items-center">
                  <FiUpload className="w-7 h-7 text-[#71839B] mb-3" />
                  <p className="font-light text-center text-[#71839B]">
                    {doc.description}
                  </p>
                  <label
                    htmlFor={`file-${index}`}
                    className="w-full flex justify-center items-center cursor-pointer"
                  >
                    <div className="w-40 h-10 flex justify-center items-center border border-[#324054] rounded-md mt-5">
                      Browse Files
                    </div>
                    <input
                      value={doc.value}
                      type="file"
                      name={`file-${index}`}
                      id={`file-${index}`}
                      accept="*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
              {false && (
                <div className="absolute z-20 inset-0 flex justify-center items-center bg-black bg-opacity-40 transition-all duration-200 ease-in-out">
                  <ButtonLoader title="" />
                </div>
              )}
            </div>
            {doc.error && typeof doc.error === "string" && (
              <p className="font-normal text-sm text-[#fc8181]">{doc.error}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportingDocs;
