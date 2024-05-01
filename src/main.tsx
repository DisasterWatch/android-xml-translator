import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppWithColorModeProvider } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AppWithColorModeProvider />
    </React.StrictMode>
);
