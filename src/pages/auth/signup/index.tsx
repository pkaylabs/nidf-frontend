import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-location";
import { LOGIN } from "@/constants/page-path";


const SignUp = () => {
  const navigate = useNavigate();
  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },

    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Name is required"),
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Email is required"),
      phone: Yup.string()
        .matches(
          /^0(24|54|55|59|20|50|26|56|27|57|28|58|23)\d{7}$/,
          "Please enter a valid phone number"
        )
        .required("Phone number is required"),
      password: Yup.string()
        .min(8, "Password must be 8 characters or more")
        .required("Password is required"),
    }),

    onSubmit: (values, actions) => {
      actions.resetForm();

      navigate({ to: "/otp-verification", replace: true });
    },
  });

  return (
    <div className="w-full flex flex-col gap-y-10">
      <div>
        <h1 className="font-bold text-3xl">Create an Account</h1>
        <p className="text-[#A3A3A3] font-normal">
          Create an NIDF Portal account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-2">
        <label htmlFor="name" className="font-normal text-xs">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal ${
             errors.name && touched.name ? "border border-[#fc8181]" : ""
           }`}
        />
        {errors.name && touched.name ? (
          <p className="font-normal text-xs text-[#fc8181]">{errors.name}</p>
        ) : (
          ""
        )}
        <label htmlFor="Email" className="font-normal text-xs">
          Email
        </label>
        <input
          id="Email"
          name="email"
          type="email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
            transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
            text-base font-normal ${
              errors.email && touched.email ? "border border-[#fc8181]" : ""
            }`}
        />
        {errors.email && touched.email ? (
          <p className="font-normal text-xs text-[#fc8181]">{errors.email}</p>
        ) : (
          ""
        )}
        <label htmlFor="phone" className="font-normal text-xs">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={values.phone}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
            transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
            text-base font-normal ${
              errors.phone && touched.phone ? "border border-[#fc8181]" : ""
            }`}
        />
        {errors.phone && touched.phone ? (
          <p className="font-normal text-xs text-[#fc8181]">{errors.phone}</p>
        ) : (
          ""
        )}
        <label htmlFor="password" className="font-normal text-xs">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
            transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
            text-base font-normal ${
              errors.password && touched.password
                ? "border border-[#fc8181]"
                : ""
            }`}
        />
        {errors.password && touched.password ? (
          <p className="font-normal text-xs text-[#fc8181]">
            {errors.password}
          </p>
        ) : (
          ""
        )}
        <p className="mx-auto font-normal text-base">
          Already have an account?
          <Link to={LOGIN} className="text-[#1024A3] cursor-pointer">
            Login
          </Link>
        </p>
        <button
          disabled={isSubmitting}
          type="submit"
          className={`bg-[#17567E] rounded-md text-white px-20 py-3 mx-auto mt-3 ${
            isSubmitting ? "opacity-30" : ""
          }`}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
