import React, { useEffect, useState } from "react";
import "../App.css";
import LineChartAm from "./LineChartAm";
import { getSqlConnections } from "../services/api";

function Mysqlconnection() {
  const [chartData, setchartData] = useState([]);
  const [timeStatus, setTimeStatus] = useState("Last7");

  useEffect(() => {
    getSqlConnections().then((data) => {
      var data1 = data.map((ele) => {
        return { ...ele, timestamp: new Date(ele.timestamp) };
      });
      setchartData(data1);
    });
  }, []);
  // const dateFormatter = (date) => {
  //   return moment(date).format("DD/MM/YY HH:mm");
  // };

  // useEffect(() => {
  //   fetch("http://192.168.8.205:8010/sqlThreads")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       var data1 = data.map((ele) => {
  //         return { ...ele, timestamp: new Date(ele.timestamp) };
  //       });
  //       setchartData(data1);
  //     });
  // }, []);

  var filterchartData = chartData.filter((ele) => {
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
  console.log(filterchartData);
  return (
    <>
      <div className="chart-container" id="driver_sqlChart">
        <br />
        &nbsp;&nbsp;&nbsp;
        <b>MYSQL Connection</b>
        <span
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "end",
          }}
        >
          <select
            className="chart-dropdown2"
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
          </select>
        </span>
        <br />
        <br />
        <LineChartAm
          data={filterchartData}
          id="sqlLineChart"
          ylabel="Sql connections"
          name="SQL Connection"
        />
      </div>
    </>
  );
}

export default Mysqlconnection;
