import { createBrowserRouter } from "react-router-dom";
import { AuthPage } from "../pages/auth/";
import { RootLayout } from "../app/layouts";
import { MainPage } from "../pages/main/";
import { ProtectedRoute } from "./providers/ProtectedRoute";
import { GuestRoute } from "./providers/GuestRoute";
import { AdminPage } from "../pages/admin";
import { AdminRoute } from "./providers/AdminRoute";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <div>Упс! Страница не найдена.</div>,
    children: [
      {
        path: "/auth",
        element: (
          <GuestRoute>
            <AuthPage />
          </GuestRoute>
        ),
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        ),
      },
    ],
  },
]);
