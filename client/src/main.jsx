import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignUpPage from "./pages/SignUpPage.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import PageNotFoundPage from "./pages/PageNotFoundPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Success from "./pages/Success.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFoundPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LogInPage />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/dashboard",
    element: (
      <AuthProvider>
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </AuthProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
