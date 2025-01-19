/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { Bars3Icon, UsersIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { RiEdit2Line, RiChatDownloadLine, RiCashLine } from "react-icons/ri";
import { MdOutlineDashboard, MdOutlineCalendarMonth } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiDollar } from "react-icons/bi";
import { PiWarningOctagonBold } from "react-icons/pi";

import { classNames } from "@/utils";
import { Link, Navigate, Outlet, useLocation } from "react-location";
import navImg from "@/assets/images/navImg.png";
import Avatar from "@/components/core/avatar";
import profilePic from "@/assets/images/profilePic.png";
import { useAppDispatch, useAppSelector } from "@/redux";

import { LOGIN, USER_PROFILE } from "@/constants/page-path";
import {
  selectCurrentToken,
  selectCurrentUser,
  setCredentials,
} from "@/redux/features/auth/authSlice";
import { useGetUserQuery } from "@/redux/features/user/userApiSlice";
import { useGetBusinessQuery } from "@/redux/features/business/businessApiSlice";
import LoadingProgressBar from "@/components/loaders/loadingProgressBar";
import Joyride, { ACTIONS, EVENTS } from "react-joyride";
import { GiDetour } from "react-icons/gi";

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
    name: "Services Providers",
    href: "/providers",
    icon: UsersIcon,
    target: "providers",
  },
  {
    name: "Income management",
    href: "/income-management",
    icon: BiDollar,
    target: "income-management",
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: RiCashLine,
    target: "transactions",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: PiWarningOctagonBold,
    target: "reports",
  },
  {
    name: "Ad campaigns",
    href: "/ad-campaigns",
    icon: RiChatDownloadLine,
    target: "ad-campaigns",
  },
  {
    name: "Business profile",
    href: "/business-profile",
    icon: RiEdit2Line,
    target: "business-profile",
  },
];

