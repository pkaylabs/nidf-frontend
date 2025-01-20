/* eslint-disable @typescript-eslint/no-explicit-any */

import { Outlet } from "react-location";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiDollar } from "react-icons/bi";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: MdOutlineDashboard,
    target: "dashboard",
  },
  {
    name: "Appointments",
    href: "/appointments",
    icon: MdOutlineCalendarMonth,
    target: "appointments",
  },
  {
    name: "Services",
    href: "/services",
    icon: AiOutlineClockCircle,
    target: "services",
  },

  {
    name: "Income management",
    href: "/income-management",
    icon: BiDollar,
    target: "income-management",
  },
];

export default function AppLayout() {
  return (
    <>
      <div className="font-inter">
        app
        <div className="px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </>
  );
}
