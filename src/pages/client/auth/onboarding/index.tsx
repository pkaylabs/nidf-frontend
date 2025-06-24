import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { Link, useNavigate } from "react-location";
import { DASHBOARD, LOGIN } from "@/constants/page-path";
import ButtonLoader from "@/components/loaders/button";
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
import { churchStatus } from "@/constants";
import SelectDropdown from "../../applications/support/components/select";
import SearchableCombobox from "@/components/core/searchable-dropdown";
import { useRegisterMutation } from "@/redux/features/auth/authApiSlice";

const Onboarding = () => {
  const [query, setQuery] = useState<any>("");
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [selectedDivision, setSelectedDivision] = useState<any>(null);
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState("");

  const dispatch = useAppDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { data } = useGetRegionsQuery({});
  const { data: divisionsData, refetch: refetchDivision } =
    useGetDivisionsQuery({});
  const regions = data?.region || [];
  const divisions = divisionsData?.divisions || [];

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
      status: "",
      pastor_name: "",
      pastor_phone: "",
      pastor_email: "",
      login_email: "",
      login_phone: "",
      login_name: "",
      password: "",
      manager_name: "",
      manager_phone: "",
      manager_email: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string(),
      location: Yup.string().required("Location is required"),
      region: Yup.string().required("Region is required"),
      division: Yup.string().required("Division is required"),
      status: Yup.string().required("Status is required"),
      phone: Yup.string(),
      email: Yup.string().email("Please enter a valid email"),
      pastor_name: Yup.string().required("Pastor name is required"),
      pastor_phone: Yup.string().required("Pastor phone is required"),
      pastor_email: Yup.string(),
      manager_name: Yup.string(),
      manager_phone: Yup.string(),
      manager_email: Yup.string(),
      login_email: Yup.string().email("Please enter a valid email"),
      login_phone: Yup.string()
        .matches(
          /^0(24|54|55|59|20|50|26|56|27|57|28|58|23)\d{7}$/,
          "Please enter a valid phone number"
        )
        .required("Phone number is required"),
      password: Yup.string()
        .min(8, "Password must be 8 characters or more")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      console.log(values, "values");
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
        formData.append("manager_email", values.manager_email as string);
        formData.append("manager_phone", values.manager_phone as string);
        formData.append("manager_name", values.manager_name as string);
        formData.append("name", values.manager_name as string);
        formData.append("email", values.login_email as string);
        formData.append("phone", values.login_phone as string);
        formData.append("password", values.password as string);
        formData.append("user_type", "CHURCH_USER" as string);

        if (selectedLogo) {
          formData.append("church_logo", selectedLogo);
        }

        const res = await register(formData).unwrap();

        console.log(res, "responseeeeee");

        if (res?.data?.token) {
          toast(
            JSON.stringify({
              type: "success",
              title: res?.message ?? `Profile created successfully`,
            })
          );

          dispatch(setCredentials({ ...res }));

          navigate({ to: DASHBOARD, replace: true });
        } else {
          toast(
            JSON.stringify({
              type: "error",
              title: res?.data?.error_message ?? "Failed to signup",
            })
          );
        }
      } catch (err: any) {
        console.log(err);
        toast(
          JSON.stringify({
            type: "error",
            title: err?.data?.error_message ?? "Signup failed",
          })
        );
      }
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedLogo(file);
      const localUrl = URL.createObjectURL(file);
      setImageSrc(localUrl);
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-10 mobile:mt-5 mobile:gap-y-5">
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
          {errors.name && touched.name ? (
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
          {errors.location && touched.location ? (
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

          <div className="w-full flex gap-x-3 mt-1">
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
                error={!!errors.region && touched.region}
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
              </label>
              <SearchableCombobox
                options={divisions}
                value={selectedDivision}
                onChange={(value) => {
                  setSelectedDivision(value);
                  setFieldValue("division", value?.id || "");
                }}
                placeholder="Select Division"
                error={!!errors.division && touched.division}
                className="border-[#EAE0E0] text-sm xl:text-sm placeholder:text-xs mt-0 h-12"
              />
              {touched.division &&
                errors.division &&
                typeof errors.division === "string" && (
                  <p className="font-normal text-sm text-[#fc8181]">
                    {errors.division}
                  </p>
                )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
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
          <h1 className="font-semibold">Pastor's Details</h1>
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

        <div className="flex flex-col gap-y-2">
          <h1 className="font-semibold">Account Manager's Information</h1>
          <div className="">
            <label htmlFor="manager_name" className="font-normal text-xs">
              Full Name
            </label>
            <input
              id="manager_name"
              name="manager_name"
              type="text"
              value={values.manager_name}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal ${
             errors.manager_name && touched.manager_name
               ? "border border-[#fc8181]"
               : ""
           }`}
            />
            {errors.manager_name && touched.manager_name ? (
              <p className="font-normal text-xs text-[#fc8181]">
                {errors.manager_name}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="">
            <label htmlFor="manager_email" className="font-normal text-xs">
              Email
            </label>
            <input
              id="manager_email"
              name="manager_email"
              type="email"
              value={values.manager_email}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
            transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
            text-base font-normal ${
              errors.manager_email && touched.manager_email
                ? "border border-[#fc8181]"
                : ""
            }`}
            />
            {errors.manager_email && touched.manager_email ? (
              <p className="font-normal text-xs text-[#fc8181]">
                {errors.manager_email}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="">
            <label htmlFor="manager_phone" className="font-normal text-xs">
              Phone Number
            </label>
            <input
              id="manager_phone"
              name="manager_phone"
              type="text"
              value={values.manager_phone}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
            transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
            text-base font-normal ${
              errors.manager_phone && touched.manager_phone
                ? "border border-[#fc8181]"
                : ""
            }`}
            />
            {errors.manager_phone && touched.manager_phone ? (
              <p className="font-normal text-xs text-[#fc8181]">
                {errors.manager_phone}
              </p>
            ) : (
              ""
            )}
          </div>

          <h1 className="font-semibold">Login Information</h1>

          <div className="">
            <label htmlFor="login_email" className="font-normal text-xs">
              Email
            </label>
            <input
              id="login_email"
              name="login_email"
              type="email"
              value={values.login_email}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
            transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
            text-base font-normal ${
              errors.login_email && touched.login_email
                ? "border border-[#fc8181]"
                : ""
            }`}
            />
            {errors.login_email && touched.login_email ? (
              <p className="font-normal text-xs text-[#fc8181]">
                {errors.login_email}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="">
            <label htmlFor="login_phone" className="font-normal text-xs">
              Phone Number
            </label>
            <input
              id="login_phone"
              name="login_phone"
              type="text"
              value={values.login_phone}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
            transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
            text-base font-normal ${
              errors.login_phone && touched.login_phone
                ? "border border-[#fc8181]"
                : ""
            }`}
            />
            {errors.login_phone && touched.login_phone ? (
              <p className="font-normal text-xs text-[#fc8181]">
                {errors.login_phone}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="">
            <label htmlFor="password" className="font-normal text-xs">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
            transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
            text-base font-normal ${
              errors.password && touched.password
                ? "border border-[#fc8181]"
                : ""
            }`}
            />
            {errors.password && touched.password ? (
              <p className="font-normal text-xs text-[#fc8181]">
                {errors.password}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>

        <p className="mx-auto font-normal text-base mobile:text-sm">
          Already have an account?
          <Link
            to={LOGIN}
            className="text-[#1024A3] cursor-pointer mobile:text-sm ml-2"
          >
            Login
          </Link>
        </p>

        <button
          type="submit"
          // disabled={i}
          className={`bg-[#17567E] w-44 h-12 flex justify-center items-center mt-2 rounded-md text-center text-white mx-auto ${
            isSubmitting ? "opacity-80" : ""
          } mobile:px-10 mobile:py-2 text-sm`}
        >
          {isSubmitting || isLoading ? (
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
