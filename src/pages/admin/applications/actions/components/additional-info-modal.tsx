"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as Yup from "yup";

interface AdditionalInfoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AdditionalInfoModal({
  open,
  setOpen,
}: AdditionalInfoModalProps) {
  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: Yup.object().shape({
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted: ", values);
    },
  });

  const { values, handleChange, handleBlur, errors } = formik;

  return (
    <Dialog
      open={open}
      onClose={setOpen}
      className="font-poppins  relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900"
                >
                  Request Additional Info
                </DialogTitle>
                <div className="mt-5 w-full">
                  <label
                    htmlFor="supportType"
                    className=" block text-lg font-medium text-black"
                  >
                    Description
                  </label>
                  <textarea
                    placeholder="Write a brief description of the current projects’ status..."
                    name="progressDescription"
                    id="progressDescription"
                    value={values.description || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full h-32 px-4 py-3 mt-2 text-lg border border-[#71839B] placeholder:font-light rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent`}
                  />
                  {errors.description &&
                    typeof errors.description === "string" && (
                      <p className="font-normal text-sm text-[#fc8181]">
                        {errors.description}
                      </p>
                    )}
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                data-autofocus
                onClick={() => {
                  formik.handleSubmit();
                  setOpen(false);
                }}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-primary px-12 py-4 text-sm font-semibold text-white shadow-sm  ring-primary hover:bg-primary-100 transition-all duration-150 ease-in-out sm:mt-0 sm:w-auto"
              >
                Submit
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
