import React, { useState } from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate, useSearch } from "react-location";
import { motion } from "framer-motion";
import ChurchInfo from "./components/church-info";
import SupportInfo from "./components/support-info";
import SupportingDocs from "./components/supporting-docs";
import ReviewSubmit from "./components/review-submit";
import { useFormik } from "formik";
import * as Yup from "yup";
import { supportApplicationSteps } from "@/constants";
import {
  useCreateApplicationMutation,
  useFinalCreateApplicationMutation,
} from "@/redux/features/applications/applicationsApiSlice";
import toast from "react-hot-toast";
import _ from "lodash";
import { ADMIN_APPLICATIONS } from "@/constants/page-path";
import ButtonLoader from "@/components/loaders/button";

const CreateApplication = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [applicationId, setApplicationId] = useState<any>(null);
  const navigate = useNavigate();
  const search = useSearch<any>();

  const formik = useFormik({
    initialValues: {
      church: "",
      churchName: "",
      churchAddress: "",
      pastorName: "",
      pastorEmail: "",
      pastorPhone: "",
      //
      supportType: "",
      typeOfChurchProject: "",
      purposeForAid: "",
      isEmergency: false,
      progressDescription: "",
      amountRequested: "",
      amountInWords: "",
      estimatedProjectCost: "",
      projectLocation: "",
      phase: "",
      expectedCompletionDate: "",
      //
      avgServiceAttendance: "",
      avgMonthlyIncome: "",
      avgMonthlyContributions: "",
      avgMonthlyExpenses: "",
      availableFundsForProject: "",
      //
      currentStatePic: null,
      costEstimateFIle: null,
      ownershipDoc: null,
      invoices: null,
    },
    validationSchema: Yup.object().shape({
      church: Yup.string().required("Church is required"),
      churchName: Yup.string().required("Church name is required"),
      churchAddress: Yup.string().required("Church address is required"),
      pastorName: Yup.string().required("Pastor name is required"),
      pastorEmail: Yup.string()
        .email("Invalid email address")
        .required("Pastor email is required"),
      pastorPhone: Yup.string().required("Pastor phone is required"),
      supportType: Yup.string().required("Support type is required"),
      typeOfChurchProject: Yup.string().required(
        "Type of church project is required"
      ),
      purposeForAid: Yup.string().required("Purpose for aid is required"),
      isEmergency: Yup.boolean(),
      progressDescription: Yup.string().required(
        "Progress description is required"
      ),
      amountRequested: Yup.string()
        .matches(/^\d+$/, "Amount requested must be a valid number")
        .required("Amount requested is required"),
      amountInWords: Yup.string().required("Amount in words is required"),
      estimatedProjectCost: Yup.string()
        .matches(/^\d+$/, "Estimated project cost must be a valid number")
        .required("Estimated project cost is required"),
      projectLocation: Yup.string().required("Project location is required"),
      phase: Yup.string().required("Phase is required"),
      expectedCompletionDate: Yup.string().required(
        "Expected completion date is required"
      ),
      avgServiceAttendance: Yup.string()
        .matches(/^\d+$/, "Average service attendance must be a valid number")
        .required("Average service attendance is required"),
      avgMonthlyIncome: Yup.string()
        .matches(/^\d+$/, "Average monthly income must be a valid number")
        .required("Average monthly income is required"),
      avgMonthlyContributions: Yup.string()
        .matches(
          /^\d+$/,
          "Average monthly contributions must be a valid number"
        )
        .required("Average monthly contributions are required"),
      avgMonthlyExpenses: Yup.string()
        .matches(/^\d+$/, "Average monthly expenses must be a valid number")
        .required("Average monthly expenses are required"),
      availableFundsForProject: Yup.string()
        .matches(/^\d+$/, "Available funds for project must be a valid number")
        .required("Available funds for project are required"),
      currentStatePic: Yup.mixed().required(
        "Current state picture is required"
      ),
      costEstimateFIle: Yup.mixed().required("Cost estimate file is required"),
      ownershipDoc: Yup.mixed().required("Ownership document is required"),
      invoices: Yup.mixed().required("Invoices are required"),
    }),
    onSubmit: () => {},
  });

  const [createApplication, { isLoading }] = useCreateApplicationMutation();
  const [createFinalApplication, { isLoading: isFinalLoading }] =
    useFinalCreateApplicationMutation();

  const handleProceed = async () => {
    if (activeStep === 0) {
      // Validate fields for step 0
      if (
        _.isEmpty(formik.errors.churchName) &&
        !_.isEmpty(formik.values.churchName) &&
        _.isEmpty(formik.errors.churchAddress) &&
        !_.isEmpty(formik.values.churchAddress) &&
        _.isEmpty(formik.errors.pastorName) &&
        !_.isEmpty(formik.values.pastorName) &&
        _.isEmpty(formik.errors.pastorEmail) &&
        !_.isEmpty(formik.values.pastorEmail) &&
        _.isEmpty(formik.errors.pastorPhone) &&
        !_.isEmpty(formik.values.pastorPhone)
      ) {
        try {
          const formData = new FormData();
          if (search?.application_id) {
            formData.append("application_id", search?.application_id);
          }
          formData.append("churchName", formik.values.churchName);
          formData.append("churchAddress", formik.values.churchAddress);
          formData.append("pastorName", formik.values.pastorName);
          formData.append("pastorEmail", formik.values.pastorEmail);
          formData.append("pastorPhone", formik.values.pastorPhone);
          formData.append("church", formik.values.church);

          const res = await createApplication(formData).unwrap();
          console.log("res ", res);

          if (res?.application) {
            setApplicationId(res?.application?.application_id);
            if (search?.application_id) {
              navigate({
                to: ".",
                search: {
                  ...search,
                  application_id: res?.application?.application_id,
                },
              });
            } else {
              navigate({
                to: `.`,
                search: {
                  application_id: res?.application?.application_id,
                },
              });
            }

            setActiveStep((prev) => prev + 1);
          } else {
            toast(
              JSON.stringify({
                type: "error",
                title: "An error occurred",
              })
            );
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
      } else {
        formik.setTouched({
          church: true,
          churchName: true,
          churchAddress: true,
          pastorName: true,
          pastorEmail: true,
          pastorPhone: true,
        });
      }
    }

    if (activeStep === 1) {
      if (
        _.isEmpty(formik.errors.supportType) &&
        !_.isEmpty(formik.values.supportType) &&
        _.isEmpty(formik.errors.typeOfChurchProject) &&
        !_.isEmpty(formik.values.typeOfChurchProject) &&
        _.isEmpty(formik.errors.purposeForAid) &&
        !_.isEmpty(formik.values.purposeForAid) &&
        _.isEmpty(formik.errors.progressDescription) &&
        !_.isEmpty(formik.values.progressDescription) &&
        _.isEmpty(formik.errors.amountRequested) &&
        !_.isEmpty(formik.values.amountRequested) &&
        _.isEmpty(formik.errors.amountInWords) &&
        !_.isEmpty(formik.values.amountInWords) &&
        _.isEmpty(formik.errors.estimatedProjectCost) &&
        !_.isEmpty(formik.values.estimatedProjectCost) &&
        _.isEmpty(formik.errors.projectLocation) &&
        !_.isEmpty(formik.values.projectLocation) &&
        _.isEmpty(formik.errors.phase) &&
        !_.isEmpty(formik.values.phase) &&
        _.isEmpty(formik.errors.expectedCompletionDate) &&
        !_.isEmpty(formik.values.expectedCompletionDate)
      ) {
        try {
          const formData = new FormData();
          formData.append("support_type", formik.values.supportType);
          formData.append(
            "type_of_church_project",
            formik.values.typeOfChurchProject
          );
          formData.append("purpose", formik.values.purposeForAid);
          formData.append("is_emergency", formik.values.isEmergency.toString());
          formData.append("description", formik.values.progressDescription);
          formData.append("amount", formik.values.amountRequested);
          formData.append("amount_in_words", formik.values.amountInWords);
          formData.append(
            "estimated_project_cost",
            formik.values.estimatedProjectCost
          );
          formData.append("project_location", formik.values.projectLocation);
          formData.append("phase", formik.values.phase);
          formData.append(
            "expected_completion_date",
            formik.values.expectedCompletionDate
          );
          formData.append("church", formik.values.church);
          formData.append(
            "application_id",
            search?.application_id ?? applicationId
          );

          const res = await createApplication(formData).unwrap();
          console.log("res 2", res);

          if (res?.application) {
            setApplicationId(res?.application?.application_id);

            if (search?.application_id) {
              navigate({
                to: ".",
                search: {
                  ...search,
                  application_id: res?.application?.application_id,
                },
              });
            } else {
              navigate({
                to: `.`,
                search: {
                  application_id: res?.application?.application_id,
                },
              });
            }

            setActiveStep((prev) => prev + 1);
          } else {
            toast(
              JSON.stringify({
                type: "error",
                title: "An error occurred",
              })
            );
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
      } else {
        formik.setTouched({
          supportType: true,
          typeOfChurchProject: true,
          purposeForAid: true,
          progressDescription: true,
          amountRequested: true,
          amountInWords: true,
          estimatedProjectCost: true,
          projectLocation: true,
          phase: true,
          expectedCompletionDate: true,
        });
      }
    }

    if (activeStep === 2) {
      if (
        _.isEmpty(formik.errors.avgServiceAttendance) &&
        !_.isEmpty(formik.values.avgServiceAttendance) &&
        _.isEmpty(formik.errors.avgMonthlyIncome) &&
        !_.isEmpty(formik.values.avgMonthlyIncome) &&
        _.isEmpty(formik.errors.avgMonthlyContributions) &&
        !_.isEmpty(formik.values.avgMonthlyContributions) &&
        _.isEmpty(formik.errors.avgMonthlyExpenses) &&
        !_.isEmpty(formik.values.avgMonthlyExpenses) &&
        _.isEmpty(formik.errors.availableFundsForProject) &&
        !_.isEmpty(formik.values.availableFundsForProject)
      ) {
        try {
          const formData = new FormData();
          formData.append(
            "avg_service_attendance",
            formik.values.avgServiceAttendance
          );
          formData.append("avg_monthly_income", formik.values.avgMonthlyIncome);
          formData.append(
            "avg_monthly_contributions",
            formik.values.avgMonthlyContributions
          );
          formData.append(
            "avg_monthly_expenses",
            formik.values.avgMonthlyExpenses
          );
          formData.append(
            "available_funds_for_project",
            formik.values.availableFundsForProject
          );

          formData.append("church", formik.values.church);
          formData.append(
            "application_id",
            search?.application_id ?? applicationId
          );

          const res = await createApplication(formData).unwrap();
          console.log("res 3", res);

          if (res?.application) {
            if (search?.application_id) {
              navigate({
                to: ".",
                search: {
                  ...search,
                  application_id: res?.application?.application_id,
                },
              });
            } else {
              navigate({
                to: `.`,
                search: {
                  application_id: res?.application?.application_id,
                },
              });
            }
            setActiveStep((prev) => prev + 1);
          } else {
            toast(
              JSON.stringify({
                type: "error",
                title: "An error occurred",
              })
            );
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
      } else {
        formik.setTouched({
          avgServiceAttendance: true,
          avgMonthlyIncome: true,
          avgMonthlyContributions: true,
          avgMonthlyExpenses: true,
          availableFundsForProject: true,
        });
      }
    }

    if (activeStep === 3) {
      if (
        _.isEmpty(formik.errors.currentStatePic) &&
        formik.values.currentStatePic !== null &&
        _.isEmpty(formik.errors.costEstimateFIle) &&
        formik.values.costEstimateFIle !== null &&
        _.isEmpty(formik.errors.ownershipDoc) &&
        formik.values.ownershipDoc !== null &&
        _.isEmpty(formik.errors.invoices) &&
        formik.values.invoices !== null
      ) {
        try {
          const formData = new FormData();
          if (formik.values.currentStatePic) {
            formData.append("current_stage", formik.values.currentStatePic);
          }

          if (formik.values.costEstimateFIle) {
            formData.append("cost_estimate", formik.values.costEstimateFIle);
          }
          if (formik.values.ownershipDoc) {
            formData.append("land_ownership", formik.values.ownershipDoc);
          }
          if (formik.values.invoices) {
            formData.append("invoices", formik.values.invoices);
          }

          formData.append("church", formik.values.church);
          formData.append(
            "application_id",
            search?.application_id ?? applicationId
          );

          const filteredEntries: any = [];
          formData.forEach((value: any, key) => {
            if (
              typeof value === "string" &&
              !value.includes("/assets/applications/")
            ) {
              filteredEntries.push([key, value]);
            } else if (!(typeof value === "string")) {
              // If it's not a string (e.g., File), just push it (or handle based on your needs)
              filteredEntries.push([key, value]);
            }
          });

          // Convert the filtered entries back into FormData
          const filteredFormData = new FormData();
          filteredEntries.forEach(([key, value]: [string, any]) => {
            filteredFormData.append(key, value);
          });

          // Logging the filtered form data
          filteredFormData.forEach((value, key) => {
            console.log("key:", key);
            console.log("value:", value);
          });

          const res = await createApplication(filteredFormData).unwrap();

          console.log("res 4", res);

          if (res?.application) {
            if (search?.application_id) {
              navigate({
                to: ".",
                search: {
                  ...search,
                  application_id: res?.application?.application_id,
                },
              });
            } else {
              navigate({
                to: `.`,
                search: {
                  application_id: res?.application?.application_id,
                },
              });
            }
            setActiveStep((prev) => prev + 1);
          } else {
            toast(
              JSON.stringify({
                type: "error",
                title: "An error occurred",
              })
            );
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
      } else {
        formik.setTouched({
          currentStatePic: true,
          costEstimateFIle: true,
          ownershipDoc: true,
          invoices: true,
        });
      }
    }

    if (activeStep === supportApplicationSteps.length - 1) {
      try {
        const res = await createFinalApplication({
          application: search?.application_id ?? applicationId,
        }).unwrap();
        console.log("res 5", res);

        if (res?.message) {
          toast(
            JSON.stringify({
              type: "success",
              title: res?.message ?? `Application submitted successfully`,
            })
          );
          navigate({ to: ADMIN_APPLICATIONS });
        } else {
          toast(
            JSON.stringify({
              type: "error",
              title: "An error occurred",
            })
          );
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
    }
  };

  const prevStep = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const CurrentComponent = supportApplicationSteps[activeStep].content;
  const title = supportApplicationSteps[activeStep].title;
  const description =
    activeStep < supportApplicationSteps.length - 1
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

      <section className="bg-white rounded-md p-8">
        <div className="flex justify-between items-center gap-x-4 max-w-lg mx-auto">
          {supportApplicationSteps.map((step, index) => (
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
              onClick={handleProceed}
              disabled={isLoading || isFinalLoading}
              className="w-56 h-16 flex justify-center items-center gap-x-2 rounded-md bg-primary text-white text-lg disabled:opacity-80 "
            >
              {isLoading || isFinalLoading ? (
                <ButtonLoader title="Processing" />
              ) : (
                <>
                  {" "}
                  <span>
                    {activeStep === supportApplicationSteps.length - 1
                      ? "Submit"
                      : "Next"}
                  </span>
                  <IoIosArrowRoundForward className="size-8" />
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreateApplication;
