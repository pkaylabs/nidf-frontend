import React from "react";
import { FormikProps } from "formik";
import { FiUpload } from "react-icons/fi";
import ButtonLoader from "@/components/loaders/button";
import { useSearch } from "react-location";

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
  const { values, errors, setFieldValue, touched } = formik;
  const search = useSearch<any>();

  // Store preview URLs for each file field
  const [previewUrls, setPreviewUrls] = React.useState<{
    [key: string]: string;
  }>({});

  const docTypes = [
    {
      documentName: search?.current_stage?.replace(
        "/assets/applications/current_stage/",
        ""
      ),
      check: search?.current_stage,
      label: "Pictures of Current State",
      description: "Upload photos showing the current project state",
      value: values.currentStatePic,
      error: errors.currentStatePic,
      name: "currentStatePic",
    },
    {
      documentName: search?.cost_estimate?.replace(
        "/assets/applications/cost_estimate/",
        ""
      ),
      check: search?.cost_estimate,
      label: "Cost Estimates",
      description: "Attach cost estimates from contractors",
      value: values.costEstimateFIle,
      error: errors.costEstimateFIle,
      name: "costEstimateFIle",
    },
    {
      documentName: search?.land_ownership?.replace(
        "/assets/applications/land_ownership/",
        ""
      ),
      check: search?.land_ownership,
      label: "Land Documents/Written Explanation",
      description: "Upload land ownership or build permits",
      value: values.ownershipDoc,
      error: errors.ownershipDoc,
      name: "ownershipDoc",
    },
    {
      documentName: search?.invoices?.replace(
        "/assets/applications/invoices/",
        ""
      ),
      check: search?.invoices,
      label: "Invoices (Optional)",
      description: "Attach supplier invoices if available",
      value: values.invoices,
      error: errors.invoices,
      name: "invoices",
    },
  ];

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Revoke previous URL if it exists to avoid memory leaks
        if (previewUrls[name]) {
          URL.revokeObjectURL(previewUrls[name]);
        }
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrls((prev) => ({ ...prev, [name]: objectUrl }));
        setFieldValue(name, file);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  };

  React.useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [previewUrls]);

  return (
    <div className="font-poppins">
      <h4 className="font-semibold md:text-lg text-black">{title}</h4>
      <p className="font-light md:text-lg text-[#71839B]">{description}</p>

      <div className="mt-8">
        {docTypes.map((doc, index) => (
          <div key={index} className="mt-5">
            <label className="font-medium md:text-lg text-black">
              {doc.label}
            </label>
            <div className="w-full py-12 border border-dashed border-[#71839B] relative group overflow-hidden rounded-xl transition-all duration-200 ease-in-out mt-3">
              <div className="flex h-full justify-center items-center transition-all duration-200 ease-in-out">
                <div className="flex flex-col items-center mb-8">
                  {doc.value ? (
                    doc.value instanceof File &&
                    doc.value.type.startsWith("image/") ? (
                      previewUrls[doc.name] ? (
                        <img
                          src={previewUrls[doc.name]}
                          alt="Preview"
                          className="w-40 h-40 object-cover"
                        />
                      ) : null
                    ) : (
                      <p>
                        {!doc.value?.name
                          ? doc.check
                            ? doc?.documentName
                            : doc.value?.name
                          : doc.value?.name}
                      </p>
                    )
                  ) : (
                    <>
                      <FiUpload className="w-7 h-7 text-[#71839B] mb-3" />
                      <p className="font-light text-sm md:text-base text-center text-[#71839B]">
                        {doc.description}
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
              {/* The Browse Files button is rendered inside the field at the bottom */}
              <div className="absolute bottom-4 w-full flex justify-center">
                <label
                  htmlFor={`file-${index}`}
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="w-40 h-10 flex justify-center items-center border border-[#324054] rounded-md">
                    Browse Files
                  </div>
                  <input
                    type="file"
                    name={doc.name}
                    id={`file-${index}`}
                    accept="*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e, doc.name)}
                  />
                </label>
              </div>
            </div>
            {touched[doc.name] &&
              doc.error &&
              typeof doc.error === "string" && (
                <p className="font-normal text-sm text-[#fc8181]">
                  {doc.error}
                </p>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportingDocs;
