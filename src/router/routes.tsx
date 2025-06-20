/* eslint-disable @typescript-eslint/no-explicit-any */
//  eslint-disable @typescript-eslint/no-explicit-any
import { Outlet, Route, SearchPredicate } from "react-location";
import { LocationGenerics } from "./location";

import {
  ADMIN_APPLICATIONS,
  ADMIN_DASHBOARD,
  ADMIN_DIBURSEMENT,
  ADMIN_DISTRICTS,
  ADMIN_LOGIN,
  ADMIN_NOTIFICATIONS,
  ADMIN_PROGRESS,
  ADMIN_REGIONS,
  ADMIN_REPAYMENT,
  ADMIN_USERS,
  APPLICATIONS,
  APPLY_SUPPORT,
  DASHBOARD,
  LOGIN,
  NOTIFICATIONS,
  ONBOARDING,
  OTP_VERIFICATION,
  PROFILE,
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

import AdminApplicationDetails from "@/pages/admin/applications/actions/application-detail";
import CreateApplication from "@/pages/admin/applications/support";
import Disbursement from "@/pages/admin/disbursement";
import AddDisbursement from "@/pages/admin/disbursement/add";
import DisbursementDetails from "@/pages/admin/disbursement/detail";
import AdminProgressReport from "@/pages/admin/progress";
import AdminProgressReportDetails from "@/pages/admin/progress/detail";
import AdminRepayment from "@/pages/admin/repayment";
import AdminRepaymentDetails from "@/pages/admin/repayment/detail";
import Regions from "@/pages/admin/region";
import AddRegion from "@/pages/admin/region/add";
import Districts from "@/pages/admin/district";
import AddDistrict from "@/pages/admin/district/add";
import RegionDetails from "@/pages/admin/region/details";
import DistrictDetails from "@/pages/admin/district/details";
import Notifications from "@/pages/admin/notifications";
import AddNotification from "@/pages/admin/notifications/add";
import NotificationDetails from "@/pages/admin/notifications/details";
import Users from "@/pages/admin/users";
import AddUser from "@/pages/admin/users/add";
import Profile from "@/pages/client/profile";

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
        path: "/update-support/:id",
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
  {
    path: NOTIFICATIONS,
    element: <Outlet />,
    meta: {
      layout: "App",
    },
    children: [
      {
        path: "/",
        element: <Notifications />,
        meta: {
          layout: "App",
        },
      },
      {
        path: "/:id",
        element: <NotificationDetails />,
        meta: {
          layout: "App",
        },
      },
    ],
  },
  {
    path: PROFILE,
    element: <Outlet />,
    meta: {
      layout: "App",
    },
    children: [
      {
        path: "/",
        element: <Profile />,
        meta: {
          layout: "App",
        },
      },
    ],
  },

  // Admin routes
  // {
  //   path: ADMIN_LOGIN,
  //   element: <AdminAuth />,
  //   meta: {
  //     layout: "Auth",
  //   },
  // },
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
        element: <CreateApplication />,
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
  {
    path: ADMIN_PROGRESS,
    element: <Outlet />,
    meta: {
      layout: "Admin",
    },
    children: [
      {
        path: "/",
        element: <AdminProgressReport />,
        meta: {
          layout: "Admin",
        },
      },

      {
        path: "/:id",
        element: <AdminProgressReportDetails />,
        meta: {
          layout: "Admin",
        },
      },
    ],
  },
  {
    path: ADMIN_DIBURSEMENT,
    element: <Outlet />,
    meta: {
      layout: "Admin",
    },
    children: [
      {
        path: "/",
        element: <Disbursement />,
        meta: {
          layout: "Admin",
        },
      },
      {
        path: "/add",
        element: <AddDisbursement />,
        meta: {
          layout: "Admin",
        },
      },
      {
        path: "/:id",
        element: <DisbursementDetails />,
        meta: {
          layout: "Admin",
        },
      },
    ],
  },
  {
    path: ADMIN_REPAYMENT,
    element: <Outlet />,
    meta: {
      layout: "Admin",
    },
    children: [
      {
        path: "/",
        element: <AdminRepayment />,
        meta: {
          layout: "Admin",
        },
      },

      {
        path: "/:id",
        element: <AdminRepaymentDetails />,
        meta: {
          layout: "Admin",
        },
      },
    ],
  },
  {
    path: ADMIN_REGIONS,
    element: <Outlet />,
    meta: {
      layout: "Admin",
    },
    children: [
      {
        path: "/",
        element: <Regions />,
        meta: {
          layout: "Admin",
        },
      },

      {
        path: "/add",
        element: <AddRegion />,
        meta: {
          layout: "Admin",
        },
      },
      {
        path: "/:id",
        element: <RegionDetails />,
        meta: {
          layout: "Admin",
        },
      },
    ],
  },
  {
    path: ADMIN_DISTRICTS,
    element: <Outlet />,
    meta: {
      layout: "Admin",
    },
    children: [
      {
        path: "/",
        element: <Districts />,
        meta: {
          layout: "Admin",
        },
      },

      {
        path: "/add",
        element: <AddDistrict />,
        meta: {
          layout: "Admin",
        },
      },
      {
        path: "/:id",
        element: <DistrictDetails />,
        meta: {
          layout: "Admin",
        },
      },
    ],
  },
  {
    path: ADMIN_NOTIFICATIONS,
    element: <Outlet />,
    meta: {
      layout: "Admin",
    },
    children: [
      {
        path: "/",
        element: <Notifications />,
        meta: {
          layout: "Admin",
        },
      },

      {
        path: "/add",
        element: <AddNotification />,
        meta: {
          layout: "Admin",
        },
      },
      {
        path: "/:id",
        element: <NotificationDetails />,
        meta: {
          layout: "Admin",
        },
      },
    ],
  },
  {
    path: ADMIN_USERS,
    element: <Outlet />,
    meta: {
      layout: "Admin",
    },
    children: [
      {
        path: "/",
        element: <Users />,
        meta: {
          layout: "Admin",
        },
      },
      {
        path: "/add",
        element: <AddUser />,
        meta: {
          layout: "Admin",
        },
      },
    ],
  },

  // Auth routes
  // {
  //   path: ONBOARDING,
  //   element: <Onboarding />,
  //   meta: {
  //     layout: "Auth",
  //   },
  // },
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
