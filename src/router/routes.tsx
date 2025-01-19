/* eslint-disable @typescript-eslint/no-explicit-any */
//  eslint-disable @typescript-eslint/no-explicit-any
import { Outlet, Route, SearchPredicate } from "react-location";
import { LocationGenerics } from "./location";
import SignIn from "@/pages/signin";
import SignUp from "@/pages/signup";
import ResetPassword from "@/pages/reset-password";
import Onboarding from "@/pages/onboarding";
import Confirm from "@/layout/onboard/confirm";
import Home from "@/pages/home";
import BusinessProfile from "@/pages/profiles/business";
import UserProfile from "@/pages/profiles/user";
import Appointments from "@/pages/appointments";
import Providers from "@/pages/providers";
import IncomeManagement from "@/pages/income";
import Transactions from "@/pages/transactions";
import Reports from "@/pages/reports";
import AddCampaigns from "@/pages/add-campaigns";
import CreateService from "@/pages/services/CreateService";

import ServiceList from "@/pages/services/ServiceList";
import ServiceDetails from "@/pages/services/ServiceDetails";

import CampaignsDetail from "@/pages/add-campaigns/detail";

import AddProvider from "@/pages/providers/add";
import AddCamp from "@/pages/add-campaigns/add";
import ChangePassword from "@/pages/profiles/change-password";

export type RouteProps = Omit<Route, "children"> & {
  navigation?: boolean;
  sidebar?: { label: string; icon: any };
  children?: RouteProps[];
  search?: SearchPredicate<LocationGenerics>;
};

const routes: RouteProps[] = [
  {
    path: "/",
    element: <Home />,
    meta: {
      layout: "App",
    },
  },
  {
    path: "/business-profile",
    element: <BusinessProfile />,
    meta: {
      layout: "App",
    },
  },

  {
    path: "/create-service",
    element: <Outlet />,
    meta: {
      layout: "Onservice",
    },
    children: [
      {
        path: "/",
        element: <CreateService />,
        meta: {
          layout: "Onservice",
        },
      },
    ],
  },

  {
    path: "/services",
    element: <Outlet />,
    meta: {
      layout: "App",
    },
    children: [
      {
        path: "/",
        element: <ServiceList />,
        meta: {
          layout: "App",
        },
      },
      {
        path: "/:id",
        element: <ServiceDetails />,
        meta: {
          layout: "App",
        },
      },
    ],
  },

  // {
  //   path: "/create",
  //   element: <ServiceDetails />,
  //   meta: {
  //     layout: "App",
  //   },
  // },

  {
    path: "/user-profile",
    element: <UserProfile />,
    meta: {
      layout: "App",
    },
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
    meta: {
      layout: "App",
    },
  },
  {
    path: "/appointments",
    element: <Appointments />,
    meta: {
      layout: "App",
    },
  },

  {
    path: "/providers",
    element: <Providers />,
    meta: {
      layout: "App",
    },
  },
  {
    path: "/add-provider",
    element: <AddProvider />,
    meta: {
      layout: "App",
    },
  },
  {
    path: "/income-management",
    element: <IncomeManagement />,
    meta: {
      layout: "App",
    },
  },
  {
    path: "/transactions",
    element: <Transactions />,
    meta: {
      layout: "App",
    },
  },
  {
    path: "/reports",
    element: <Reports />,
    meta: {
      layout: "App",
    },
  },
  // {
  //   path: "/add-campaigns",
  //   element: <AddCampaigns />,
  //   meta: {
  //     layout: "App",
  //   },
  // },
  {
    path: "/ad-campaigns",
    element: <Outlet />,
    meta: {
      layout: "App",
    },
    children: [
      {
        path: "/",
        element: <AddCampaigns />,
        meta: {
          layout: "App",
        },
      },
      {
        path: "/add-camp",
        element: <AddCamp />,
        meta: {
          layout: "App",
        },
      },
      {
        path: "/:id",
        element: <CampaignsDetail />,
        meta: {
          layout: "App",
        },
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    meta: {
      layout: "Auth",
    },
  },
  {
    path: "/login",
    element: <SignIn />,
    meta: {
      layout: "Auth",
    },
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    meta: {
      layout: "Auth",
    },
  },
  {
    path: "/verify-email",
    element: <ResetPassword />,
    meta: {
      layout: "Auth",
    },
  },
  {
    path: "/onboarding",
    element: <Outlet />,
    meta: {
      layout: "Onboard",
    },
    children: [
      {
        path: "/",
        element: <Onboarding />,
        meta: {
          layout: "Onboard",
        },
      },
      {
        path: "confirm",
        element: <Confirm />,
        meta: {
          layout: "Onboard",
        },
      },
    ],
  },
];

export default routes;
