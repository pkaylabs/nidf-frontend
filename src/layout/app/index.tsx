/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, Outlet, useLocation } from "react-location";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiDollar } from "react-icons/bi";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { classNames } from "@/utils";
import {
  APPLICATIONS,
  DASHBOARD,
  LOGIN,
  PROGRESS,
  REPAYMENT,
  SIGNUP,
} from "@/constants/page-path";
import logo from "@/assets/images/logo.png";
import { ArrowDown2 } from "iconsax-react";
import { TbLogout2 } from "react-icons/tb";

const navigation = [
  {
    name: "Dashboard",
    href: DASHBOARD,
    icon: MdOutlineDashboard,
    target: "dashboard",
  },
  {
    name: "My Applications",
    href: APPLICATIONS,
    icon: MdOutlineCalendarMonth,
    target: "applications",
  },
  {
    name: "Progress Report",
    href: PROGRESS,
    icon: AiOutlineClockCircle,
    target: "progress-report",
  },

  {
    name: "Repayment Reconciliation",
    href: REPAYMENT,
    icon: BiDollar,
    target: "repayment",
  },
];

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Logout", href: "#" },
];

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentPath = useLocation().current.pathname;

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="font-poppins relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item, index) => (
                          <li key={index}>
                            <Link
                              to={item.href}
                              className={classNames(
                                currentPath === item.href ||
                                  currentPath.includes(
                                    item.name.split(" ")[0].toLowerCase()
                                  )
                                  ? "bg-primary-50 text-primary font-semibold"
                                  : "text-gray-800 hover:bg-gray-50 hover:text-primary-600 font-medium",
                                "group flex gap-x-3 rounded-xl px-5 py-3 text-sm  leading-6 capitalize"
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  currentPath === item.href ||
                                    currentPath.includes(
                                      item.name.split(" ")[0].toLowerCase()
                                    )
                                    ? "text-primary"
                                    : "text-black group-hover:text-primary",
                                  "h-5 w-5 shrink-0"
                                )}
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    {/* <li>
                      <div className="text-xs/6 font-semibold text-gray-400">
                        Your teams
                      </div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <Link
                              to={team.href}
                              className={classNames(
                                team.current
                                  ? "bg-gray-50 text-primary-600"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-primary-600",
                                "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                              )}
                            >
                              <span
                                className={classNames(
                                  team.current
                                    ? "border-primary-600 text-primary-600"
                                    : "border-gray-200 text-gray-400 group-hover:border-primary-600 group-hover:text-primary-600",
                                  "flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"
                                )}
                              >
                                {team.initial}
                              </span>
                              <span className="truncate">{team.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <Link
                        to={SETTINGS}
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                      >
                        <Cog6ToothIcon
                          aria-hidden="true"
                          className="size-6 shrink-0 text-gray-400 group-hover:text-primary-600"
                        />
                        Settings
                      </Link>
                    </li> */}
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-80 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 pt-10">
            <div className="flex h-16 shrink-0 items-center ">
              <img
                alt="Your Company"
                src={logo}
                className="h-28 w-auto object-contain"
              />
            </div>
            <nav className="flex flex-1 flex-col pt-8">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-2">
                    {navigation.map((item, index) => (
                      <li key={index}>
                        <Link
                          to={item.href}
                          className={classNames(
                            currentPath === item.href ||
                              currentPath.includes(
                                item.name.split(" ")[0].toLowerCase()
                              )
                              ? "bg-gray-50 text-primary font-semibold"
                              : "text-[#324054] hover:bg-gray-50 hover:text-primary-600 font-medium",
                            "group flex gap-x-3 rounded-xl px-2 py-3 text-base  leading-6 capitalize font-poppins"
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              currentPath === item.href ||
                                currentPath.includes(
                                  item.name.split(" ")[0].toLowerCase()
                                )
                                ? "text-primary"
                                : "text-black group-hover:text-primary",
                              "size-6 shrink-0"
                            )}
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                {/* <li>
                  <div className="text-xs/6 font-semibold text-gray-400">
                    Your teams
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-gray-50 text-primary-600"
                              : "text-gray-700 hover:bg-gray-50 hover:text-primary-600",
                            "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                          )}
                        >
                          <span
                            className={classNames(
                              team.current
                                ? "border-primary-600 text-primary-600"
                                : "border-gray-200 text-gray-400 group-hover:border-primary-600 group-hover:text-primary-600",
                              "flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"
                            )}
                          >
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li> */}
                <li className="mt-auto">
                  <Link
                    to={LOGIN}
                    className="font-poppins group -mx-2 flex gap-x-3 rounded-md p-2 font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                  >
                    <TbLogout2
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-500 group-hover:text-primary-600"
                    />
                    Logout
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-80 h-screen flex flex-col">
          <div className="sticky top-0 z-40 flex h-20 border-b shrink-0 items-center gap-x-4 bg-white pr-4 sm:gap-x-6 sm:pr-6 lg:pr-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            {/* Separator */}
            <div
              aria-hidden="true"
              className="h-6 w-px bg-gray-200 lg:hidden"
            />

            <div className="font-poppins flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="font-semibold text-[1.75rem] text-gray-900 flex-1 flex items-center">
                {currentPath === DASHBOARD
                  ? "Welcome Prince!"
                  : currentPath.includes(APPLICATIONS)
                  ? "My Applications"
                  : currentPath.includes(PROGRESS)
                  ? "Progress Report"
                  : currentPath.includes(REPAYMENT)
                  ? "Repayment Reconciliation"
                  : "Welcome Prince"}
              </div>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="relative -m-2.5 p-2 bg-gray-100 rounded-full text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                  <span className="absolute top-2 right-2 h-2.5 w-2.5 flex items-center justify-center bg-red text-white text-xs/6 font-semibold rounded-full"></span>
                </button>

                {/* Separator */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-11 rounded-full bg-gray-50"
                    />
                    <span className="hidden lg:flex lg:items-start">
                      <ArrowDown2
                        size="20"
                        color="#71839B"
                        variant="Bold"
                        className="ml-2"
                      />
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2.5 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <span
                      aria-hidden="true"
                      className="px-3 text-sm leading-none text-left font-semibold text-gray-900"
                    >
                      Prince Kyeremateng <br />
                    </span>
                    {userNavigation.map((item, idx) => (
                      <MenuItem key={item.name}>
                        <Link
                          to={item.href}
                          className={`block px-3 py-1 text-sm/6 ${idx === userNavigation.length - 1 ? "text-red" : "text-gray-900"}  data-[focus]:bg-gray-50 data-[focus]:outline-none`}
                        >
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <main className="font-poppins flex-1">
            <div className="h-full pb-4 sm:pb-6 bg-[#EBEBEB] rounded-md">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
