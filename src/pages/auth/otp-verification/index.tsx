import { ONBOARDING } from "@/constants/page-path";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-location";

const OtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    element: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = element.target.value.slice(-1);
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    if (value) {
      // Add the value and move to next input
      newOtp[index] = value;
      setOtp(newOtp);

      // move to next field if current field is filled
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

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpCode = otp.join("");

    try {
      // make some api call to the verify otp endpoint
      // if response is ok
      if (otpCode) navigate({ to: ONBOARDING, replace: true });
    } catch (error) {
      // if there is error catch it here
      console.log(error);
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
        <p className="text-lg text-[#808080] font-normal mobile:text-sm">
          We’ve sent an otp code to your phone number{" "}
          <span className="text-[#1024A3] mobile:text-sm">
            +233 xx xxx xxxx
          </span>
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center  mobile:overflow-x-auto ">
        {otp.map((data, index) => {
          return (
            <input
              key={index}
              ref={(input) => (inputRefs.current[index] = input)}
              type="text"
              value={data}
              onChange={(e) => handleChange(e, index)}
              className="w-20 h-20 shadow-sm border border-[#808080] text-center m-5 rounded-md font-normal text-4xl mobile:w-12 mobile:h-12 mobile:text-lg mobile:ml-1"
            />
          );
        })}
      </div>
      <button
        type="submit"
        className="bg-[#17567E] rounded-md text-white px-20 py-3 mx-auto mt-8 mobile:px-10 mobile:py-2 mobile:text-sm"
      >
        Verify
      </button>
    </form>
  );
};

export default OtpVerification;
