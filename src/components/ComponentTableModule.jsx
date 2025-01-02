import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { mycontext1 } from "../context/Mycontext";
import { mycontext } from "../context/Usecontext";
import { downloadExcel } from "react-export-table-to-excel";
import { Icon } from "@iconify/react";
import { getProjectModuleDetail } from "../services/api";

export default function ComponentTableModule() {
  const [AllData, setAllData] = useState([]);
  const { homepageState, setHomepageState } = useContext(mycontext1);
  const { state, setState } = useContext(mycontext);
  const [status, setStatus] = useState("ON");
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };
  function handleDownloadExcel() {
    downloadExcel({
      fileName: `Projectdetail`,
      sheet: "Projectdetail-Sheet",
      tablePayload: {
        header,
        body: body,
      },
    });
  }

  useEffect(() => {
    getProjectModuleDetail(state.project, homepageState.module).then((data) => {
      setAllData(data);
    });
  }, [state, homepageState]);

  // useEffect(() => {
  //   var url = `http://192.168.8.205:8010/projectDetails/${state.project}/${homepageState.module}`;
  //   if (homepageState.module === "all")
  //     url = `http://192.168.8.205:8010/projectDetails/${state.project}/connector`;

  //   fetch(url)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setAllData(data);
  //     });
  // }, [state, homepageState]);
  var projectData = AllData.filter((ele) => ele.running_status === status);
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
        <Icon icon="ic:baseline-save-alt" />
        <button class="download">Download Report</button>
      </span>
      <select
        className="status-dropdown"
        onChange={(e) => {
          setStatus(e.target.value);
        }}>
        <option value="ON" selected={status === "ON"}>
          Lagging
        </option>
        <option value="OFF" selected={status === "OFF"}>
          Off
        </option>
      </select>
      {projectData.length == 0 ? (
        <span>No data Available</span>
      ) : (
        <div class="table">
          <table>
            <thead>
              <th>No</th>
              <th>Component Name</th>
              <th>Component description</th>
              <th>Last run time</th>
              <th>Lagging</th>
            </thead>
            <tbody>
              {projectData.map((data, index) => {
                return (
                  <tr
                    key={index}
                    className={selectedRow === index ? "selected" : ""}
                    onClick={() => handleRowClick(index)}>
                    <td>{index + 1}</td>
                    <td
                      onClick={() => {
                        handelClick(data.componentName);
                      }}>
                      {data.componentName}
                    </td>
                    <td>{data.componentDescription}</td>
                    <td>{data.lastRunTime}</td>
                    <td>
                      {" "}
                      <span
                        className="lagvalue"
                        style={{
                          background: data.lag ? "#E19090" : "transparent",
                        }}>
                        {data.lag ? Math.ceil(data.lag) + " hours" : "OFF"}{" "}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
