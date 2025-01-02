import React from "react";
import Projectconnector1 from "./Projectconnector1";
import Table from "./Table";
import Blc from "./Blc";
import Lbt from "./Lbt";
import Totaluser from "./Totaluser";
import { Tooltip } from "react-tooltip";
function Topsection1() {
  return (
    <div className="main-cards-project">
      <Projectconnector1 />
      <Table />
      <Blc />
      <Lbt />
      {/* <Tooltip id="connector-lagdata" />
      <Tooltip id="connector-offdata" />
      <Tooltip id="table-lag" />
      <Tooltip id="table-off" />
      <Tooltip id="blc-lag" />
      <Tooltip id="blc-off" />
      <Tooltip id="lbt-lag" />
      <Tooltip id="lbt-off" /> */}
      <div className="card-project" id="driver_totalUser">
        <span style={{ fontSize: "3.5em" }}>
          {" "}
          <Totaluser />
        </span>
        <div className="card-inner-project">
          <h3>Total user</h3>
        </div>
      </div>
    </div>
  );
}

export default Topsection1;
