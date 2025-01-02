import React from "react";
import Totalproject from "./Totalproject";
import Connector from "./Connector";
import Table from "./Table";
import Blc from "./Blc";
import Lbt from "./Lbt";
import Totaluser from "./Totaluser";
import { Tooltip } from "react-tooltip";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";

function Topsection() {
  const { theme, setTheme } = useContext(themeContext);
  return (
    <div className="main-cards">
      <div className="card" id="driver_totalProject">
        <span style={{ fontSize: "3.5em" }}>
          <Totalproject />
        </span>
        <div className="card-inner">
          <h3>Projects</h3>
        </div>
      </div>
      <Connector />
      {/* <Tooltip id="connector-lag" />
      <Tooltip id="connector-off" />
      <Tooltip id="lbt-lag" />
      <Tooltip id="lbt-off" />
      <Tooltip id="blc-lag" />
      <Tooltip id="blc-off" />
      <Tooltip id="table-lag" />
      <Tooltip id="table-off" />
      <Tooltip id="home" /> */}
      <Table />
      <Blc />
      <Lbt />
      <div className="card" id="driver_totalUser">
        <span style={{ fontSize: "3.5em" }}>
          <Totaluser />
        </span>
        <div className="card-inner">
          <h3>Total user</h3>
        </div>
      </div>
    </div>
  );
}

export default Topsection;
