import React, { FC } from "react";
import { Outlet } from "react-location";
import logo from "@/assets/images/logo1.png";

const AuthLayout: FC = () => {
  return (
    <main className="font-poppins relative w-full h-screen  flex justify-center items-center bg-[#EBEBEB] overflow-y-auto scrollbar-hide p-4 md:p-10">
      <div className="fixed left-8 top-5 mobile:left-40 mobile:top-15">
        <img src={logo} alt="logo" className="h-36 w-auto mobile:h-20" />
      </div>
      <div className="flex-1 max-w-[44rem] bg-white py-10 px-20 rounded-xl m-auto mobile:w-full mobile:py-5 mobile:px-4">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