const steps = [
  {
    target: ".dashboard",
    content: (
      <div className="font-manrope">
        <h1 className="font-bold text-base text-gray-800">Dashboard</h1>
        <p className="font-medium text-gray-700">
          View notifications and stats here.
        </p>
      </div>
    ),
  },
  {
    target: ".appointments",
    content: (
      <div className="font-manrope">
        <h1 className="font-bold text-base text-gray-800">Appointments</h1>
        <p className="font-medium text-gray-700">
          You can find your appointments here
        </p>
      </div>
    ),
  },
  {
    target: ".services",
    content: (
      <div className="font-manrope">
        <h1 className="font-bold text-base text-gray-800">Service</h1>
        <p className="font-medium text-gray-700">
          Create and manage your service here, note that you first have to
          create a service provider.
        </p>
      </div>
    ),
  },
  {
    target: ".providers",
    content: (
      <div className="font-manrope">
        <h1 className="font-bold text-base text-gray-800">Providers</h1>
        <p className="font-medium text-gray-700">
          Create and manage service providers, you first have to create a
          service provider before you create a service.
        </p>
      </div>
    ),
  },
  {
    target: ".income-management",
    content: (
      <div className="font-manrope">
        <h1 className="font-bold text-base text-gray-800">Income Management</h1>
        <p className="font-medium text-gray-700">
          See your income and withdraw from here
        </p>
      </div>
    ),
  },
  {
    target: ".transactions",
    content: (
      <div className="font-manrope">
        <h1 className="font-bold text-base text-gray-800">Transactions</h1>
        <p className="font-medium text-gray-700">
          View and manage your transactions here
        </p>
      </div>
    ),
  },
  {
    target: ".reports",
    content: (
      <div className="font-manrope">
        <h1 className="font-bold text-base text-gray-800">Reports</h1>
        <p className="font-medium text-gray-700">
          In case a customer reports an appointment you can view it here.
        </p>
      </div>
    ),
  },
  {
    target: ".ad-campaigns",
    content: (
      <div className="font-manrope">
        <h1 className="font-bold text-base text-gray-800">Ad Campaigns</h1>
        <p className="font-medium text-gray-700">
          use this option to create and manage ads on the woezor platform.
        </p>
      </div>
    ),
  },
  {
    target: ".business-profile",
    content: (
      <div className="font-manrope">
        <h1 className="font-bold text-base text-gray-800">Profile Button</h1>
        <p className="font-medium text-gray-700">
          To view and edit your profile click here.
        </p>
      </div>
    ),
  },
];

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [run, setRun] = useState(false);

  const handleClickStartTour = () => {
    setRun(!run);
  };

  const token: any = useAppSelector(selectCurrentToken);

  const current = useLocation().current.pathname;
  const currentHref = useLocation().current.href;
  const dispatch = useAppDispatch();

  const { data, isLoading, refetch } = useGetUserQuery({});

  if (data && !isLoading) {
    dispatch(setCredentials({ user: data, accessToken: token }));
  }

  useEffect(() => {
    if (data && !isLoading) {
      refetch();
      dispatch(setCredentials({ user: data, accessToken: token }));
    }
  }, [data, dispatch, token, isLoading, refetch]);

  const user = useAppSelector(selectCurrentUser);

  const {
    data: businessData,
    // refetch: refetchBusiness,
    isLoading: loadingbusiness,
  } = useGetBusinessQuery(data?.businesses[0]?._id);

  const business = businessData?.data;

  if (!token)
    return (
      <Navigate
        to={LOGIN}
        search={{ redirect: current === "/user-profile" ? "" : currentHref }}
        replace
      />
    );

  if (isLoading || loadingbusiness)
    return (
      <LoadingProgressBar
        isDone={isLoading || loadingbusiness}
        className="absolute top-0 left-0 w-full"
      />
    );

  return (
    <>
      <div className="font-inter">
        <Joyride
          run={run}
          steps={steps}
          continuous={true}
          showSkipButton
          styles={{
            options: {
              arrowColor: "#E2F2F9",
              backgroundColor: "#E2F2F9",
              overlayColor: "rgba(0, 0, 0, 0.4)",
              primaryColor: "#000",
              textColor: "#004a14",
              width: 600,
              zIndex: 1000,
            },
            tooltip: {
              borderRadius: 10,
              textAlign: "left",
              fontSize: 14,
              fontFamily: "sans-serif",
            },
            tooltipContent: {
              padding: "5px 10px",
              textAlign: "left",
            },
            buttonNext: {
              fontSize: 14,
              backgroundColor: "#1685B9",
              paddingInline: 18,
              borderRadius: 4,
              color: "#fff",
            },
            buttonBack: {
              fontSize: 14,
              marginLeft: "auto",
              marginRight: 8,
              paddingInline: 18,
            },
            buttonClose: {
              height: 10,
              padding: 15,
              position: "absolute",
              right: 0,
              top: 0,
              width: 14,
            },
            buttonSkip: {
              fontSize: 12,
            },
          }}
        />
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className=" relative z-50 lg:hidden"
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
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              className={classNames(
                                current === item.href
                                  ? "bg-gray-50 text-indigo-600"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 capitalize"
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  current === item.href
                                    ? "text-indigo-600"
                                    : "text-gray-400 group-hover:text-indigo-600",
                                  "h-5 w-5 shrink-0"
                                )}
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pt-5">
            <div className="relative w-full h-32 overflow-hidden rounded-xl flex justify-center shrink-0 items-center">
              <img
                alt="Your Company"
                src={business?.image ?? navImg}
                className="h-auto w-full"
              />
              <div className="absolute flex justify-center items-center bg-black bg-opacity-50 inset-0">
                <h4 className=" font-inter font-bold text-base text-white text-center">
                  {business?.name ?? business?.name ?? "Company Name"}
                </h4>
              </div>
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
                            current === item.href
                              ? "bg-[#E2F2F9] text-[#166890] font-semibold"
                              : "text-black hover:bg-gray-50 hover:text-[#166890] font-normal",
                            "group flex gap-x-3 rounded-xl px-5 py-3 text-xs leading-6 capitalize",
                            item.target
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              current === item.href
                                ? "text-[#166890]"
                                : "text-black group-hover:text-[#166890]",
                              "h-5 w-5 shrink-0"
                            )}
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <button
                  className="relative flex items-center gap-2 font-semibold text-primary-500 bg-gray-100 rounded-xl px-5 py-3 text-xs leading-6 capitalize text-left border "
                  onClick={handleClickStartTour}
                >
                  <GiDetour className="size-5" aria-hidden="true" />{" "}
                  <span>Start System Tour</span>
                  <div className="absolute -right-1 -top-1">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                    </span>
                  </div>
                </button>

                <li className="-mx-6 mt-auto px-5 pb-4">
                  <div className="border border-[#EAEAEA] rounded-lg py-1 px-2 flex items-center gap-3 overflow-hidden ">
                    <div className="w-10 h-10 my-other-step">
                      <Avatar
                        src={""}
                        alt={`${data?.name?.split(" ")[0]} ${
                          data?.name?.split(" ")[
                            data?.name?.split(" ").length - 1
                          ]
                        }`}
                        size="sm"
                      />
                    </div>

                    <Link
                      to={USER_PROFILE}
                      className="flex-1 text-xs text-black truncate my-first-step"
                    >
                      <h5
                        title={user?.name ?? "Mr. Anonymous"}
                        className="font-semibold truncate"
                      >
                        {user?.name ?? "Mr. Anonymous"}
                      </h5>
                      <p
                        title={user?.email ?? "anonymous@gmail.com"}
                        className="truncate"
                      >
                        {user?.email ?? "anonymous@gmail.com"}
                      </p>
                    </Link>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="h-8 w-8 rounded-full bg-gray-50"
            />
          </a>
        </div>

        <main className="py-5 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
