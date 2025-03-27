import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { Navigate, useNavigate } from "react-location";
import { DASHBOARD } from "@/constants/page-path";
import ButtonLoader from "@/components/loaders/button";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  selectCurrentToken,
  setCredentials,
} from "@/redux/features/auth/authSlice";
import { useCreateChurchMutation } from "@/redux/features/churches/churchApiSlice";
import { useGetRegionsQuery } from "@/redux/features/regions/regionApiSlice";
import { useGetDivisionsQuery } from "@/redux/features/divisions/divisionApiSlice";
import toast from "react-hot-toast";
import { useGetUserProfileQuery } from "@/redux/features/user/userApiSlice";

// const regions = [
//   { id: 1, name: "Greater Accra" },
//   { id: 2, name: "Ashanti" },
//   { id: 3, name: "Western" },
//   { id: 4, name: "Eastern" },
//   { id: 5, name: "Northern" },
//   { id: 6, name: "Central" },
//   { id: 7, name: "Upper East" },
//   { id: 8, name: "Upper West" },
//   { id: 9, name: "Volta" },
//   { id: 10, name: "Oti" },
//   { id: 11, name: "Bono" },
//   { id: 12, name: "Bono East" },
//   { id: 13, name: "Ahafo" },
//   { id: 14, name: "Savannah" },
//   { id: 15, name: "Western North" },
// ];

