import { createBrowserRouter } from "react-router-dom";
import SignUp from "../page/register/SignUp";
import Login from "../page/login/Login";
import { adminRoutes } from "./admin.Routes";
import NotFound from "../component/NotFound";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
  adminRoutes,
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
