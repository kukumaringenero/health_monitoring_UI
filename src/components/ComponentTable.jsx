import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { mycontext1 } from "../context/Mycontext";
import { mycontext } from "../context/Usecontext";
import { Icon } from "@iconify/react";
import Module from "./Module";
import ComponentTableModule from "./ComponentTableModule";

export default function ComponentTable() {
  const { homepageState, setHomepageState } = useContext(mycontext1);
  if (homepageState.module == "all") {
    setHomepageState({ ...homepageState, module: "connector" });
  }

  return (
    <div className="componenttable">
      <div className="table-header">
        <h3>Component Details</h3>
      </div>
      <div className="button-header">
        <span>
          <button
            className={
              homepageState.module === "connector" ? "selectedbutton" : ""
            }
            onClick={() => {
              setHomepageState({ ...homepageState, module: "connector" });
            }}>
            Connector
          </button>
        </span>
        &nbsp;&nbsp;&nbsp;
        <span>
          <button
            className={homepageState.module === "table" ? "selectedbutton" : ""}
            onClick={() => {
              setHomepageState({ ...homepageState, module: "table" });
            }}>
            Table
          </button>
        </span>
        &nbsp;&nbsp;&nbsp;
        <span>
          <button
            className={homepageState.module === "blc" ? "selectedbutton" : ""}
            onClick={() => {
              setHomepageState({ ...homepageState, module: "blc" });
            }}>
            BLC
          </button>
        </span>
        &nbsp;&nbsp;&nbsp;
        <span>
          <button
            className={homepageState.module === "lbt" ? "selectedbutton" : ""}
            onClick={() => {
              setHomepageState({ ...homepageState, module: "lbt" });
            }}>
            LBT
          </button>
        </span>
      </div>
      <ComponentTableModule />
    </div>
  );
}
