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
import PdfReactPdf from "@/components/pdf";
import doc from "@/assets/pdfs/quiz.pdf";
import { IoCloseOutline } from "react-icons/io5";

interface AdditionalInfoModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function PDFModal({ open, setOpen }: AdditionalInfoModalProps) {
  return (
    <Dialog
      open={open}
      onClose={setOpen}
      className="font-poppins relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity
         data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200
          data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform  rounded-md flex flex-col 
              bg-white px-4 pb-4 pt-2 text-left shadow-xl transition-all
             data-[closed]:translate-y-4 data-[closed]:opacity-0
              data-[enter]:duration-300 data-[leave]:duration-200
             data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-4xl h-[90vh] sm:p-2 sm:px-6
             sm:pb-16  data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="static flex justify-between items-center top-0 left-0 right-0 py-2">
              <DialogTitle
                as="h3"
                className="text-lg  font-semibold text-gray-900"
              >
                PDF Document
              </DialogTitle>
              <button
                onClick={() => setOpen(false)}
                className="cursor-pointer bg-gray-100 p-1 rounded-md hover:bg-gray-200
               focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-150 ease-in-out"
              >
                <IoCloseOutline className="text-gray-500 size-6" />
              </button>
            </div>

            <div className="h-full shadow-md w-full  border border-gray-300 rounded-md overflow-hidden">
              <PdfReactPdf src={doc} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
