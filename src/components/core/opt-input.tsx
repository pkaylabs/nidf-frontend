
import OtpInput from "react18-input-otp";

export default function OtpInputComponent({ form }: any) {
  const { values, errors, touched, setFieldValue } = form;

  return (
    <OtpInput
      value={values.otp}
      onChange={(otp: string) => setFieldValue("otp", otp)}
      numInputs={4}
      separator={<span>-</span>}
      placeholder="----"
      className="w-full flex justify-center items-center gap-4"
      containerStyle=""
      inputStyle="!w-full max-w-20 mobile:max-w-12 !flex-1 h-14 border border-gray-300 rounded-md px-3 focus:outline-none focus:border-none focus:ring-2 focus:ring-primary-600"
      autoComplete="one-time-code"
      hasErrored={touched.otp && Boolean(errors.otp)}
      errorStyle="border-red"
    />
  );
}
