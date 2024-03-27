import {
  BrowserRouter,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";
import Login from "./pages/auth/Login";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import DashboardHomePage from "./pages/dashboard/DashboardHomePage";

import Page404 from "./pages/notFound/Page404";
import ResultsPage from "./pages/dashboard/ResultsPage";
import { useSelector } from "react-redux";

// routes

export default function App() {
  const { user } = useSelector((state) => state.studentAuth);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/dashboard" />,
    },
    {
      element: user ? <DashboardLayout /> : <Navigate to="/login" />,

      path: "/dashboard",
      children: [
        { element: <Navigate to="/dashboard/home" />, index: true },
        {
          path: "home",
          element: <DashboardHomePage />,
        },

        {
          path: "result",
          element: <ResultsPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },

    { path: "/404", element: <Page404 /> },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
  return <RouterProvider router={routes} />;
}
