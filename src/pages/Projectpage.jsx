import React, { useContext } from "react";
import Lagging from "../components/Lagging";
import Topsection1 from "../components/Topsection1";
import ComponentTable from "../components/ComponentTable";
import Navbar from "../components/Navbar";
import { themeContext } from "../context/ThemeContext";

function Projectpage() {
  const { theme, setTheme } = useContext(themeContext);
  return (
    <div>
      <Navbar />
      <div className={`main-container ${theme}`}>
        <div className={`inner-component ${theme}`}>
          <Topsection1 /> <br />
          <hr style={{ color: "#D6D6D6" }} />
        </div>
        <div>
          <Lagging />
        </div>
        <div className="table">
          <ComponentTable />
        </div>
      </div>
    </div>
  );
}
export default Projectpage;
