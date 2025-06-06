import React from "react";
import { FormikProps } from "formik";

interface ChurchInfoProps {
  title: string;
  description: string;
  formik: FormikProps<any>;
}

const ReviewSubmit: React.FC<ChurchInfoProps> = ({
  formik,
  title,
  description,
}) => {
  return (
    <div className="font-poppins">
      <h4 className="font-semibold text-lg text-black">{title} </h4>
      <p className="font-light text-lg text-[#71839B]">{description}</p>

      <div className="mt-4 h-96"></div>
    </div>
  );
};

export default ReviewSubmit;
