import type { RouteObject } from "react-router-dom";
import { lazy } from "react";

const PrayerPoints = lazy(
  () => import("../pages/admin/prayer-points/PrayerPoints")
);
const CreatePrayerPoint = lazy(
  () => import("../pages/admin/prayer-points/CreatePrayerPoint")
);
const EditPrayerPoint = lazy(
  () => import("../pages/admin/prayer-points/EditPrayerPoint")
);
const Users = lazy(() => import("../pages/admin/users/Users"));
const CreateUser = lazy(() => import("../pages/admin/users/CreateUser"));
const EditUser = lazy(() => import("../pages/admin/users/EditUser"));

export const adminRoutes: RouteObject[] = [
  {
    path: "prayer-points",
    children: [
      { index: true, element: <PrayerPoints /> },
      { path: "create", element: <CreatePrayerPoint /> },
      { path: ":id/edit", element: <EditPrayerPoint /> },
    ],
  },
  {
    path: "users",
    children: [
      { index: true, element: <Users /> },
      { path: "create", element: <CreateUser /> },
      { path: ":id/edit", element: <EditUser /> },
    ],
  },
];
