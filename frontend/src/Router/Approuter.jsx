import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Forgotpassword from "../pages/auth/Forgotpassword";
import Resetpassword from "../pages/auth/Resetpassword";

import Dashboard from "../pages/dashboard/Dashboard";

import AllJournals from "../pages/journals/AllJournal";
import AddJournal from "../pages/journals/AddJournal";
import JournalDetails from "../pages/journals/JournalDetails";
import EditJournal from "../pages/journals/EditJournal";

import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";

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
       path: "/forgot-password",
       element: (
         <PublicRoute>
           <Forgotpassword />
         </PublicRoute>
       ),
     },
     {
       path: "/reset-password/:token",
       element: (
         <PublicRoute>
           <Resetpassword />
         </PublicRoute>
       ),
     },
     {
       path: "/dashboard",
       element: (
         <ProtectedRoute>
           <Dashboard />
         </ProtectedRoute>
       ),
     },
     {
       path: "/journals",
       element: (
         <ProtectedRoute>
           <AllJournals />
         </ProtectedRoute>
       ),
     },
     {
       path: "/journals/add",
       element: (
         <ProtectedRoute>
           <AddJournal />
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
