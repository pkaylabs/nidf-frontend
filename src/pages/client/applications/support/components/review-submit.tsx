import React from "react";
import { FormikProps } from "formik";

interface FieldConfig {
  key: string;
  label: string;
  formatter?: (value: any) => string;
}

interface ChurchInfoProps {
  title: string;
  description: string;
  formik: FormikProps<any>;
}

const fields: FieldConfig[] = [
  { key: "churchName", label: "Church Name" },
  { key: "churchAddress", label: "Church Address" },
  { key: "pastorName", label: "Pastor Name" },
  { key: "pastorEmail", label: "Pastor Email" },
  { key: "pastorPhone", label: "Pastor Phone" },
  { key: "supportType", label: "Support Type" },
  { key: "typeOfChurchProject", label: "Type of Church Project" },
  { key: "purposeForAid", label: "Justification for Aid" },
  { key: "monthlyRepayment", label: "Monthly Repayment Amount" },
  {
    key: "isEmergency",
    label: "Emergency?",
    formatter: (v) => (v ? "Yes" : "No"),
  },
  { key: "amountRequested", label: "Amount Requested" },
  { key: "amountInWords", label: "Amount in Words" },
  { key: "estimatedProjectCost", label: "Estimated Project Cost" },
  { key: "projectLocation", label: "Project Location" },
  { key: "phase", label: "Phase" },
  { key: "expectedCompletionDate", label: "Expected Completion Date" },
  { key: "avgServiceAttendance", label: "Avg Service Attendance" },
  { key: "avgMonthlyIncome", label: "Avg Monthly Income" },
  { key: "avgMonthlyContributions", label: "Avg Monthly Contributions" },
  { key: "avgMonthlyExpenses", label: "Avg Monthly Expenses" },
  { key: "availableFundsForProject", label: "Available Funds for Project" },
  {
    key: "currentStatePic",
    label: "Current State Picture",
    formatter: (v) => v?.name ?? "N/A",
  },
  {
    key: "costEstimateFIle",
    label: "Cost Estimate File",
    formatter: (v) => v?.name ?? "N/A",
  },
  {
    key: "ownershipDoc",
    label: "Ownership Document",
    formatter: (v) => v?.name ?? "N/A",
  },
  { key: "invoices", label: "Invoices", formatter: (v) => v?.name ?? "N/A" },
];

const chunk = <T,>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const ReviewSubmit: React.FC<ChurchInfoProps> = ({
  formik,
  title,
  description,
}) => {
  const { values } = formik;

  return (
    <div className="font-poppins">
      <h4 className="font-semibold md:text-lg text-black">{title}</h4>
      <p className="font-light md:text-lg text-[#71839B]">{description}</p>

      <div className="mt-4">
        {chunk(fields, 2).map((row, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row  md:items-center gap-5 mt-5"
          >
            {row.map(({ key, label, formatter }) => (
              <div key={key} className="flex-1">
                <h4 className="text-[#71839B] text-sm md:text-base ">
                  {label}
                </h4>
                <p className="text-black md:text-xl">
                  {formatter ? formatter(values[key]) : values[key] ?? "N/A"}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSubmit;
