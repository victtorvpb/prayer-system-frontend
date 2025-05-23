import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PrayerPoints from "./pages/admin/PrayerPoints";
import CreatePrayerPoint from "./pages/admin/CreatePrayerPoint";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/admin/prayer-points",
    element: <PrayerPoints />,
  },
  {
    path: "/admin/prayer-points/create",
    element: <CreatePrayerPoint />,
  },
]);
