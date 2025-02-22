import React from 'react'
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-location';
import { IoIosArrowRoundBack } from 'react-icons/io';
import SelectDropdown from '../applications/support/components/select';
import { ghanaRegions } from '../district/add';

const AddRegion = () => {
  const navigate = useNavigate();

  const formik: FormikProps<any> = useFormik({
    initialValues: {
      districtName: "",
      region: "",
      districtHead: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object().shape({
      districtName: Yup.string().required("Division name is required"),
      region: Yup.string().required("Region is required"),
      districtHead: Yup.string().required("District head is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted: ", values);
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
    <main className="font-poppins p-5">
      <div className="flex items-center gap-x-4 mb-5">
        <button
          onClick={() => navigate({ to: ".." })}
          className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2.5 px-4 rounded-md transition-all duration-150 ease-in-out "
        >
          <IoIosArrowRoundBack className="size-5" aria-hidden="true" />{" "}
          <span>Back to List</span>
        </button>
        <h4 className="font-medium text-2xl text-[#252525] ">
          Add New Region
        </h4>
      </div>

      <section className="p-5 rounded-md bg-white ">
        <h4 className="font-semibold text-lg text-black mb-2">New Region</h4>
        <p className=" font-light text-lg text-[#71839B] ">
          Create a new region
        </p>

        <div className="w-full my-5">
          {input(
            "Region Name",
            "districtName",
            "text",
            false,
            "Enter district name"
          )}
        </div>

        <div className="w-full">
          <label
            htmlFor="region"
            className=" block text-lg font-medium text-black"
          >
            Region
          </label>
          <SelectDropdown
            options={ghanaRegions}
            onChange={(value) => formik.setFieldValue("region", value)}
          />
          {errors.region && typeof errors.region === "string" && (
            <p className="font-normal text-sm text-[#fc8181]">
              {errors.region}
            </p>
          )}
        </div>

        <div className="w-full my-5">
          {input(
            "Regional Head",
            "districtHead",
            "text",
            false,
            "Enter regional head name"
          )}
        </div>
        <div className="w-full my-5">
          {input("Email", "email", "email", false, "Enter email address")}
        </div>
        <div className="w-full my-5">
          {input("Phone", "phone", "tel", false, "Enter phone Number")}
        </div>

        <div className="flex justify-end items-center my-5">
          <button
            onClick={() => handleSubmit()}
            className="bg-primary text-white w-44 h-[50px] flex justify-center items-center  rounded-md text-lg"
          >
            Create Region
          </button>
        </div>
      </section>
    </main>
  );
};
export default AddRegion