import { useEffect } from "react";

import Onboarding from "../onboarding";

const SignUp = () => {
  useEffect(() => {
    document.title = "NIDF | Sign up";
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-10">
      <div>
        <h1 className="font-bold text-3xl mobile:text-xl mobile:">
          Create an Account
        </h1>
        <p className="text-[#A3A3A3] font-normal mobile:text-sm">
          Create an NIDF Portal account
        </p>
      </div>

      <Onboarding />
    </div>
  );
};

export default SignUp;
