import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { mycontext1 } from "../context/Mycontext";
import { mycontext } from "../context/Usecontext";
import { downloadExcel } from "react-export-table-to-excel";
import { Icon } from "@iconify/react";
import { getProjectDetailsModule, getSchemaToProject } from "../services/api";
export default function Module() {
  const [AllData, setAllData] = useState([]);
  const { homepageState, setHomepageState } = useContext(mycontext1);
  const { state, setState } = useContext(mycontext);
  const [mapState, mapSetState] = useState({});

  function handleDownloadExcel() {
    downloadExcel({
      fileName: `Moduledetails`,
      sheet: "Moduledetails-Sheet",
      tablePayload: {
        header,
        body: body,
      },
    });
  }
  useEffect(() => {
    getSchemaToProject().then((data) => {
      mapSetState(data);
    });
  }, []);

  // useEffect(() => {
  //   fetch(`http://192.168.8.205:8010/schemaToProject`)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((mapData) => {
  //       mapSetState(mapData);
  //     });
  // }, []);

  useEffect(() => {
    getProjectDetailsModule(
      state.projectName,
      state.project,
      homepageState.module,
      mapState
    ).then((res) => {
      setAllData(res);
    });
  }, [state, homepageState]);

  // useEffect(() => {
  //   var url = `http://192.168.8.205:8010/projectDetails/${
  //     mapState[state.projectName]
  //   }/${homepageState.module}`;
  //   if (state.project === "all")
  //     url = `http://192.168.8.205:8010/allProjectComponentDetails/${homepageState.module}`;

  //   fetch(url)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setAllData(data);
  //     });
  // }, [state, homepageState]);
  var projectData = AllData.filter(
    (ele) => ele.running_status === homepageState.status
  );
  const handelClick = (data) => {
    if (state.project == "all") return;
    setHomepageState({ ...homepageState, component: data });
  };

  var header = [];
  var body = [];

  if (projectData.length > 0) {
    var ele = projectData[0];
    header = Object.keys(ele);
    body = projectData;
  }
  return (
    <>
      <span className="download-report" onClick={handleDownloadExcel}>
        {" "}
        <Icon icon="ic:baseline-save-alt" />
        <button class="download">Download Report</button>
      </span>
      <select
        className="status-dropdown"
        onChange={(e) => {
          setHomepageState({ ...homepageState, status: e.target.value });
        }}
      >
        <option value="ON" selected={homepageState.status === "ON"}>
          Lagging
        </option>
        <option value="OFF" selected={homepageState.status === "OFF"}>
          Off
        </option>
      </select>
      {projectData.length == 0 ? (
        <span>No data Available</span>
      ) : (
        <div>
          <div class="App">
            <table>
              <thead>
                <th>No</th>
                <th style={{ textAlign: "left" }}>Project Id</th>
                <th style={{ textAlign: "left" }}>Project Name</th>
                <th style={{ textAlign: "left" }}>Component Name</th>
                <th style={{ textAlign: "left" }}>Component description</th>
                <th>Last run time</th>
                <th>Lagging</th>
              </thead>
              <tbody id="projectTable">
                {projectData.map((data, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td style={{ textAlign: "left" }}>
                        {data.projectSchema}
                      </td>
                      <td style={{ textAlign: "left" }}>{data.projectName}</td>
                      <td
                        style={{ textAlign: "left" }}
                        onClick={() => {
                          handelClick(data.componentName);
                        }}
                      >
                        {data.componentName}
                      </td>
                      <td style={{ textAlign: "left" }}>
                        {data.componentDescription}
                      </td>
                      <td>{data.lastRunTime}</td>
                      <td>
                        {" "}
                        <span
                          className="lagvalue"
                          style={{
                            background: data.lag ? "#E19090" : "transparent",
                          }}
                        >
                          {data.lag ? Math.ceil(data.lag) + " hours" : "OFF"}{" "}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
