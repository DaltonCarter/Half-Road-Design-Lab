import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { InventoryContextProvider } from "./components/Store/InventoryContext";
import { PlayerContextProvider } from "./components/Store/PlayerContext";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./components/Store/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <InventoryContextProvider>
        <PlayerContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PlayerContextProvider>
      </InventoryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
