import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MyContextProvider from "./context/Usecontext";
import ProjectContextProvider from "./context/Mycontext";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeContextProvider from "./context/ThemeContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProjectContextProvider>
      <MyContextProvider>
        <ThemeContextProvider>
          <Router>
            <App />
          </Router>
        </ThemeContextProvider>
      </MyContextProvider>
    </ProjectContextProvider>
  </React.StrictMode>
);
reportWebVitals();
