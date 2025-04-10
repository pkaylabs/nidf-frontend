import React from "react";

import { FormikProps } from "formik";
import { useLocation } from "react-location";
import { useGetChurchesQuery } from "@/redux/features/churches/churchApiSlice";
import SelectDropdown from "@/pages/client/applications/support/components/select";

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
  const currentPath = useLocation().current.pathname;

  const { data } = useGetChurchesQuery({});

  console.log("Churches data", data);

  const churchOptions = data?.map((app: any) => {
    return { label: app?.name, value: app?.id };
  });

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
        {currentPath.includes("admin") && (
          <div className="">
            <label
              htmlFor="church"
              className="block text-lg font-medium text-black"
            >
              Select Church
            </label>
            <SelectDropdown
              options={churchOptions}
              value={values.church || ""}
              onChange={(value) => {
                const selectedApp = data?.find((app: any) => app.id === value);
                formik.setValues({
                  ...formik.values,
                  church: value,
                  churchName: selectedApp?.name ?? "",
                  churchAddress: selectedApp?.address ?? "",
                  pastorName: selectedApp?.pastor_name ?? "",
                  pastorEmail: selectedApp?.pastor_email ?? "",
                  pastorPhone: selectedApp?.pastor_phone ?? "",
                });         
              }}
            />
            {touched.church &&
              errors.church &&
              typeof errors.church === "string" && (
                <p className="font-normal text-sm text-[#fc8181]">
                  {errors.church}
                </p>
              )}
          </div>
        )}

        {input("Church Name", "churchName", "text", true)}
        {input("Church Address", "churchAddress", "text", true)}
        {input(
          "Pastor's Name",
          "pastorName",
          "text",
          false,
          "Enter Pastor's Name"
        )}
        {input(
          "Pastor's Email",
          "pastorEmail",
          "email",
          false,
          "Enter Pastor's Email"
        )}
        {input(
          "Pastor's Phone",
          "pastorPhone",
          "tel",
          false,
          "+233 XX XXX XXXX"
        )}
      </div>
    </div>
  );
};

export default ChurchInfo;
