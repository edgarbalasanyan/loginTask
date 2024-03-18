import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./sass/base.scss";
import "./fonts/Basis-Grotesque-Pro/BasisGrotesquePro-Regular.ttf";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId={
        "725965331689-s1qbbmqtbellop3g9k3s3c32l17de0q2.apps.googleusercontent.com"
      }
    >
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
