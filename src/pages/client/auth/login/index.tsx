import ButtonLoader from "@/components/loaders/button";
import {
  ADMIN_DASHBOARD,
  DASHBOARD,
  ONBOARDING,
  OTP_VERIFICATION,
  RESET,
  SIGNUP,
} from "@/constants/page-path";
import { useAppDispatch } from "@/redux";
import { useLoginMutation } from "@/redux/features/auth/authApiSlice";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { LocationGenerics } from "@/router/location";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearch } from "react-location";
import * as Yup from "yup";
import logo from "@/assets/images/logo1.png";
import { Eye, EyeSlash } from "iconsax-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "NIDF | Login";
  }, []);

  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

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
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string(),
      // .email("Please enter a valid email")
      // .required("Email or phone is required"),
      password: Yup.string()
        .min(8, "Password must be 8 characters or more")
        .required("Password is required"),
    }),

    onSubmit: async (values, actions) => {
      try {
        const res = await login(values).unwrap();

        if (
          res?.token &&
          res?.user?.user_type === "CHURCH_USER" &&
          !res?.user?.is_staff &&
          !res?.user?.is_superuser
        ) {
          if (!res?.user?.phone_verified) {
            dispatch(setCredentials({ user: null, token: res?.token }));
            return navigate({
              to: OTP_VERIFICATION,
              search: {
                phone: res?.user?.phone,
              },
            });
          } else {
            dispatch(setCredentials({ ...res }));
            toast(
              JSON.stringify({
                type: "success",
                title: `Welcome back ${res?.user?.name?.split(" ")[0]}`,
              })
            );
            navigate({
              replace: true,
              to: DASHBOARD,
              // search.redirect === ""
              //   ? DASHBOARD
              //   : search.redirect ?? DASHBOARD,
            });
          }
        } else {
          if (
            res?.token &&
            (res?.user?.user_type === "ADMIN" ||
              res?.user?.user_type === "FINANCE_OFFICER")
          ) {
            dispatch(setCredentials({ ...res }));
            toast(
              JSON.stringify({
                type: "success",
                title: `Welcome back ${res?.user?.name?.split(" ")[0]}`,
              })
            );

            navigate({
              replace: true,
              to: ADMIN_DASHBOARD,
              // search.redirect === ""
              //   ? ADMIN_DASHBOARD
              //   : search.redirect ?? ADMIN_DASHBOARD,
            });
          } else {
            toast(
              JSON.stringify({
                type: "error",
                title: "Unauthorized Access",
              })
            );
          }
        }
      } catch (err: any) {
        console.log(err);
        toast(
          JSON.stringify({
            type: "error",
            title: err?.data?.error_message ?? "Error logging in",
          })
        );
      }
    },
  });

  return (
    <div className="w-full flex flex-col gap-y-10">
      <div>
        <h1 className="font-bold text-3xl mobile:text-xl">Welcome Back</h1>
        <p className="text-[#A3A3A3] font-normal mobile:text-sm">
          Log in to access your NIDF Portal account
        </p>
      </div>
      <div className="flex justify-center md:hidden">
        <img src={logo} alt="logo" className="w-20 h-20  " />
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-2">
        <label htmlFor="Email" className="font-normal text-xs">
          Email or Phone
        </label>
        <input
          id="Email"
          name="email"
          type="text"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
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

        <div className="">
          <label htmlFor="password" className="font-normal text-xs">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 h-12 pr-12 rounded-md border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
        transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
        text-base font-normal ${
          errors.password && touched.password ? "border border-[#fc8181]" : ""
        }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer rounded-r-md transition-colors duration-200"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeSlash size="20" color="#71839B" />
              ) : (
                <Eye size="20" color="#71839B" />
              )}
            </button>
          </div>
          {errors.password && touched.password && (
            <p className="font-normal text-xs text-[#fc8181]">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate({ to: RESET })}
          className="text-base text-left text-[#1024A3] font-normal cursor-pointer mobile:text-sm"
        >
          Forgot Password?
        </button>
        <button
          disabled={isSubmitting}
          type="submit"
          className={`bg-[#17567E] w-44 h-12 flex justify-center items-center rounded-md text-white mobile:text-sm mx-auto my-3 mobile:py-2 mobile:px-10 ${
            isSubmitting ? "opacity-80" : ""
          }`}
        >
          {isLoading ? <ButtonLoader title="Logging In" /> : "Log In"}
        </button>
        <p
          className="mx-auto font-normal text-base mobile:text-sm mobile:text-center"
          onClick={() => {}}
        >
          Don’t have an account?{" "}
          <Link
            to={SIGNUP}
            className="text-[#1024A3] cursor-pointer mobile:text-sm"
          >
            Register a church
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
