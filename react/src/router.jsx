import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./viwes/Login";
import Signup from "./viwes/Signup";
import Users from "./viwes/Users";
import NotFound from "./viwes/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./viwes/Dashboard";
import UserForm from "./viwes/UserForm";

const router = createBrowserRouter([
     {
          path: "/",
          element: <DefaultLayout />,
          children: [
               {
                    path: "/",
                    element: <Navigate to="/users" />,
               },
               {
                    path: "/users",
                    element: <Users />,
               },
               {
                    path: "dashboard",
                    element: <Dashboard />,
               },
               {
                    path: "/users/new",
                    element: <UserForm key="userCreate"/>,
               },
               {
                    path: "/users/:id",
                    element: <UserForm key="userUpdate"/>,
               },
          ],
     },
     {
          path: "/",
          element: <GuestLayout />,
          children: [
               {
                    path: "/login",
                    element: <Login />,
               },
               {
                    path: "/signup",
                    element: <Signup />,
               },
          ],
     },
     {
          path: "*",
          element: <NotFound />,
     },
]);

export default router;
