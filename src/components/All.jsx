import React, { useEffect, useState } from "react";
import Count from "./Count1";
import Counttable from "./Counttable";
import Countblc from "./Countblc";
import Countlbt from "./Countlbt1";
import { downloadExcel } from "react-export-table-to-excel";
import { Icon } from "@iconify/react";
import { getAllProjectDetails } from "../services/api";
export default function All() {
  const [state, setState] = useState([]);

  function handleDownloadExcel() {
    downloadExcel({
      fileName: `Allprojectdetails`,
      sheet: "Allprojectdetails-Sheet",
      tablePayload: {
        header,
        body: body,
      },
    });
  }

  useEffect(() => {
    getAllProjectDetails().then((data) => setState(data));
  }, []);

  // useEffect(() => {
  //   fetch("http://192.168.8.205:8010/allProjectDetails")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setState(data);
  //     });
  // }, []);

  var header = [];
  var body = [];

  if (state.length > 0) {
    var ele = state[0];
    header = Object.keys(ele);
    body = state.map((ele) => {
      return {
        ...ele,
        connector: `total-${ele.connector.total} lag-${ele.connector.lagging} off-${ele.connector.off}`,
        lbt: `total-${ele.lbt.total} lag-${ele.lbt.lagging} off-${ele.lbt.off}`,
        blc: `total-${ele.blc.total} lag-${ele.blc.lagging} off-${ele.blc.off}`,
        table: `total-${ele.table.total} lag-${ele.table.lagging} off-${ele.table.off}`,
      };
    });
  }
  return (
    <>
      <span className="download-report" onClick={handleDownloadExcel}>
        {" "}
        <Icon icon="ic:baseline-save-alt" />
        <button class="download">Download Report</button>
      </span>
      <div class="App">
        <table>
          <thead>
            <th>No</th>
            <th style={{ textAlign: "left" }}>Project ID</th>
            <th style={{ textAlign: "left" }}>Project Name</th>
            <th>Connector</th>
            <th>Table</th>
            <th>BLC</th>
            <th>LBT</th>
          </thead>
          <tbody id="projectTable">
            {state.map((data, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td style={{ textAlign: "left" }}>{data.projectSchema}</td>
                  <td style={{ textAlign: "left" }}>{data.projectName}</td>
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
    </>
  );
}
