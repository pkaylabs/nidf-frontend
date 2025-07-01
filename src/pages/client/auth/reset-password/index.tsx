import { LOGIN } from "@/constants/page-path";
import { FormikProps, useFormik } from "formik";
import _ from "lodash";
import { Link, useNavigate, useSearch } from "react-location";
import * as Yup from "yup";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import OtpInputComponent from "@/components/core/opt-input";
import { useEffect, useState } from "react";
import {
  useResetPasswordMutation,
  useSendOTPMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/authApiSlice";
import toast from "react-hot-toast";
import logo from "@/assets/images/logo1.png";
import { Eye, EyeSlash } from "iconsax-react";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const search = useSearch<any>();

  useEffect(() => {
    document.title = "NIDF | Reset";
  }, []);

  const [sendOtp, { isLoading }] = useSendOTPMutation();
  const [verifyOTP, { isLoading: verifying }] = useVerifyOtpMutation();
  const [resetPassword, { isLoading: resetting }] = useResetPasswordMutation();
  const loading = isLoading || verifying || resetting;

  const { values, handleBlur, handleChange, errors, touched, setTouched } =
    useFormik({
      initialValues: {
        phone: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: Yup.object().shape({
        phone: Yup.string()
          .matches(
            /^0(24|54|55|59|20|50|26|56|27|57|28|58|23)\d{7}$/,
            "Please enter a valid phone number"
          )
          .required("Phone number is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .matches(
            /[A-Z]/,
            "Password must contain at least one uppercase letter"
          )
          .matches(
            /[a-z]/,
            "Password must contain at least one lowercase letter"
          )
          .matches(/[0-9]/, "Password must contain at least one number")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required("Please confirm your password"),
      }),

      onSubmit: async () => {},
    });

  const otpForm: FormikProps<any> = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string().required("Otp is Required").length(4, "Otp is Invalid"),
    }),
    onSubmit: async (values) => {
      try {
        await verifyOTP({
          phone: search?.tel,
          otp: values.otp,
        })
          .then((res) => {
            console.log(res);
            if (res.data) {
              toast(
                JSON.stringify({
                  type: "success",
                  title: res?.data?.message ?? `OTP verified successfully`,
                })
              );
              if (res.data) {
                navigate({
                  to: ".",
                  search: {
                    action: "reset",
                    tel: search?.tel,
                  },
                });
              }
            }
          })
          .catch((e) => {
            console.log("catch in inner log", e);
          });
      } catch (error) {
        console.log(error, "outer catch");
      }
    },
  });

  const handleProceed = async () => {
    if (search?.action === "reset") {
      try {
        await resetPassword({
          phone: search?.tel,
          new_password: values.password,
          confirm_password: values.confirmPassword,
        })
          .then((res) => {
            if (res?.data) {
              toast(
                JSON.stringify({
                  type: "success",
                  title: res?.data?.message ?? `Password reset successfully`,
                })
              );
              navigate({
                to: LOGIN,
              });
            }
          })
          .catch((e) => {
            console.log("catch in inner log", e);
            toast(
              JSON.stringify({
                type: "error",
                title: e ?? "An error occured",
              })
            );
          });
      } catch (error) {
        console.log(error, "outer catch");
        toast(
          JSON.stringify({
            type: "error",
            title: error ?? "An error occured",
          })
        );
      }
    } else {
      if (_.isEmpty(errors.phone) && !_.isEmpty(values.phone)) {
        try {
          await sendOtp({
            phone: values.phone,
          })
            .then((res) => {
              if (res?.data) {
                toast(
                  JSON.stringify({
                    type: "success",
                    title: res?.data?.message ?? `OTP sent successfully`,
                  })
                );
                navigate({
                  to: ".",
                  search: {
                    action: "otp-verification",
                    tel: values.phone,
                  },
                });
              }
            })
            .catch((e) => {
              console.log("catch in inner log", e);
              toast(
                JSON.stringify({
                  type: "error",
                  title: "An error occured",
                })
              );
            });
        } catch (error) {
          console.log(error, "outer catch");
          toast(
            JSON.stringify({
              type: "error",
              title: "An error occured",
            })
          );
        }
      } else {
        setTouched({
          phone: true,
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

      <div className="flex justify-center md:hidden">
        <img src={logo} alt="logo" className="w-20 h-20  " />
      </div>

      <div className="">
        {search?.action === "reset" ? (
          <>
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
                      errors.password && touched.password
                        ? "border border-[#fc8181]"
                        : ""
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

            <div className="mt-2">
              <label htmlFor="confirmPassword" className="font-normal text-xs">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full p-3 h-12 pr-12 rounded-md border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
                           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
                           text-base font-normal ${
                             errors.confirmPassword && touched.confirmPassword
                               ? "border border-[#fc8181]"
                               : ""
                           }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer rounded-r-md transition-colors duration-200"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeSlash size="20" color="#71839B" />
                  ) : (
                    <Eye size="20" color="#71839B" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && touched.confirmPassword ? (
                <p className="font-normal text-xs text-[#fc8181]">
                  {errors.confirmPassword}
                </p>
              ) : (
                ""
              )}
            </div>
          </>
        ) : search?.action === "otp-verification" ? (
          <div className=" mb-5">
            <OtpInputComponent form={otpForm} />
            {otpForm.touched.otp && otpForm.errors.otp ? (
              <div className="text-red text-xs mt-2 ml-4">
                {typeof otpForm.errors.otp === "string" && otpForm.errors.otp}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="">
            <label htmlFor="phone" className="font-normal text-xs">
              phone
            </label>
            <input
              id="phone"
              name="phone"
              type="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 h-12 rounded-md  border border-[#EAE0E0] focus:outline-0 focus:outline-primary-300 
           transition-all duration-300 ease-in-out placeholder:font-normal placeholder:text-xs placeholder:text-[#969696] 
           text-base font-normal ${
             errors.phone && touched.phone ? "border border-[#fc8181]" : ""
           }`}
            />

            {errors.phone &&
              touched.phone &&
              typeof errors.phone === "string" && (
                <p className="font-normal text-sm text-[#fc8181]">
                  {errors.phone}
                </p>
              )}
          </div>
        )}

        <div className="flex flex-col items-center">
          <button
            disabled={loading}
            onClick={
              search?.action === "otp-verification"
                ? () => otpForm.handleSubmit()
                : handleProceed
            }
            className="w-44 h-12 bg-primary disabled:bg-primary-600 text-white flex justify-center items-center rounded-md mt-5"
          >
            {loading && (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
            )}
            {search?.action === "reset" ? "Reset" : "Continue"}
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
