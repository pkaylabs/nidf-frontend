import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useSearch } from "react-location";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import SelectDropdown from "@/pages/client/applications/support/components/select";
import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";
import { useCreateUserMutation } from "@/redux/features/user/userApiSlice";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/loaders/button";
import { useGetRegionsQuery } from "@/redux/features/regions/regionApiSlice";
import { useGetChurchesQuery } from "@/redux/features/churches/churchApiSlice";
import { Eye, EyeSlash } from "iconsax-react";

const AddUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false);
  const search = useSearch<any>();

  const [createUser, { isLoading }] = useCreateUserMutation();

  const { data } = useGetRegionsQuery({});
  const { data: churchesData } = useGetChurchesQuery({});

  console.log(churchesData, "church data");

  const regionOptions = data?.region?.map((app: any) => {
    return { label: app?.name, value: app?.id };
  });

  const churchOptions = churchesData?.map((app: any) => {
    return { label: app?.name, value: app?.id };
  });

  const formik: FormikProps<any> = useFormik({
    initialValues: {
      firstName: search?.name?.split(" ")[0] ?? "",
      lastName: search?.name?.split(" ")[1] ?? "",
      emailAddress: search?.email ?? "",
      password: "",
      phoneNumber: search?.phone ?? "",
      region: "",
      role: "",
      church: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      password: Yup.string().required("Password is required"),
      emailAddress: Yup.string()
        .email("Invalid Email Address")
        .required("Email Address is required"),
      phoneNumber: Yup.string().required("Phone Number is required"),
      region: Yup.string().required("Region is required"),
      role: Yup.string().required("Role is required"),
      church: Yup.string(),
    }),
    onSubmit: async (values) => {
      console.log("Form Submitted: ", values);
      try {
        const res = await createUser({
          email: values?.emailAddress,
          password: values?.password,
          name: `${values?.firstName} ${values?.lastName}`,
          phone: values?.phoneNumber,
          user_type: values?.role,
        }).unwrap();

        if (res) {
          toast(
            JSON.stringify({
              type: "success",
              title: res?.message ?? `User created successfully`,
            })
          );
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

  const { handleSubmit, handleChange, values, errors, handleBlur, touched } =
    formik;

  const showChurch = values.role === "church_user";

  const input = (
    label: string,
    name: string,
    type: string = "text",
    disabled: boolean = false,
    placeholder: string = ""
  ) => {
    return (
      <div className="font-poppins ">
        <label
          htmlFor={name}
          className=" block md:text-lg font-medium text-black"
        >
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
          className={`w-full px-4 py-3 mt-2 md:text-lg border border-[#71839B] placeholder:font-light disabled:bg-[#EFEFEF] rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent`}
        />
        {errors[name] && touched[name] && typeof errors[name] === "string" && (
          <p className="font-normal text-sm text-[#fc8181]">{errors[name]}</p>
        )}
      </div>
    );
  };

  return (
    <main className="font-poppins p-3 md:p-5">
      <div className="flex items-center gap-x-4 mb-5">
        <button
          onClick={() => navigate({ to: ".." })}
          className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2.5 px-4 rounded-md transition-all"
        >
          <IoIosArrowRoundBack className="size-5" />
          <span className="hidden md:block">Back to List</span>
        </button>
        <h4 className="font-medium text-lg md:text-2xl text-[#252525]">
          Add New User
        </h4>
      </div>

      <section className="bg-white rounded-md p-3 md:p-8">
        <h4 className="font-semibold md:text-lg text-black mb-4">
          Add New User
        </h4>
        <p className=" font-light md:text-lg text-[#71839B] ">
          Create a new user and assign them the appropriate role.
        </p>

        <div className="mt-8">
          <div className="w-full flex flex-col md:flex-row items-center gap-4 my-5">
            <div className="w-full flex-1 ">
              {input(
                "First Name",
                "firstName",
                "text",
                false,
                "Enter First Name"
              )}
            </div>
            <div className="w-full flex-1 ">
              {input("Last Name", "lastName", "text", false, "Enter Last Name")}
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center gap-4 my-5">
            <div className="w-full flex-1 ">
              {input(
                "Email Address",
                "emailAddress",
                "email",
                false,
                "Enter Email Address"
              )}
            </div>

            {/* <div className="w-full flex-1 ">
              {input(
                "Password",
                "password",
                "password",
                false,
                "Enter Password"
              )}
            </div> */}

            <div className="w-full flex-1">
              <label htmlFor="password" className="font-normal text-xs">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-3 h-12 pr-12 rounded-md border border-[#71839B] focus:outline-0 focus:outline-primary-300 
                    transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
                    text-base font-normal ${
                      errors.password && touched.password
                        ? "border border-[#fc8181]"
                        : ""
                    }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer rounded-r-md transition-colors duration-200"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeSlash size="20" color="#71839B" />
                  ) : (
                    <Eye size="20" color="#71839B" />
                  )}
                </button>
              </div>
              {errors.password &&
                touched.password &&
                typeof errors.password === "string" && (
                  <p className="font-normal text-xs text-[#fc8181]">
                    {errors.password}
                  </p>
                )}
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center gap-4 my-5">
            <div className="w-full flex-1 ">
              {input(
                "Phone Number",
                "phoneNumber",
                "tel",
                false,
                "Enter Phone Number"
              )}
            </div>
            <div className="w-full flex-1">
              <label
                htmlFor="region"
                className="block md:text-lg font-medium text-black"
              >
                Region
              </label>
              <SelectDropdown
                options={regionOptions}
                value={values.region}
                onChange={(value) => {
                  formik.setFieldValue("region", value);
                }}
              />
              {errors.region && typeof errors.region === "string" && (
                <p className="font-normal text-sm text-[#fc8181]">
                  {errors.region}
                </p>
              )}
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="role"
              className=" block md:text-lg font-medium text-black"
            >
              Role
            </label>
            <SelectDropdown
              options={[
                {
                  label: "Church User",
                  value: "CHURCH_USER",
                },
                {
                  label: "Division User",
                  value: "DIVISION_USER",
                },
                {
                  label: "Admin User",
                  value: "ADMIN",
                },
                {
                  label: "Finance User",
                  value: "FINANCE_OFFICER",
                },
              ]}
              onChange={(value) => formik.setFieldValue("role", value)}
              value={values.role}
            />
            {errors.role && typeof errors.role === "string" && (
              <p className="font-normal text-sm text-[#fc8181]">
                {errors.role}
              </p>
            )}
          </div>

          {showChurch && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} // Start off-screen and hidden
              animate={{ opacity: 1, y: 0 }} // Fade in and slide up
              exit={{ opacity: 0, y: 20 }} // Fade out and slide down
              transition={{ duration: 0.4, ease: "easeInOut" }} // Sleek timing
            >
              <div className="my-5 w-full">
                <label
                  htmlFor="church"
                  className="block md:text-lg font-medium text-black"
                >
                  Church
                </label>
                <SelectDropdown
                  options={churchOptions}
                  onChange={(value) => formik.setFieldValue("church", value)}
                  value={values.church}
                />
                {errors.church && typeof errors.church === "string" && (
                  <p className="font-normal text-sm text-[#fc8181]">
                    {errors.church}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          <div className="mt-7 flex items-center gap-3">
            {/* toggle */}
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-primary-600"
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
              />
            </Switch>
            <p className="font-medium text-lg ">
              {enabled ? "Deactivate" : "Activate"}
            </p>
          </div>

          <div className="flex justify-end items-center">
            <button
              onClick={() => handleSubmit()}
              disabled={isLoading}
              className="w-full md:w-44 bg-primary-700 text-white py-3  rounded-md mt-5 disabled:bg-opacity-80"
            >
              {isLoading ? (
                <ButtonLoader title="Creating..." />
              ) : search.name ? (
                "Save Changes"
              ) : (
                "Add User"
              )}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AddUser;
