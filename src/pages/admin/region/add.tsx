import React, { useEffect } from "react";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useSearch } from "react-location";
import { IoIosArrowRoundBack } from "react-icons/io";
import SelectDropdown from "../applications/support/components/select";

import toast from "react-hot-toast";
import {
  useCreateRegionMutation,
  useUpdateRegionMutation,
} from "@/redux/features/regions/regionApiSlice";
import ButtonLoader from "@/components/loaders/button";
import { ghanaRegions } from "@/constants";

const AddRegion = () => {
  const navigate = useNavigate();

  const search = useSearch();

  const [createRegion, { isLoading }] = useCreateRegionMutation();
  const [updateRegion, { isLoading: updating }] = useUpdateRegionMutation();

  const formik: FormikProps<any> = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      overseer_name: "",
      overseer_phone: "",
      overseer_email: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Region name is required"),

      email: Yup.string()
        .email("Invalid email format"),

      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      location: Yup.string().required("Location is required"),
      overseer_name: Yup.string().required("Overseer's name is required"),
      overseer_email: Yup.string()
        .email("Invalid email format")
        .required("Overseer's Email is required"),
      overseer_phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Overseer's Phone number is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form Submitted: ", values);
      let finalData;

      try {
        if (search?.id) {
          finalData = { region: search?.id, ...values };
          const res = await updateRegion(finalData).unwrap();
          if (res) {
            toast(
              JSON.stringify({
                type: "success",
                title: res?.message ?? `Region updated successfully`,
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
        } else {
          finalData = values;
          const res = await createRegion(finalData).unwrap();
          if (res) {
            toast(
              JSON.stringify({
                type: "success",
                title: res?.message ?? `Region created successfully`,
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

  const input = (
    label: string,
    name: string,
    type: string = "text",
    disabled: boolean = false,
    placeholder: string = ""
  ) => {
    return (
      <div className="font-poppins ">
        <label htmlFor={name} className=" block md:text-lg font-medium text-black">
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

  useEffect(() => {
    if (search?.id) {
      formik.setValues({
        name: search?.name,
        email: search?.email,
        phone: search?.phone,
        location: search?.location,
        overseer_name: search?.overseer_name,
        overseer_phone: search?.overseer_phone,
        overseer_email: search?.overseer_email,
      });
    }
  }, [search]);

  return (
    <main className="font-poppins p-3 md:p-5">
      <div className="flex items-center gap-x-4 mb-5">
        <button
          onClick={() => navigate({ to: ".." })}
          className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2.5 px-4 rounded-md transition-all duration-150 ease-in-out "
        >
          <IoIosArrowRoundBack className="size-5" aria-hidden="true" />{" "}
          <span className="hidden md:block">Back to List</span>
        </button>
        <h4 className="font-medium text-lg md:text-2xl text-[#252525] ">Add New Region</h4>
      </div>

      <section className="p-3 md:p-5 rounded-md bg-white ">
        <h4 className="font-semibold md:text-lg text-black mb-2">New Region</h4>
        <p className=" font-light md:text-lg text-[#71839B] ">
          Create a new region
        </p>

        <div className="w-full my-5">
          {input("Region name", "name", "text", false, "Enter region")}
        </div>

        <div className="w-full my-5">
          {input("Email", "email", "email", false, "Enter email address")}
        </div>
        <div className="w-full my-5">
          {input("Phone", "phone", "tel", false, "Enter phone Number")}
        </div>
        <div className="w-full my-5">
          {input("Location", "location", "text", false, "Enter location")}
        </div>
        <div className="w-full my-5">
          {input(
            "Overseer's Name",
            "overseer_name",
            "text",
            false,
            "Enter district name"
          )}
        </div>
        <div className="w-full my-5">
          {input(
            "Overseer's Email",
            "overseer_email",
            "email",
            false,
            "Enter email address"
          )}
        </div>
        <div className="w-full my-5">
          {input(
            "Overseer's Phone",
            "overseer_phone",
            "tel",
            false,
            "Enter phone Number"
          )}
        </div>

        <div className="flex justify-end items-center my-5">
          <button
            disabled={isLoading || updating}
            onClick={() => handleSubmit()}
            className="bg-primary text-white w-full md:w-44 h-[50px]
             flex justify-center items-center
               rounded-md text-lg disabled:bg-opacity-80"
          >
            {isLoading || updating ? (
              <ButtonLoader
                title={search?.id ? "Updating..." : "Creating..."}
              />
            ) : search?.id ? (
              "Update Region"
            ) : (
              "Create Region"
            )}
          </button>
        </div>
      </section>
    </main>
  );
};
export default AddRegion;
