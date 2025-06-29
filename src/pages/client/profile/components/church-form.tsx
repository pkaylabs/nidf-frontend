import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useMemo, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import {
  useGetChurchProfileQuery,
  useUdpateChurchMutation,
} from "@/redux/features/churches/churchApiSlice";
import { useGetRegionsQuery } from "@/redux/features/regions/regionApiSlice";
import { useGetDivisionsQuery } from "@/redux/features/divisions/divisionApiSlice";
import toast from "react-hot-toast";
import { churchStatus } from "@/constants";
import SelectDropdown from "../../applications/support/components/select";
import { Save } from "lucide-react";
import { motion } from "framer-motion";
import SearchableCombobox from "@/components/core/searchable-dropdown";

const ChurchForm = () => {
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [selectedDivision, setSelectedDivision] = useState<any>(null);
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    document.title = "NIDF | Profile";
  }, []);

  const { data } = useGetRegionsQuery({});
  const { data: divisionsData } = useGetDivisionsQuery({});
  const regions = data?.region || [];
  const divisions = divisionsData?.divisions || [];
  const { data: churchData, refetch } = useGetChurchProfileQuery({});

  const [updateChurch, { isLoading }] = useUdpateChurchMutation();

  const filteredDivisions = useMemo(() => {
    if (!selectedRegion) {
      return divisions;
    }
    return divisions.filter(
      (division: any) =>
        division.region && division.region.id === selectedRegion.id
    );
  }, [divisions, selectedRegion]);

  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      name: churchData?.location_name ?? "",
      location: churchData?.location_address ?? "",
      region: churchData?.region?.id ?? "",
      division: churchData?.district?.id ?? "",
      phone: churchData?.church_phone ?? "",
      email: churchData?.church_email ?? "",
      status: churchData?.church_status ?? "",
      pastor_name: churchData?.pastor_name ?? "",
      pastor_phone: churchData?.pastor_phone ?? "",
      pastor_email: churchData?.pastor_email ?? "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      location: Yup.string().required("Location is required"),
      region: Yup.string().required("Region is required"),
      division: Yup.string().required("Division is required"),
      status: Yup.string().required("Status is required"),
      phone: Yup.string(),
      email: Yup.string().email("Please enter a valid email"),
      pastor_name: Yup.string().required("Pastor name is required"),
      pastor_phone: Yup.string().required("Pastor phone is required"),
      pastor_email: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("location_name", values.name as string);
        formData.append("location_address", values.location as string);
        formData.append("church_phone", values.phone as string);
        formData.append("church_email", values.email as string);
        formData.append("region", values.region as string);
        formData.append("district", values.division as string);
        formData.append("church_status", values.status as string);
        formData.append("pastor_name", values.pastor_name as string);
        formData.append("pastor_phone", values.pastor_phone as string);
        formData.append("pastor_email", values.pastor_email as string);

        if (selectedLogo) {
          formData.append("church_logo", selectedLogo);
        }
        const res = await updateChurch(formData).unwrap();

        if (res) {
          refetch();
          toast(
            JSON.stringify({
              type: "success",
              title: `Church profile updated successfully`,
            })
          );
        } else {
          toast(
            JSON.stringify({
              type: "error",
              title:
                res?.data?.error_message ?? "Failed to update church profile",
            })
          );
        }
      } catch (err: any) {
        console.log(err);
        toast(
          JSON.stringify({
            type: "error",
            title:
              err?.data?.error_message ?? "Failed to update church profile",
          })
        );
      }
    },
  });

  useEffect(() => {
    if (churchData) {
      const matchingRegion = regions.find(
        (region: any) => region.id === churchData?.district?.region?.id
      );
      const matchingDivision = divisions.find(
        (division: any) => division.id === churchData?.district?.id
      );

      setSelectedRegion(matchingRegion || null);
      setSelectedDivision(matchingDivision || null);
      setValues({
        name: churchData?.location_name ?? "",
        location: churchData?.location_address ?? "",
        region: churchData?.district?.region?.id ?? "",
        division: churchData?.district?.id ?? "",
        phone: churchData?.church_phone ?? "",
        email: churchData?.church_email ?? "",
        status: churchData?.church_status ?? "",
        pastor_name: churchData?.pastor_name ?? "",
        pastor_phone: churchData?.pastor_phone ?? "",
        pastor_email: churchData?.pastor_email ?? "",
      });

      if (churchData?.church_logo) {
        setImageSrc(churchData.church_logo);
      }
    }
  }, [churchData, regions, divisions]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedLogo(file);
      const localUrl = URL.createObjectURL(file);
      setImageSrc(localUrl);
    }
  };

  useEffect(() => {
    if (selectedDivision && selectedDivision.region && !selectedRegion) {
      const matchingRegion = regions.find(
        (region: any) => region.id === selectedDivision.region.id
      );

      if (matchingRegion) {
        setSelectedRegion(matchingRegion);
        setFieldValue("region", matchingRegion.id);
      }
    }
  }, [selectedDivision, regions, setFieldValue, selectedRegion]);

  useEffect(() => {
    if (selectedRegion && selectedDivision) {
      const divisionBelongsToRegion =
        selectedDivision.region &&
        selectedDivision.region.id === selectedRegion.id;

      if (!divisionBelongsToRegion) {
        setSelectedDivision(null);
        setFieldValue("division", "");
      }
    }
  }, [selectedRegion, selectedDivision, setFieldValue]);

  useEffect(() => {
    if (!selectedRegion && selectedDivision) {
      const divisionHasRegion = selectedDivision.region;
      if (!divisionHasRegion) {
        setSelectedDivision(null);
        setFieldValue("division", "");
      }
    }
  }, [selectedRegion, selectedDivision, setFieldValue]);

  return (
    <div className="w-full flex flex-col gap-y-10 mobile:gap-y-5">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-2">
          <h1 className="font-semibold">Church Details</h1>
          <label htmlFor="name" className="font-normal text-xs">
            Church Location/Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal ${
             errors.name && touched.name ? "border border-[#fc8181]" : ""
           } `}
          />
          {errors.name && touched.name && typeof errors.name === "string" ? (
            <p className="font-normal text-xs text-[#fc8181]">{errors.name}</p>
          ) : (
            ""
          )}
          <label htmlFor="location" className="font-normal text-xs">
            Locational Address (including street name, town or city)
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={values.location}
            onBlur={handleBlur}
            onChange={handleChange}
            className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal ${
             errors.location && touched.location
               ? "border border-[#fc8181]"
               : ""
           }`}
          />
          {errors.location &&
          touched.location &&
          typeof errors.location === "string" ? (
            <p className="font-normal text-xs text-[#fc8181]">
              {errors.location}
            </p>
          ) : (
            ""
          )}

          <div className="mt-1">
            <label htmlFor="status" className="font-normal text-xs">
              Church Status
            </label>
            <SelectDropdown
              options={churchStatus}
              value={values.status || ""}
              onChange={(value: string) => setFieldValue("status", value)}
              className="border-[#EAE0E0] text-sm xl:text-sm placeholder:text-xs mt-0 h-12"
            />
            {touched.status &&
              errors.status &&
              typeof errors.status === "string" && (
                <p className="font-normal text-sm text-[#fc8181]">
                  {errors.status}
                </p>
              )}
          </div>

          <div className="w-full flex mobile:flex-col gap-3 mt-1">
            <div className="flex-1 relative flex flex-col gap-y-2">
              <label htmlFor="region" className="font-normal text-xs">
                Region
              </label>
              <SearchableCombobox
                options={regions}
                value={selectedRegion}
                onChange={(value) => {
                  setSelectedRegion(value);
                  setFieldValue("region", value?.id || "");
                }}
                placeholder="Select Region"
                error={!!errors.region && !!touched.region}
                className="border-[#EAE0E0] text-sm xl:text-sm placeholder:text-xs mt-0 h-12"
              />
              {touched.region &&
                errors.region &&
                typeof errors.region === "string" && (
                  <p className="font-normal text-sm text-[#fc8181]">
                    {errors.region}
                  </p>
                )}
            </div>

            <div className="flex-1 relative flex flex-col gap-y-2">
              <label htmlFor="division" className="font-normal text-xs">
                Division
                {selectedRegion && (
                  <span className="text-gray-500 ml-1">
                    (Filtered by {selectedRegion.name})
                  </span>
                )}
              </label>
              <SearchableCombobox
                options={filteredDivisions}
                value={selectedDivision}
                onChange={(value) => {
                  setSelectedDivision(value);
                  setFieldValue("division", value?.id || "");

                  // Auto-select region only if no region is currently selected
                  if (value && value.region && !selectedRegion) {
                    const matchingRegion = regions.find(
                      (region: any) => region.id === value.region.id
                    );
                    if (matchingRegion) {
                      setSelectedRegion(matchingRegion);
                      setFieldValue("region", matchingRegion.id);
                    }
                  }
                }}
                placeholder={
                  selectedRegion
                    ? `Select Division in ${selectedRegion.name}`
                    : "Select Division"
                }
                error={!!errors.division && !!touched.division}
                className="border-[#EAE0E0] text-sm xl:text-sm placeholder:text-xs mt-0 h-12"
              />
              {touched.division &&
                errors.division &&
                typeof errors.division === "string" && (
                  <p className="font-normal text-sm text-[#fc8181]">
                    {errors.division}
                  </p>
                )}
              {selectedRegion && filteredDivisions.length === 0 && (
                <p className="text-xs text-gray-500">
                  No divisions found for {selectedRegion.name}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="w-full flex mobile:flex-col gap-3">
            <div className="flex-1">
              <label htmlFor="phone" className="font-normal text-xs">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={values.phone}
                onBlur={handleBlur}
                onChange={handleChange}
                className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal ${
             errors.phone && touched.phone ? "border border-[#fc8181]" : ""
           }`}
              />
              {errors.phone &&
              touched.phone &&
              typeof errors.phone === "string" ? (
                <p className="font-normal text-xs text-[#fc8181]">
                  {errors.phone}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="email" className="font-normal text-xs">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal ${
             errors.email && touched.email ? "border border-[#fc8181]" : ""
           }`}
              />
              {errors.email &&
              touched.email &&
              typeof errors.email === "string" ? (
                <p className="font-normal text-xs text-[#fc8181]">
                  {errors.email}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <h1 className="font-semibold">Pastor's Details</h1>
          <div className="w-full flex mobile:flex-col gap-3">
            <div className="flex-1">
              <label htmlFor="pastor_name" className="font-normal text-xs">
                Pastor's Name
              </label>
              <input
                id="pastor_name"
                name="pastor_name"
                type="text"
                value={values.pastor_name}
                onBlur={handleBlur}
                onChange={handleChange}
                className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal ${
             errors.pastor_name && touched.pastor_name
               ? "border border-[#fc8181]"
               : ""
           }`}
              />
              {errors.pastor_name &&
              touched.pastor_name &&
              typeof errors.pastor_name === "string" ? (
                <p className="font-normal text-xs text-[#fc8181]">
                  {errors.pastor_name}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="pastor_phone" className="font-normal text-xs">
                Pastor's Phone
              </label>
              <input
                id="pastor_phone"
                name="pastor_phone"
                type="text"
                value={values.pastor_phone}
                onBlur={handleBlur}
                onChange={handleChange}
                className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal ${
             errors.pastor_phone && touched.pastor_phone
               ? "border border-[#fc8181]"
               : ""
           }`}
              />
              {errors.pastor_phone &&
              touched.pastor_phone &&
              typeof errors.pastor_phone === "string" ? (
                <p className="font-normal text-xs text-[#fc8181]">
                  {errors.pastor_phone}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <label htmlFor="pastor_email" className="font-normal text-xs">
            Pastor's Email
          </label>
          <input
            id="pastor_email"
            name="pastor_email"
            type="email"
            value={values.pastor_email}
            onBlur={handleBlur}
            onChange={handleChange}
            className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal ${
             errors.pastor_email && touched.pastor_email
               ? "border border-[#fc8181]"
               : ""
           }`}
          />
          {errors.pastor_email &&
          touched.pastor_email &&
          typeof errors.pastor_email === "string" ? (
            <p className="font-normal text-xs text-[#fc8181]">
              {errors.pastor_email}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <h1 className="font-semibold">Church Logo</h1>
          <div className="w-full py-5 border border-[#71839B] relative group overflow-hidden rounded-xl transition-all duration-200 ease-in-out">
            <div className="flex h-full justify-center items-center transition-all duration-200 ease-in-out">
              <div className="flex flex-col items-center">
                {imageSrc ? (
                  <img src={imageSrc} className="size-12" alt="Preview" />
                ) : (
                  <>
                    <FaFileUpload className="w-7 h-7 text-[#71839B] mb-3" />
                    <p className="font-light text-center text-[#71839B] mobile:text-sm">
                      Drag and drop files here, or click to browse
                    </p>
                  </>
                )}

                <label
                  htmlFor="file"
                  className="w-full flex justify-center items-center cursor-pointer"
                >
                  <div className="w-40 h-10 flex justify-center items-center border border-[#324054] rounded-md mt-5 mobile:text-sm">
                    Browse Files
                  </div>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
            {/* {false && (
              <div className="absolute z-20 inset-0 flex justify-center items-center bg-black bg-opacity-40 transition-all duration-200 ease-in-out">
                <ButtonLoader title="" />
              </div>
            )} */}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-end"
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-300 text-white rounded-md hover:from-primary-700 hover:to-purple-400 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-3" />
                Save Changes
              </>
            )}
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default ChurchForm;
