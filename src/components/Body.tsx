import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInForm from "./SignInForm";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";

const isAuthenticated = !!localStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInForm />,
  },
  {
    path: "/login",
    element: <SignInForm />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute isAuthenticated={isAuthenticated} element={<Dashboard />} />
    ),
  },
]);

const Body: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Body;
