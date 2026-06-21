import { createBrowserRouter } from "react-router";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import Register from "../features/auth/pages/register";
import Login from "../features/auth/pages/login";
import Home from "../features/home/pages/Home";
import Profile from "../features/home/pages/Profile";
import MyDashboard from "../features/dashboard/pages/MyDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/dashboard", element: <MyDashboard /> },
      { path: "/:username", element: <Profile /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/register", element: <Register /> },
    ],
  },
]);
