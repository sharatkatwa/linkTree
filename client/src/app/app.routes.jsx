import { createBrowserRouter } from "react-router";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/authLayout";
import Register from "../features/auth/pages/register";
import Login from "../features/auth/pages/login";

export const router = createBrowserRouter([
  { path: "/", element: <AppLayout /> },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);
