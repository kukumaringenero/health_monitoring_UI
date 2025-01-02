import React, { useContext } from "react";
import All from "../components/All";
import { mycontext1 } from "../context/Mycontext";
import Module from "../components/Module";

import { useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { Icon } from "@iconify/react";
export default function Projectdetails() {
  const { homepageState, setHomepageState } = useContext(mycontext1);

  return (
    <>
      <div className="project-table" id="driver_table">
        <div class="table-header">
          <h4>Project Details</h4>
        </div>
        <div class="button-header">
          <span>
            <button
              className={homepageState.module === "all" ? "selectedbutton" : ""}
              onClick={() => {
                setHomepageState({ ...homepageState, module: "all" });
              }}
            >
              All
            </button>
          </span>
          &nbsp;&nbsp;&nbsp;
          <span>
            <button
              className={
                homepageState.module === "connector" ? "selectedbutton" : ""
              }
              onClick={() => {
                setHomepageState({ ...homepageState, module: "connector" });
              }}
            >
              Connector
            </button>
          </span>
          &nbsp;&nbsp;&nbsp;
          <span>
            <button
              className={
                homepageState.module === "table" ? "selectedbutton" : ""
              }
              onClick={() => {
                setHomepageState({ ...homepageState, module: "table" });
              }}
            >
              Table
            </button>
          </span>
          &nbsp;&nbsp;&nbsp;
          <span>
            <button
              className={homepageState.module === "blc" ? "selectedbutton" : ""}
              onClick={() => {
                setHomepageState({ ...homepageState, module: "blc" });
              }}
            >
              BLC
            </button>
          </span>
          &nbsp;&nbsp;&nbsp;
          <span>
            <button
              className={homepageState.module === "lbt" ? "selectedbutton" : ""}
              onClick={() => {
                setHomepageState({ ...homepageState, module: "lbt" });
              }}
            >
              LBT
            </button>
          </span>
        </div>
        {homepageState.module === "all" ? <All /> : <Module />}
      </div>
    </>
  );
}
