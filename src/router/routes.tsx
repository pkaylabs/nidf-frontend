/* eslint-disable @typescript-eslint/no-explicit-any */
//  eslint-disable @typescript-eslint/no-explicit-any
import { Outlet, Route, SearchPredicate } from "react-location";
import { LocationGenerics } from "./location";

import {
  ADMIN_APPLICATIONS,
  ADMIN_DASHBOARD,
  ADMIN_LOGIN,
  APPLICATIONS,
  APPLY_SUPPORT,
  DASHBOARD,
  LOGIN,
  ONBOARDING,
  OTP_VERIFICATION,
  PROGRESS,
  REPAYMENT,
  RESET,
  SIGNUP,
} from "@/constants/page-path";
import Dashboard from "@/pages/client/dashboard";
import Applications from "@/pages/client/applications";
import ApplyForSupport from "@/pages/client/applications/support";
import ViewApplicationDetail from "@/pages/client/applications/actions/view";
import ProgressReport from "@/pages/client/progress";
import AddProgressReport from "@/pages/client/progress/add";
import ProgressReportDetail from "@/pages/client/progress/details";
import Repayment from "@/pages/client/repayment";
import AddRepayment from "@/pages/client/repayment/add";
import RepaymentDetails from "@/pages/client/repayment/detail";
import Onboarding from "@/pages/client/auth/onboarding";
import OtpVerification from "@/pages/client/auth/otp-verification";
import SignUp from "@/pages/client/auth/signup";
import Login from "@/pages/client/auth/login";
import ResetPassword from "@/pages/client/auth/reset-password";
import AdminAuth from "@/pages/admin/auth";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminApplications from "@/pages/admin/applications";
import CreateApplication from "@/pages/admin/applications/create";
import AdminApplicationDetails from "@/pages/admin/applications/actions/application-detail";

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
    element: <Outlet />,
    meta: {
      layout: "App",
    },
    children: [
      {
        path: "/",
        element: <Applications />,
        meta: {
          layout: "App",
        },
      },
      {
        path: "/support",
        element: <ApplyForSupport />,
        meta: {
          layout: "App",
        },
      },
      {
        path: "/:id",
        element: <ViewApplicationDetail />,
        meta: {
          layout: "App",
        },
      },
    ],
  },
  {
    path: PROGRESS,
    element: <Outlet />,
    meta: {
      layout: "App",
    },
    children: [
      {
        path: "/",
        element: <ProgressReport />,
        meta: {
          layout: "App",
        },
      },
      {
        path: "/add",
        element: <AddProgressReport />,
        meta: {
          layout: "App",
        },
      },
      {
        path: "/:id",
        element: <ProgressReportDetail />,
        meta: {
          layout: "App",
        },
      },
    ],
  },
  {
    path: REPAYMENT,
    element: <Outlet />,
    meta: {
      layout: "App",
    },
    children: [
      {
        path: "/",
        element: <Repayment />,
        meta: {
          layout: "App",
        },
      },
      {
        path: "/add",
        element: <AddRepayment />,
        meta: {
          layout: "App",
        },
      },
      {
        path: "/:id",
        element: <RepaymentDetails />,
        meta: {
          layout: "App",
        },
      },
    ],
  },

  // Admin routes
  {
    path: ADMIN_LOGIN,
    element: <AdminAuth />,
    meta: {
      layout: "Admin",
    },
  },
  {
    path: ADMIN_DASHBOARD,
    element: <AdminDashboard />,
    meta: {
      layout: "Admin",
    },
  },

  {
    path: ADMIN_APPLICATIONS,
    element: <Outlet />,
    meta: {
      layout: "Admin",
    },
    children: [
      {
        path: "/",
        element: <AdminApplications />,
        meta: {
          layout: "Admin",
        },
      },
      {
        path: "/create",
        element: <CreateApplication/>,
        meta: {
          layout: "Admin",
        },
      },
      {
        path: "/:id",
        element: <AdminApplicationDetails />,
        meta: {
          layout: "Admin",
        },
      },
    ],
  },

  // Auth routes
  {
    path: ONBOARDING,
    element: <Onboarding />,
    meta: {
      layout: "Auth",
    },
  },
  {
    path: OTP_VERIFICATION,
    element: <OtpVerification />,
    meta: {
      layout: "Auth",
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
