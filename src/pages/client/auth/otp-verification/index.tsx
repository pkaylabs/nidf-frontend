import ButtonLoader from "@/components/loaders/button";
import { ONBOARDING } from "@/constants/page-path";
import { useVerifyOtpMutation } from "@/redux/features/auth/authApiSlice";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearch } from "react-location";

const OtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const search = useSearch<any>();

  const handleChange = (
    element: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = element.target.value.slice(-1);
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    if (value) {
 
      newOtp[index] = value;
      setOtp(newOtp);

      if (element.target.nextSibling instanceof HTMLInputElement) {
        element.target.nextSibling.focus();
      }
    } else if (
      element.nativeEvent instanceof InputEvent &&
      element.nativeEvent.inputType === "deleteContentBackward"
    ) {
      newOtp[index] = "";
      setOtp(newOtp);

      if (element.target.previousSibling instanceof HTMLInputElement) {
        element.target.previousSibling.focus();
      }
    }
  };

  useEffect(() => {
    document.title = "NIDF | OTP Verification";
  }, []);

  const [verify, { isLoading }] = useVerifyOtpMutation();

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpCode = otp.join("");

    try {
      const res = await verify({
        otp: otpCode,
      }).unwrap();

      console.log(res, "res");

      if (res?.message) {
        toast(
          JSON.stringify({
            type: "success",
            title: res?.message ?? `Verification successful`,
          })
        );

        navigate({ to: ONBOARDING, replace: true });
      } else {
        toast(
          JSON.stringify({
            type: "error",
            title: "Verification failed",
          })
        );
      }
    } catch (err: any) {
      console.log(err);
      toast(
        JSON.stringify({
          type: "error",
          title: err?.data?.error ?? "Verification failed",
        })
      );
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <form
      onSubmit={handleOtpSubmit}
      className="w-full flex flex-col gap-y-10 mobile:gap-y-5 mobile:mt-8 "
    >
      <div className="">
        <h1 className="font-semibold text-3xl mobile:text-lg">
          OTP Verification
        </h1>
        {!search?.phone ? (
          <p className="text-lg text-[#808080] font-normal mobile:text-sm">
            Please verify your phone number to continue.
          </p>
        ) : (
          <p className="text-lg text-[#808080] font-normal mobile:text-sm">
            We’ve sent an otp code to your phone number{" "}
            <span className="text-[#1024A3] mobile:text-sm">
              +233 ({search?.phone ?? "xxxxxxxxxxxx"})
            </span>
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-center  mobile:overflow-x-auto ">
        {otp.map((data, index) => {
          return (
            <input
              key={index}
              ref={(input) => (inputRefs.current[index] = input)}
              type="text"
              value={data}
              disabled={isLoading}
              onChange={(e) => handleChange(e, index)}
              className="w-20 h-20 shadow-sm border border-[#808080] text-center m-5 rounded-md font-normal text-4xl mobile:w-12 mobile:h-12 mobile:text-lg mobile:ml-1"
            />
          );
        })}
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="bg-[#17567E] w-36 h-12 flex justify-center items-center rounded-md text-white  mx-auto mt-8 mobile:px-10 mobile:py-2 mobile:text-sm disabled:opacity-80"
      >
        {isLoading ? <ButtonLoader title="Verifying" /> : "Verify"}
      </button>
    </form>
  );
};

export default OtpVerification;
