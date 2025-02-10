import React, { useState } from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-location";
import { motion } from "framer-motion";
import ChurchInfo from "./components/church-info";
import SupportInfo from "./components/support-info";
import SupportingDocs from "./components/supporting-docs";
import ReviewSubmit from "./components/review-submit";
import { useFormik } from "formik";
import * as Yup from "yup";

const steps = [
  { id: 0, title: "Church Information", content: ChurchInfo },
  { id: 1, title: "Support Information", content: SupportInfo },
  { id: 2, title: "Supporting Documents", content: SupportingDocs },
  { id: 3, title: "Review & Submit", content: ReviewSubmit },
];

const CreateApplication = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      churchName: "DLCF Legon",
      churchAddress: "DLCF Auditorium - Lybia Quarters - Legon",
      pastorName: "",
      pastorEmail: "",
      pastorPhone: "",
      supportType: "",
      purposeForAid: "",
      progressDescription: "",
      amountRequested: 0,
      expectedCompletionDate: "",
      currentStatePic: "",
      costEstimateFIle: "",
      ownershipDoc: "",
      invoices: "",
    },
    validationSchema: Yup.object().shape({
      churchName: Yup.string().required("Church name is required"),
      churchAddress: Yup.string().required("Church address is required"),
      pastorName: Yup.string().required("Pastor name is required"),
      pastorPhone: Yup.string().required("Pastor phone is required"),
      pastorEmail: Yup.string().required("Pastor email is required"),
      supportType: Yup.string().required("Support type is required"),
      purposeForAid: Yup.string().required("Support type is required"),
      progressDescription: Yup.string().required(
        "Progress description is required"
      ),
      amountRequested: Yup.number().required("Amount requested is required"),
      expectedCompletionDate: Yup.string().required(
        "Expected completion date is required"
      ),
      currentStatePic: Yup.string().required(
        "Current state picture is required"
      ),
      costEstimateFIle: Yup.string().required("Cost estimate file is required"),
      ownershipDoc: Yup.string().required("Ownership document is required"),
      invoices: Yup.string().required("Invoices are required"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted: ", values);
      
    },
  });

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      // formik.handleSubmit();
      navigate({ to: ".." });
    }
  };

  const prevStep = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const CurrentComponent = steps[activeStep].content;
  const title = steps[activeStep].title;
  const description =
    activeStep < steps.length - 1
      ? "Please fill in all required information"
      : "Review your application and submit";

  return (
    <main className="font-poppins p-5">
      <div className="flex items-center gap-x-4 mb-5">
        <button
          onClick={() => navigate({ to: ".." })}
          className="font-light flex items-center space-x-2 border-[0.5px] border-[#545454] bg-white text-black py-2.5 px-4 rounded-md transition-all"
        >
          <IoIosArrowRoundBack className="size-5" />
          <span>Back to Application</span>
        </button>
        <h4 className="font-medium text-2xl text-[#252525]">
          Apply For Support
        </h4>
      </div>
      {/* <p className="font-light text-xl text-[#545454] my-5">
        Submit your application for financial support. Ensure all required
        fields are completed.
      </p> */}

      <section className="bg-white rounded-md p-8">
        <div className="flex justify-between items-center gap-x-4 max-w-lg mx-auto">
          {steps.map((step, index) => (
            <button
              key={step.id}
              className={`font-medium w-14 h-14 rounded-full flex justify-center items-center border text-2xl
                ${
                  activeStep === index
                    ? "bg-white border-primary text-primary"
                    : index < activeStep
                    ? "bg-primary text-white"
                    : "bg-white text-gray-500"
                }`}
              onClick={() => setActiveStep(index)}
            >
              {step.id + 1}
            </button>
          ))}
        </div>

        <div className="border-[0.5px] border-[#71839B] rounded-md p-5 mt-6 ">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentComponent
              formik={formik}
              title={title}
              description={description}
            />
          </motion.div>

          <div className="flex justify-between mt-6 select-none">
            <button
              onClick={prevStep}
              disabled={activeStep === 0}
              className="w-56 h-16 flex justify-center items-center gap-x-2 rounded-md border border-gray-400 text-lg text-gray-500 disabled:opacity-50"
            >
              <IoIosArrowRoundBack className="size-8" />
              <span>Previous</span>
            </button>
            <button
              onClick={nextStep}
              className="w-56 h-16 flex justify-center items-center gap-x-2 rounded-md bg-primary text-white text-lg "
            >
              <span>{activeStep === steps.length - 1 ? "Submit" : "Next"}</span>
              <IoIosArrowRoundForward className="size-8" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreateApplication;