const Onboarding = () => {
  const [query, setQuery] = useState<any>("");
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [selectedDivision, setSelectedDivision] = useState<any>(null);
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState("");

  const token = useAppSelector(selectCurrentToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "NIDF | Onboarding";
  }, []);

  const { data } = useGetRegionsQuery({});
  const { data: divisionsData } = useGetDivisionsQuery({});
  const regions = data?.region || [];
  const divisions = divisionsData?.divisions || [];

  const {
    data: userData,
    refetch,
    isLoading: fetchingUser,
  } = useGetUserProfileQuery({});
  // console.log(userData, "userData");

  const filteredRegions =
    query === ""
      ? regions
      : regions.filter((region: any) =>
          region.name.toLowerCase().includes(query.toLowerCase())
        );

  // fit it into component later
  const filteredDivisions =
    query === ""
      ? divisions
      : divisions.filter((division: any) =>
          division.name.toLowerCase().includes(query.toLowerCase())
        );

  const [createChurch, { isLoading }] = useCreateChurchMutation();

  const navigate = useNavigate();
  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      location: "",
      region: "",
      division: "",
      phone: "",
      email: "",
      pastor_name: "",
      pastor_phone: "",
      pastor_email: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      location: Yup.string().required("Location is required"),
      region: Yup.string().required("Region is required"),
      division: Yup.string().required("Division is required"),
      phone: Yup.string().required("Phone is required"),
      email: Yup.string().required("Email is required"),
      pastor_name: Yup.string().required("Pastor name is required"),
      pastor_phone: Yup.string().required("Pastor phone is required"),
      pastor_email: Yup.string().required("Pastor email is required"),
    }),
    onSubmit: async (values, actions) => {
      try {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("address", values.location);
        formData.append("church_phone", values.phone);
        formData.append("church_email", values.email);
        formData.append("region", selectedRegion?.id);
        formData.append("district", selectedDivision?.id);
        formData.append("pastor_name", values.pastor_name);
        formData.append("pastor_phone", values.pastor_phone);
        formData.append("pastor_email", values.pastor_email);
        formData.append("church_type", "LOCATION");

        // Append the file if it exists. Make sure selectedLogo is a File object.
        if (selectedLogo) {
          formData.append("church_logo", selectedLogo);
        }

        const res = await createChurch(formData).unwrap();

        // console.log(res, "res");

        if (res) {
          toast(
            JSON.stringify({
              type: "success",
              title: res?.message ?? `Church profile created successfully`,
            })
          );

          refetch();

          dispatch(setCredentials({ user: userData, token: token }));

          navigate({ to: DASHBOARD, replace: true });
        } else {
          toast(
            JSON.stringify({
              type: "error",
              title: "Onboarding failed",
            })
          );
        }
      } catch (err: any) {
       
      }
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // console.log(file);
      setSelectedLogo(file);

      const localUrl = URL.createObjectURL(file);
      setImageSrc(localUrl);
      // try {
      //   // await uploadImage(file);
      // } catch (err) {
      //   console.error("Upload failed:", err);
      // }
    }
  };

  if (!token)
    return (
      <Navigate
        to={DASHBOARD}
        // search={{ redirect: current === "/user-profile" ? "" : currentHref }}
        replace
      />
    );

  return (
    <div className="w-full flex flex-col gap-y-10 p-5 mobile:p-3 mobile:mt-5 mobile:gap-y-5">
      <div className="">
        <h1 className="font-bold text-3xl mobile:text-lg">
          Set Up Your Church Profile
        </h1>
        <p className="text-[#A3A3A3] font-normal mobile:text-sm">
          Complete the following form to create your church profile
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-2">
          <h1 className="font-semibold">Church Details</h1>
          <label htmlFor="name" className="font-normal text-xs">
            Church Name
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
          {errors.name && touched.name ? (
            <p className="font-normal text-xs text-[#fc8181]">{errors.name}</p>
          ) : (
            ""
          )}
          <label htmlFor="location" className="font-normal text-xs">
            Location
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
          {errors.location && touched.location ? (
            <p className="font-normal text-xs text-[#fc8181]">
              {errors.location}
            </p>
          ) : (
            ""
          )}
          <div className="w-full flex gap-x-3">
            <div className="flex-1 relative flex flex-col gap-y-2">
              <label htmlFor="region" className="font-normal text-xs">
                Region
              </label>
              <Combobox
                value={selectedRegion}
                onChange={(value) => {
                  setSelectedRegion(value);
                  setFieldValue("region", value.id);
                }}
                // onChange={(value) => setFieldValue("region", value)}
              >
                <div className="relative">
                  <Combobox.Input
                    id="region"
                    name="region"
                    value={selectedRegion?.name || ""}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedRegion(e.target.value as any);
                      handleChange;
                    }}
                    className={`w-full p-3 h-12 rounded-md border border-[#EAE0E0] focus:outline-0 focus:ring-2 focus:ring-primary-300 transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] text-base font-normal ${
                      errors.region && touched.region ? "border-[#fc8181]" : ""
                    }`}
                    placeholder="Select Region"
                    displayValue={(region: any) => region?.name || ""}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </Combobox.Button>
                </div>
                <Combobox.Options className="absolute w-60 z-10 mt-1 top-[4.5rem] bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-hidden overflow-y-scroll focus:outline-none sm:text-sm">
                  {filteredRegions.map((region: any) => (
                    <Combobox.Option
                      key={region.id}
                      value={region}
                      className={({ active }) =>
                        `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                          active ? "text-white bg-primary-600" : "text-gray-900"
                        }`
                      }
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {region.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-primary-600"
                              }`}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Combobox>
              {errors.region && touched.region ? (
                <p className="text-xs text-[#fc8181] mt-1">{errors.region}</p>
              ) : null}
            </div>
            <div className="flex-1 relative flex flex-col gap-y-2">
              <label htmlFor="division" className="font-normal text-xs">
                Division
              </label>
              <Combobox
                value={selectedDivision}
                onChange={(value) => {
                  setSelectedDivision(value);
                  setFieldValue("division", value.id);
                }}
              >
                <div className="relative">
                  <Combobox.Input
                    id="division"
                    name="division"
                    value={selectedDivision?.name || ""}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedDivision(e.target.value as any);
                      handleChange;
                    }}
                    className={`w-full p-3 h-12 rounded-md border border-[#EAE0E0] focus:outline-0 focus:ring-2 focus:ring-primary-300 transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] text-base font-normal ${
                      errors.division && touched.division
                        ? "border-[#fc8181]"
                        : ""
                    }`}
                    placeholder="Select Division"
                    displayValue={(division: any) => division?.name || ""}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  </Combobox.Button>
                </div>
                <Combobox.Options className="absolute w-60 z-10 mt-1 top-[4.5rem] bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-hidden overflow-y-scroll focus:outline-none sm:text-sm">
                  {filteredDivisions.map((division: any) => (
                    <Combobox.Option
                      key={division.id}
                      value={division}
                      className={({ active }) =>
                        `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                          active ? "text-white bg-primary-600" : "text-gray-900"
                        }`
                      }
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {division.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-primary-600"
                              }`}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Combobox>
              {errors.division && touched.division ? (
                <p className="text-xs text-[#fc8181] mt-1">{errors.division}</p>
              ) : null}
            </div>

            {/* <div className="flex-1">
              <label htmlFor="district" className="font-normal text-xs">
                Division
              </label>
              <input
                id="district"
                name="district"
                type="text"
                value={values.district}
                onBlur={handleBlur}
                onChange={handleChange}
                className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal ${
             errors.district && touched.district
               ? "border border-[#fc8181]"
               : ""
           }`}
              />
              {errors.district && touched.district ? (
                <p className="font-normal text-xs text-[#fc8181]">
                  {errors.district}
                </p>
              ) : (
                ""
              )}
            </div> */}
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <h1 className="font-semibold">Contact Information</h1>
          <div className="w-full flex gap-x-3">
            <div className="">
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
              {errors.phone && touched.phone ? (
                <p className="font-normal text-xs text-[#fc8181]">
                  {errors.phone}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="">
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
              {errors.email && touched.email ? (
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
          <h1 className="font-semibold">Administrator Details</h1>
          <div className="w-full flex gap-x-3">
            <div className="">
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
              {errors.pastor_name && touched.pastor_name ? (
                <p className="font-normal text-xs text-[#fc8181]">
                  {errors.pastor_name}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="">
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
              {errors.pastor_phone && touched.pastor_phone ? (
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
          {errors.pastor_email && touched.pastor_email ? (
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
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-[#17567E] w-40 h-12 flex justify-center items-center mt-2 rounded-md text-center text-white mx-auto ${
            isSubmitting ? "opacity-80" : ""
          } mobile:px-10 mobile:py-2 text-sm`}
        >
          {isLoading || fetchingUser ? (
            <ButtonLoader title="Confirming" />
          ) : (
            "Confirm"
          )}
        </button>
      </form>
    </div>
  );
};

export default Onboarding;
