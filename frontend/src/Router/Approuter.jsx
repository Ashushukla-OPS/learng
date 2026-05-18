import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Register from  "../pages/auth/Register"
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import EditProfile from "../pages/profile/EditProfile";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import AllJournals from "../pages/journals/AllJournals";
import AddJournal from "../pages/journals/AddJournal";
import JournalDetails from "../pages/journals/JournalDetails";
import EditJournal from "../pages/journals/EditJournal";
import Profile from "../pages/profile/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
function Approuter() {
    const router = createBrowserRouter([
      {
        path: "/",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/Dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          
            <Forgotpassword />
          
        ),
      },

      {
        path: "/reset-password/:token",
        element: (
          
            <Resetpassword />
          
        ),
      },

      {
        path: "/journals",

        element: (
          <ProtectedRoute>
            <Alljournal />
          </ProtectedRoute>
        ),
      },

      {
        path: "/journals/add",
        element: (
          <ProtectedRoute>
            <Addjournal />
          </ProtectedRoute>
        ),
      },

      {
        path: "/journals/:id",
        element: (
          <ProtectedRoute>
            <JournalDetails />
          </ProtectedRoute>
        ),
      },

      {
        path: "/journals/edit/:id",
        element: (
          <ProtectedRoute>
            <EditJournal />
          </ProtectedRoute>
        ),
      },

      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      {
        path: "/profile/edit",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
    ]);
  return (
    <RouterProvider  router={router}/>
  );
}

export default Approuter;
