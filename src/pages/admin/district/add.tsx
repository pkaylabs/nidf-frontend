import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useSearch } from "react-location";
import toast from "react-hot-toast";
import {
  useCreateDivisionMutation,
  useUpdateDivisionMutation,
} from "@/redux/features/divisions/divisionApiSlice";
import { useGetRegionsQuery } from "@/redux/features/regions/regionApiSlice";
import SelectDropdown from "@/pages/client/applications/support/components/select";
import ButtonLoader from "@/components/loaders/button";

const AddDistrict = () => {
  const navigate = useNavigate();
  const search = useSearch();

  const [createDivision, { isLoading }] = useCreateDivisionMutation();
  const [updateDivision, { isLoading: updating }] = useUpdateDivisionMutation();

  const {
    data,
    isLoading: fetchingRegions,
    refetch,
    isError,
  } = useGetRegionsQuery({});

  // console.log(data);

  const regionOptions = data?.region?.map((app: any) => {
    return { label: app?.name, value: app?.id };
  });

  const formik: FormikProps<any> = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      overseer_name: "",
      overseer_phone: "",
      overseer_email: "",
      region: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Division name is required"),
      region: Yup.string().required("Region is required"),

      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

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
          finalData = { division: search?.id, ...values };
          const res = await updateDivision(finalData).unwrap();
          if (res) {
            toast(
              JSON.stringify({
                type: "success",
                title: res?.message ?? `Division updated successfully`,
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
          const res = await createDivision(finalData).unwrap();
          if (res) {
            toast(
              JSON.stringify({
                type: "success",
                title: res?.message ?? `Division created successfully`,
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
        region: search?.region,
      });
    }
  }, [search]);

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
          Add New Division
        </h4>
      </div>

      <section className="p-5 rounded-md bg-white ">
        <h4 className="font-semibold text-lg text-black mb-2">New Division</h4>
        <p className=" font-light text-lg text-[#71839B] ">
          Create a new division
        </p>

        <div className="w-full my-5">
          {input("Division Name", "name", "text", false, "Enter division name")}
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

        <div className="flex-1">
          <label
            htmlFor="region"
            className="block text-lg font-medium text-black"
          >
            Select Region
          </label>
          <SelectDropdown
            options={regionOptions}
            value={values.region}
            onChange={(value) => {
              formik.setFieldValue("region", value);
            }}
          />
          {touched.region &&
            errors.region &&
            typeof errors.region === "string" && (
              <p className="font-normal text-sm text-[#fc8181]">
                {errors.region}
              </p>
            )}
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
            className="bg-primary text-white w-44 h-[50px] 
            flex justify-center items-center rounded-md text-lg disabled:bg-opacity-80"
          >
            {isLoading || updating ? (
              <ButtonLoader
                title={search?.id ? "Updating..." : "Creating..."}
              />
            ) : search?.id ? (
              "Update Division"
            ) : (
              "Create Division"
            )}
          </button>
        </div>
      </section>
    </main>
  );
};

export default AddDistrict;
