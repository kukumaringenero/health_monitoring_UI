import React, { useEffect, useState } from "react";
import "../App.css";
import LineChartAm from "./LineChartAm";
import { getSqlConnections } from "../services/api";
import CanvasJSReact from '@canvasjs/react-charts';
import { format } from 'date-fns';

function Mysqlconnection() {

  const [chartData, setchartData] = useState([]);
  const [timeStatus, setTimeStatus] = useState("Last7"); 
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  useEffect(() => {
    getSqlConnections().then((data) => {
      var data1 = data.map((ele) => {
        return { ...ele, timestamp: new Date(ele.timestamp) };
      });
      setchartData(data1);
    });
  }, []);


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
  // console.log(filterchartData);
  const options = {
    animationEnabled: true,
    // exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    height: 300, // Set chart height
    axisY: {
      title: "Number of connections",
      suffix: "",
      labelFontSize: 14, // Set font size for Y-axis labels
      titleFontSize: 16
    },
    axisX: {
      title: "Time",
      prefix: "",
      valueFormatString: "MMM DD HH:MM", // Format date
      intervalType: "hour",
      labelFontSize: 14, // Set font size for Y-axis labels
      titleFontSize: 16
    },
    data: [{
      type: "line",
      // toolTipContent: "{x}: {y} connections",
      dataPoints:filterchartData.map(item => ({
        x: item.timestamp,
        y: item.value,
        toolTipContent: format(item.timestamp,'yyyy-MM-dd hh:mm')+` : ${item.value} connections` 
      }))
      
    }]
  }

  const containerProps = {
    width: "94%", // Full width
  }
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
        {/* <LineChartAm
          data={filterchartData}
          id="sqlLineChart"
          ylabel="Sql connections"
          name="SQL Connection"
        /> */}
        <CanvasJSChart options = {options} containerProps={containerProps} />
      </div>
    </>
  );
}

export default Mysqlconnection;
