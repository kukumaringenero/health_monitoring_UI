import React from "react";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";

export default function RootLayout({ children }) {
  const { theme, setTheme } = useContext(themeContext);
  return (
    <div className={`main-container ${theme}`}>
      <Navbar />
      {children}
    </div>
  );
}
