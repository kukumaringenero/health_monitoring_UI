import React from "react";
import Projectconfigtable from "../components/Projectconfigtable";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";
function Adminpage() {
  const { theme, setTheme } = useContext(themeContext);
  return (
    <div className="adminpage">
      <Navbar />
      <div className={`main-container ${theme}`}>
        <Projectconfigtable />
      </div>
    </div>
  );
}

export default Adminpage;
