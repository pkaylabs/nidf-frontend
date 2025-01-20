import React, { FC } from "react";
import { Outlet } from "react-location";
import { Link } from "react-location";
import logo from "@/assets/images/logo1.png";

const AuthLayout: FC = () => {
  return (
    <main className="relative w-full h-screen flex justify-center items-center bg-[#EBEBEB] ">
      <div className="absolute left-8 top-5 ">
        <img src={logo} alt="logo" className="h-36 w-auto " />
      </div>
      <div className="flex-1 max-w-[44rem] bg-white ">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
