import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Approuter from "./Router/Approuter.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Approuter />
    <Toaster position="top-right" />
  </AuthProvider>,
);
