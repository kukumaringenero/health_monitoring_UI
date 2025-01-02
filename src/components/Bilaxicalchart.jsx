import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import "../App.css";
import BiAxialAmChart from "./BiAxialAmChart";
import { getCpuUtilizaton, getRamUtilization } from "../services/api";

function Bilaxicalchart() {
  const [ramData, setRamData] = useState([]);

  const [cpuData, setCpuData] = useState([]);
  const [status, setStatus] = useState("");
  const [timeStatus, setTimeStatus] = useState("Last7");

  useEffect(() => {
    getRamUtilization().then((data) => {
      var data1 = data.map((ele) => {
        return {
          value: Math.floor(ele.value),
          timestamp: new Date(ele.timestamp),
        };
      });
      setRamData(data1);

      getCpuUtilizaton().then((data) => {
        var data1 = data.map((ele) => {
          return {
            value: Math.floor(ele.value),
            timestamp: new Date(ele.timestamp),
          };
        });
        setCpuData(data1);
      });
    });
  }, []);

  // useEffect(() => {
  //   fetch("http://192.168.8.205:8010/ramUtilization")
  //     .then((res) => res.json())

  //     .then((data) => {
  //       var data1 = data.map((ele) => {
  //         return {
  //           value: Math.floor(ele.value),
  //           timestamp: new Date(ele.timestamp),
  //         };
  //       });
  //       setRamData(data1);
  //     });

  //   fetch("http://192.168.8.205:8010/cpuUtilization")
  //     .then((res) => res.json())

  //     .then((data) => {
  //       var data1 = data.map((ele) => {
  //         return { ...ele, timestamp: new Date(ele.timestamp) };
  //       });
  //       setCpuData(data1);
  //     });
  // }, []);

  var tempdata = [];

  for (var i = 0; i < ramData.length && i < cpuData.length; i++) {
    tempdata.push({
      timestamp: ramData[i].timestamp,

      Ram: ramData[i].value,

      Cpu: cpuData[i].value,
    });
  }

  var filterchartData = tempdata.filter((ele) => {
    var timestamp = new Date(ele.timestamp);
    var curr = new Date();
    if (timeStatus === "Last7") {
      curr.setDate(curr.getDate() - 7);
    } else {
      curr.setDate(curr.getDate() - 24);
    }
    return timestamp >= curr;
  });

  filterchartData.reverse();
  return (
    <>
      <div className="chart-container" id="driver_ramChart">
        <br /> &nbsp;&nbsp;&nbsp;
        <b>RAM & CPU Utilization</b>
        <span
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "end",
          }}
        >
          <select
            className="chart-dropdown1"
            onChange={(e) => {
              setTimeStatus(e.target.value);
            }}
          >
            <option value="Last7" selected={timeStatus === "Last7"}>
              Last 7 Days
            </option>
            <option value="Last24" selected={timeStatus === "Last24"}>
              Last 24 Days
            </option>
          </select>{" "}
        </span>
        <br />
        <br />
        <BiAxialAmChart data1={filterchartData} data2={filterchartData} />
      </div>
    </>
  );
}

export default Bilaxicalchart;
