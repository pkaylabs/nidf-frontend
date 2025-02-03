import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-location";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import SelectDropdown from "../applications/support/components/select";
import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";

const AddNotification = () => {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false);

  const formik: FormikProps<any> = useFormik({
    initialValues: {
      title: "",
      message: "",
      recipients: "",
      fileAttachment: "",
      startDate: "",
      endDate: "",
      frequency: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      message: Yup.string().required("Message is required"),
      recipients: Yup.string().required("Recipients are required"),
      fileAttachment: Yup.string().required("File attachment is required"),
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
          className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2.5 px-4 rounded-md transition-all"
        >
          <IoIosArrowRoundBack className="size-5" />
          <span>Back to List</span>
        </button>
        <h4 className="font-medium text-2xl text-[#252525]">
          Add New Notifications
        </h4>
      </div>

      <section className="bg-white rounded-md p-8">
        <h4 className="font-semibold text-lg text-black mb-4">
          Add New Notification
        </h4>
        <p className=" font-light text-lg text-[#71839B] ">
          Create, schedule, and manage notifications for applicants
        </p>

        <div className="mt-8">
          {input("Title", "title", "text", false, "Enter notification title")}

          <div className="mt-5 w-full">
            <label
              htmlFor="message"
              className=" block text-lg font-medium text-black"
            >
              Message
            </label>
            <textarea
              placeholder="Enter notification message..."
              name="message"
              id="message"
              value={values.message || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full h-32 px-4 py-3 mt-2 text-lg border border-[#71839B] placeholder:font-light rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent`}
            />
            {errors.message && typeof errors.message === "string" && (
              <p className="font-normal text-sm text-[#fc8181]">
                {errors.message}
              </p>
            )}
          </div>

          <div className="w-full flex items-center gap-4 mt-5">
            <div className="flex-1 ">
              <label
                htmlFor="recipients"
                className=" block text-lg font-medium text-black"
              >
                Recipients
              </label>
              <SelectDropdown
                options={[
                  {
                    label: "All Users",
                    value: "all",
                  },
                  {
                    label: "All Churches",
                    value: "churches",
                  },
                  {
                    label: "Regional Overseers",
                    value: "region",
                  },
                  {
                    label: "District Overseers",
                    value: "district",
                  },
                ]}
                onChange={(value) => formik.setFieldValue("recipients", value)}
              />
              {errors.recipients && typeof errors.recipients === "string" && (
                <p className="font-normal text-sm text-[#fc8181]">
                  {errors.recipients}
                </p>
              )}
            </div>
            <div className="flex-1 ">
              {input("File Attachment", "fileAttachment", "file", false)}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
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
            <p className="font-medium text-lg ">Schedule Notification</p>
          </div>

          {enabled && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} // Start off-screen and hidden
              animate={{ opacity: 1, y: 0 }} // Fade in and slide up
              exit={{ opacity: 0, y: 20 }} // Fade out and slide down
              transition={{ duration: 0.4, ease: "easeInOut" }} // Sleek timing
            >
              <div className="w-full flex items-center gap-4 mt-5">
                <div className="flex-1">
                  {input("Start Date", "startDate", "date", false, "Enter")}
                </div>
                <div className="flex-1">
                  {input("End Date", "endDate", "date", false, "Enter")}
                </div>
              </div>

              <div className="my-5 w-full">
                <label
                  htmlFor="frequency"
                  className="block text-lg font-medium text-black"
                >
                  Frequency
                </label>
                <SelectDropdown
                  options={[
                    { label: "Daily", value: "daily" },
                    { label: "Weekly", value: "weekly" },
                    { label: "Forthnightly", value: "forthnightly" },
                    { label: "Monthly", value: "monthly" },
                  ]}
                  onChange={(value) => formik.setFieldValue("frequency", value)}
                />
                {errors.frequency && typeof errors.frequency === "string" && (
                  <p className="font-normal text-sm text-[#fc8181]">
                    {errors.frequency}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          <div className="flex justify-end ">
            <button className="w-56 h-[50px] flex justify-center items-center gap-x-2 rounded-md border border-primary-50 bg-primary-50 hover:bg-primary-100 transition-all duration ease-in-out text-lg text-white">
              Create Notification
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AddNotification;
