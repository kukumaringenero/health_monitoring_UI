import React, { useState, useEffect } from "react";
import Tablerow from "./Tablerow";
import { getProjectConfig } from "../services/api";

function Projectconfigtable() {
  const [state, setState] = useState([]);
  useEffect(() => {
    getProjectConfig().then((res) => {
      setState(res);
    });
  }, []);

  // useEffect(() => {
  //   fetch("http://192.168.8.205:8010/projectConfig")
  //     .then((res) => {
  //       return res.json();
  //     })

  //     .then((data) => {
  //       setState(data);
  //     });
  // }, []);

  return (
    <>
      <div>
        <span>Project Configuration</span>
      </div>
      <br />
      <div className="project_configtable">
        <table>
          <thead>
            <th>No</th>
            <th style={{ textAlign: "left" }}>Project ID</th>
            <th style={{ textAlign: "left" }}>Project Name</th>
            <th>Timezone Source</th>
            <th>Timezone destination</th>
            <th>Lag value</th>
            <th>Connector</th>
            <th>Table</th>
            <th>BLC</th>
            <th>LBT</th>
            <th>ON/OFF</th>
          </thead>
          <tbody>
            {state.map((data, index) => {
              return (
                <Tablerow
                  data={data}
                  changeState={setState}
                  state={state}
                  no={index}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Projectconfigtable;
