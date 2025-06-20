import { LOGIN } from "@/constants/page-path";
import { useFormik } from "formik";
import _ from "lodash";
import { Link, useNavigate, useSearch } from "react-location";
import * as Yup from "yup";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const ResetPassword = () => {
  const navigate = useNavigate();
  const search = useSearch<any>();

  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
    isSubmitting,
    setTouched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    }),

    onSubmit: async (values) => {},
  });

  const handleProceed = () => {
    if (search?.action) {
      return;
    } else {
      if (_.isEmpty(errors.email) && !_.isEmpty(values.email)) {
        navigate({
          to: ".",
          search: {
            action: "reset",
          },
        });
      } else {
        setTouched({
          email: true,
        });
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-10">
      <div>
        <h1 className="font-bold text-3xl mobile:text-xl">Reset Password</h1>
        <p className="text-[#A3A3A3] font-normal mobile:text-sm">
          Provide the information below to get your password back!
        </p>
      </div>

      <div className="">
        {search?.action ? (
          <>
            <div className="">
              <label htmlFor="password" className="font-normal text-xs">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal ${
             errors.password && touched.password
               ? "border border-[#fc8181]"
               : ""
           }`}
              />

              {errors.password &&
                touched.password &&
                typeof errors.password === "string" && (
                  <p className="font-normal text-sm text-[#fc8181]">
                    {errors.password}
                  </p>
                )}
            </div>
            <div className="mt-2">
              <label htmlFor="confirmPassword" className="font-normal text-xs">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal ${
             errors.confirmPassword && touched.confirmPassword
               ? "border border-[#fc8181]"
               : ""
           }`}
              />

              {errors.confirmPassword &&
                touched.confirmPassword &&
                typeof errors.confirmPassword === "string" && (
                  <p className="font-normal text-sm text-[#fc8181]">
                    {errors.confirmPassword}
                  </p>
                )}
            </div>
          </>
        ) : (
          <div className="">
            <label htmlFor="Email" className="font-normal text-xs">
              Email
            </label>
            <input
              id="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal ${
             errors.email && touched.email ? "border border-[#fc8181]" : ""
           }`}
            />

            {errors.email &&
              touched.email &&
              typeof errors.email === "string" && (
                <p className="font-normal text-sm text-[#fc8181]">
                  {errors.email}
                </p>
              )}
          </div>
        )}

        <div className="flex flex-col items-center">
          <button
            onClick={handleProceed}
            className="w-44 h-12 bg-primary text-white flex justify-center items-center rounded-md mt-5"
          >
            {search?.action ? "Reset" : "Continue"}
          </button>

          <Link className="mt-2 flex gap-1.5 items-center" to={LOGIN}>
            <MdOutlineKeyboardBackspace className="size-5" />
            <span>Back to login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
