import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ContextProvider } from "./contexts/ContextProvider.jsx";
import { Alert } from "antd";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <>
      <App />
    </>
  </ContextProvider>
);
