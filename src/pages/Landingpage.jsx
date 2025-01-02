import React from "react";
import Mysqlconnection from "../components/Mysqlconnection";
import Projectdetails from "../components/Projectdetails";
import Topsection from "../components/Topsection";
import Bilaxicalchart from "../components/Bilaxicalchart";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";

function Landingpage() {
  const { theme, setTheme } = useContext(themeContext);

  return (
    <>
      <Navbar />
      <main>
        <div className={`main-container ${theme}`}>
          <div className="inner-component">
            <Topsection />
            <br />
            <hr style={{ color: "#D6D6D6" }} />
          </div>
          <div className="charts ">
            <div style={{ height: "25em" }}>
              <Bilaxicalchart />
            </div>
            <div style={{ height: "25em" }}>
              <Mysqlconnection />
            </div>
          </div>
          <Projectdetails />
        </div>
      </main>
    </>
  );
}

export default Landingpage;
