import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Count from "./Count1";
import Counttable from "./Counttable";
import Countblc from "./Countblc";
import Countlbt from "./Countlbt1";

export default function ProjectDetails() {
  const [state, setState] = useState([]);
  useEffect(() => {
    fetch("http://192.168.8.205:8010/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setState(data);
      });
  }, []);
  return (
    <div class="table-header">
      <h3>Project Detail</h3>
      <div class="button-header">
        <span>
          <button>All</button>
        </span>
        <span>
          <button>Connector</button>
        </span>
        <span>
          <button>Table</button>
        </span>
        <span>
          <button>BLC</button>
        </span>
        <span>
          <button>LBT</button>
        </span>
      </div>
      <div class="App">
        <table>
          <thead>
            <th>Component Name</th>
            <th>Component description</th>
            <th>Last Run time</th>
            <th>Lagging</th>
          </thead>
          <tbody>
            {state.map((data) => {
              return (
                <tr>
                  <td>{data.projectSchema}</td>
                  <td>{data.projectName}</td>
                  <td>
                    <Count
                      total={data.connector.total}
                      lagging={data.connector.lagging}
                      off={data.connector.off}
                    />
                  </td>
                  <td>
                    <Counttable
                      total={data.table.total}
                      lagging={data.table.lagging}
                      off={data.table.off}
                    />
                  </td>
                  <td>
                    <Countblc
                      total={data.blc.total}
                      lagging={data.blc.lagging}
                      off={data.blc.off}
                    />
                  </td>
                  <td>
                    <Countlbt
                      total={data.lbt.total}
                      lagging={data.lbt.lagging}
                      off={data.lbt.off}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
