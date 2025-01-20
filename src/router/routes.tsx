/* eslint-disable @typescript-eslint/no-explicit-any */
//  eslint-disable @typescript-eslint/no-explicit-any
import { Outlet, Route, SearchPredicate } from "react-location";
import { LocationGenerics } from "./location";
import Dashboard from "@/pages/dashboard";
import {
  APPLICATIONS,
  DASHBOARD,
  LOGIN,
  ONBOARDING,
  PROGRESS,
  REPAYMENT,
  RESET,
  SIGNUP,
} from "@/constants/page-path";
import Applications from "@/pages/applications";
import Login from "@/pages/auth/login";
import SignUp from "@/pages/auth/signup";
import ProgressReport from "@/pages/progress";
import Repayment from "@/pages/repayment";
import Onboarding from "@/pages/auth/onboarding";
import ResetPassword from "@/pages/auth/reset-password";

export type RouteProps = Omit<Route, "children"> & {
  navigation?: boolean;
  sidebar?: { label: string; icon: any };
  children?: RouteProps[];
  search?: SearchPredicate<LocationGenerics>;
};

const routes: RouteProps[] = [
  {
    path: DASHBOARD,
    element: <Dashboard />,
    meta: {
      layout: "App",
    },
  },
  {
    path: APPLICATIONS,
    element: <Applications />,
    meta: {
      layout: "App",
    },
  },

  // {
  //   path: "/services",
  //   element: <Outlet />,
  //   meta: {
  //     layout: "App",
  //   },
  //   children: [
  //     {
  //       path: "/",
  //       element: <ServiceList />,
  //       meta: {
  //         layout: "App",
  //       },
  //     },
  //     {
  //       path: "/:id",
  //       element: <ServiceDetails />,
  //       meta: {
  //         layout: "App",
  //       },
  //     },
  //   ],
  // },

  {
    path: PROGRESS,
    element: <ProgressReport />,
    meta: {
      layout: "App",
    },
  },
  {
    path: REPAYMENT,
    element: <Repayment />,
    meta: {
      layout: "App",
    },
  },
  {
    path: ONBOARDING,
    element: <Onboarding />,
    meta: {
      layout: "App",
    },
  },
  {
    path: SIGNUP,
    element: <SignUp />,
    meta: {
      layout: "Auth",
    },
  },
  {
    path: LOGIN,
    element: <Login />,
    meta: {
      layout: "Auth",
    },
  },
  {
    path: RESET,
    element: <ResetPassword />,
    meta: {
      layout: "Auth",
    },
  },
];

export default routes;
