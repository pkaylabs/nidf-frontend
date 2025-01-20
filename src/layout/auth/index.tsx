import React, { FC } from "react";
import { Outlet } from "react-location";

const AuthLayout: FC = () => {
  return (
    <main className="w-full h-screen flex justify-between items-center">
      <div className="flex-1 h-full overflow-hidden">
        auth
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
