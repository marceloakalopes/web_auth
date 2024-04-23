import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignUpPage from "./pages/SignUpPage.tsx";
import LogInPage from "./pages/LogInPage.tsx";
import PageNotFoundPage from "./pages/PageNotFoundPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Success from "./pages/Success.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

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

const rootElement: HTMLElement | null = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
