import React, { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useSearch } from "react-location";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";

import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";
import {
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
} from "@/redux/features/notifications/notificationApiSlice";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/loaders/button";
import moment from "moment";
import SelectDropdown from "@/pages/client/applications/support/components/select";

const AddNotification = () => {
  const navigate = useNavigate();
  const search = useSearch<any>();
  const {
    id,
    title,
    message,
    target,
    scheduled,
    schedule_start_date,
    schedule_start_end,
    schedule_frequency,
    attachment,
  } = search;

  const [createNotification, { isLoading }] = useCreateNotificationMutation();
  const [updateNotification, { isLoading: updating }] =
    useUpdateNotificationMutation();

  const formik: FormikProps<any> = useFormik({
    initialValues: {
      title: "",
      message: "",
      recipients: "",
      fileAttachment: null as File | null | string,
      startDate: "",
      endDate: "",
      frequency: "",
      enabled: false,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      message: Yup.string().required("Message is required"),
      recipients: Yup.string().required("Recipients are required"),

      startDate: Yup.string().when(["enabled"], (values, schema) => {
        const [enabled] = values as [boolean];
        return enabled ? schema.required("Start date is required") : schema;
      }),
      endDate: Yup.string().when(["enabled"], (values, schema) => {
        const [enabled] = values as [boolean];
        return enabled ? schema.required("End date is required") : schema;
      }),
      frequency: Yup.string().when(["enabled"], (values, schema) => {
        const [enabled] = values as [boolean];
        return enabled ? schema.required("Frequency is required") : schema;
      }),
      fileAttachment: Yup.mixed().required("Payment proof is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form Submitted: ", values);

      try {
        const formData = new FormData();
        formData.append("title", values.title as string);
        formData.append("message", values.message as string);
        formData.append("is_scheduled", values.enabled.toString());
        formData.append("target", values.recipients as string);
        formData.append("schedule_start_date", values.startDate as string);
        formData.append("schedule_start_end", values.endDate as string);
        formData.append("schedule_frequency", values.frequency as string);
        if (values.fileAttachment) {
          formData.append("attachment", values.fileAttachment as Blob);
        }
        if (id) {
          formData.append("notification", id);
        }

        if (typeof(values.fileAttachment) === "string") {
          formData.delete("attachment");
        }

        if (id) {
          const res = await updateNotification(formData).unwrap();
          console.log(res);
          if (res) {
            toast(
              JSON.stringify({
                type: "success",
                title: res?.message ?? "Notification successfully updated",
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
        } else {
          const res = await createNotification(formData).unwrap();
          console.log(res);

          if (res) {
            toast(
              JSON.stringify({
                type: "success",
                title: res?.message ?? "Notification successfully created",
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
            title: error?.data?.message ?? "An error occurred",
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
    const isFile = type === "file";

    return (
      <div className="font-poppins">
        <label htmlFor={name} className="block text-lg font-medium text-black">
          {label}
        </label>
        <input
          disabled={disabled}
          placeholder={placeholder}
          type={type}
          name={name}
          id={name}
          value={isFile ? undefined : values[name] || ""}
          onChange={(e) => {
            if (isFile) {
              formik.setFieldValue(name, e.currentTarget.files?.[0] ?? null);
            } else {
              handleChange(e);
            }
          }}
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
    if (id) {
      formik.setValues({
        title,
        message,
        recipients: target,
        fileAttachment: attachment,
        startDate: scheduled
          ? moment(schedule_start_date).format("yyyy-MM-DD")
          : "",
        endDate: scheduled
          ? moment(schedule_start_end).format("yyyy-MM-DD")
          : "",
        frequency: scheduled ? schedule_frequency : "",
        enabled: scheduled,
      });
    }
  }, [id]);

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
        <p className="font-light text-lg text-[#71839B]">
          Create, schedule, and manage notifications for applicants
        </p>

        <div className="mt-8">
          {input("Title", "title", "text", false, "Enter notification title")}

          <div className="mt-5 w-full">
            <label
              htmlFor="message"
              className="block text-lg font-medium text-black"
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
            <div className="flex-1">
              <label
                htmlFor="recipients"
                className="block text-lg font-medium text-black"
              >
                Recipients
              </label>
              <SelectDropdown
                options={[
                  { label: "All Users", value: "ALL" },
                  { label: "All Churches", value: "CHURCH" },
                  { label: "Regional Overseers", value: "REGION" },
                  { label: "District Overseers", value: "DISTRICT" },
                ]}
                onChange={(value) => formik.setFieldValue("recipients", value)}
                value={values.recipients}
              />
              {errors.recipients && typeof errors.recipients === "string" && (
                <p className="font-normal text-sm text-[#fc8181]">
                  {errors.recipients}
                </p>
              )}
            </div>
            <div className="flex-1">
              {input("File Attachment", "fileAttachment", "file", false)}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            {/* Toggle for scheduling */}
            <Switch
              checked={values.enabled}
              onChange={(value: boolean) =>
                formik.setFieldValue("enabled", value)
              }
              className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-primary-600"
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
              />
            </Switch>
            <p className="font-medium text-lg">Schedule Notification</p>
          </div>

          {values.enabled && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
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
                    { label: "Daily", value: "DAILY" },
                    { label: "Weekly", value: "WEEKLY" },
                    { label: "Forthnightly", value: "FORTNIGHTLY" },
                    { label: "Monthly", value: "MONTHLY" },
                  ]}
                  onChange={(value) => formik.setFieldValue("frequency", value)}
                  value={values.frequency}
                />
                {errors.frequency && typeof errors.frequency === "string" && (
                  <p className="font-normal text-sm text-[#fc8181]">
                    {errors.frequency}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          <div className="flex justify-end">
            <button
              onClick={() => handleSubmit()}
              disabled={isLoading}
              className="w-56 h-[50px] flex justify-center items-center gap-x-2 rounded-md border border-primary-50 bg-primary-50 hover:bg-primary-100 transition-all duration ease-in-out text-lg text-white disabled:bg-opacity-80 disabled:cursor-not-allowed"
            >
              {isLoading || updating ? (
                <ButtonLoader title={id ? "Updating..." : "Creating..."} />
              ) : id ? (
                "Update Notification"
              ) : (
                "Create Notification"
              )}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AddNotification;
