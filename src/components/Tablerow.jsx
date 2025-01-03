import React, { useState } from "react";
import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import {BASE_URL, putTimeZone} from '../services/api'

function Tablerow({ timezones,data, changeState, no }) {
  /*
       Change the base url for different server 
  */ const { theme, setTheme } = useContext(themeContext);
  const [checkState, setCheckState] = useState({
    connector: data.connector,

    blc: data.blc,

    lbt: data.lbt,

    overall: data.overall,

    tables: data.tables,

    lag: data.lag,
  });

  async function putData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    return response.json();
  }

  const handelChange = (e, data, module) => {
    if (module === "overall") {
      var status = checkState.overall === 1 ? 0 : 1;

      var newState = {
        connector: status,

        blc: status,

        lbt: status,

        overall: status,

        tables: status,
      };
    } else if (module === "lag") {
      newState = {
        ...checkState,

        lag: e.target.value,
      };
    } else {
      newState = {
        ...checkState,

        [module]: !checkState[`${module}`] ? 1 : 0,
      };
    }

    setCheckState(newState);

    putData(`${BASE_URL}/projectConfig/${data.project}`, {
      ...data,

      ...newState,
    }).then((data) => {
      console.log(data);
    });
  };
const handelTimeChange=(e,type,project)=>{
  let tzSelected=e.target.value
  putTimeZone(tzSelected,type,project).then((res)=>{
    console.log(res)
  }).catch((err)=>{
    console.log(err)
  })

}
  return (
    <tr
      style={{
        color:
          theme == "dark"
            ? checkState.overall === 0
              ? "grey"
              : "white"
            : checkState.overall === 0
            ? "grey"
            : "black",
      }}
    >
      <td>{no + 1}</td>
      <td style={{ textAlign: "left" }}>{data.project}</td>

      <td style={{ textAlign: "left" }}>{data.projectDescription}</td>

      <td>
        <select name="source_timezone" id="source_timezone" onChange={(e)=>{
        handelTimeChange(e,"source",data.project)
      }}>
           { timezones.map((tz)=>{
             return <option value={tz} selected={tz==data.timezoneSource}  >{tz}</option>
           })}
        
        </select></td>

        <td>
        <select name="source_timezone" id="source_timezone" onChange={(e)=>{
        handelTimeChange(e,"destination",data.project)
      }}>
           { timezones.map((tz)=>{
             return <option value={tz} selected={tz==data.timezoneDestination}  >{tz}</option>
           })}
        
        </select></td>

      <td>
        <input
          type="number"
          name="Lag"
          onChange={(e) => {
            handelChange(e, data, "lag");
          }}
          placeholder={data.lag}
        />
        &nbsp;
      </td>

      <td>
        <label class="container">
          <input
            type="checkbox"
            className="overall-checkbox"
            name="connector"
            checked={checkState.connector}
            onChange={(e) => {
              handelChange(e, data, "connector");
            }}
            disabled={checkState.overall === 0}
          />
          <span className="checkmark"></span>
          &nbsp;
        </label>
      </td>

      <td>
        <label class="container">
          <input
            type="checkbox"
            name="table"
            className="overall-checkbox"
            checked={checkState.tables}
            onChange={(e) => {
              handelChange(e, data, "tables");
            }}
            disabled={checkState.overall === 0}
          />
          <span className="checkmark"></span>
          &nbsp;
        </label>
      </td>

      <td>
        <label class="container">
          <input
            type="checkbox"
            name="blc"
            className="overall-checkbox"
            checked={checkState.blc}
            onChange={(e) => {
              handelChange(e, data, "blc");
            }}
            disabled={checkState.overall === 0}
          />
          <span className="checkmark"></span>
          &nbsp;
        </label>
      </td>

      <td>
        <label class="container">
          <input
            type="checkbox"
            name="Lbt"
            className="overall-checkbox"
            checked={checkState.lbt}
            onChange={(e) => {
              handelChange(e, data, "lbt");
            }}
            disabled={checkState.overall === 0}
          />
          <span className="checkmark"></span>
          &nbsp;
        </label>
      </td>

      <td>
        <label class="switch toggle">
          <input
            type="checkbox"
            name="overall"
            checked={checkState.overall}
            onChange={(e) => {
              handelChange(e, data, "overall");
            }}
          />
          <span class="slider"></span>
          <span class="labels" data-on="ON" data-off="OFF"></span>
        </label>
      </td>
    </tr>
  );
}

export default Tablerow;
