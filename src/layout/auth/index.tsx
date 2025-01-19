import React, { FC } from "react";
import { Outlet } from "react-location";
import authPic from "@/assets/images/authPic.png";
import logo from "@/assets/images/logo.png";

const AuthLayout: FC = () => {
  return (
    <main className="w-full h-screen flex justify-between items-center">
      <div className="flex-1 h-full overflow-hidden">
        <img
          src={authPic}
          alt="auth picture"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex-1 h-full p-5 overflow-auto ">
        <div className="w-full h-full max-w-[22rem] mx-auto flex flex-col justify-center items-center py-10">
          <img src={logo} alt="logo" className="w-48 h-auto object-contain" />
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
