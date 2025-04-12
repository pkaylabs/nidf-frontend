import React from "react";

import { FormikProps } from "formik";

interface ChurchInfoProps {
  title: string;
  description: string;
  formik: FormikProps<any>;
}

const ChurchInfo: React.FC<ChurchInfoProps> = ({
  formik,
  title,
  description,
}) => {
  const { values, handleChange, handleBlur, errors, touched } = formik;

  const input = (
    label: string,
    name: string,
    type: string = "text",
    disabled: boolean = false,
    placeholder: string = ""
  ) => {
    return (
      <div className="font-poppins mt-5">
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
    <div className="font-poppins">
      <h4 className="font-semibold text-lg text-black">{title} </h4>
      <p className="font-light text-lg text-[#71839B]">{description}</p>

      <div className="mt-8">
        {input("Church Name", "churchName", "text", true)}
        {input("Church Address", "churchAddress", "text", true)}
        {input("Pastor's Name", "pastorName", "text", true)}
        {input("Pastor's Email", "pastorEmail", "email", true)}
        {input("Pastor's Phone", "pastorPhone", "tel", true)}
      </div>
    </div>
  );
};

export default ChurchInfo;
