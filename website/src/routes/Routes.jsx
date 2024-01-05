import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "../authProvider";
import { ProtectedRoute } from "./ProtectedRoutes";
import { RatingPage } from "../pages/RatePage";
import { LoginPage } from "../pages/LoginPage";
import Logout from "../pages/LogoutPage";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";

const Routes = (props) => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute ></ProtectedRoute>, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <><RatingPage movieId='a660d18a-fc15-4de0-8ab9-9871f63506a8'></RatingPage></>,
        },
        {
          path: "/logout",
          element: <Logout/>,
        },
        {
          path: "/*",
          element: <Navigate to="/" />,
        }
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <LoginPage />,
    }
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router}><Layout>{props.children}</Layout></RouterProvider>;
};

export default Routes;
