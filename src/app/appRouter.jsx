import { createBrowserRouter } from "react-router-dom";
import { AuthPage } from "../pages/auth/";
import { RootLayout } from "../app/layouts";
import { MainPage } from "../pages/main/";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <div>Упс! Страница не найдена.</div>,
    children: [
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/",
        element: <MainPage/>
      }
    ],
  },
]);
