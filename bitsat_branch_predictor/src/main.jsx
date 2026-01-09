import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createHead, UnheadProvider } from '@unhead/react/client';
import App from "./App";
import "./index.css";

const head = createHead();

ReactDOM.createRoot(document.getElementById("root")).render(
    <UnheadProvider head={head}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </UnheadProvider>
);