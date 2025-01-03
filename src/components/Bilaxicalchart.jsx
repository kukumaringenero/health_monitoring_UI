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
import CanvasJSReact from '@canvasjs/react-charts';
import {format} from 'date-fns'

function Bilaxicalchart() {
  const [ramData, setRamData] = useState([]);

  const [cpuData, setCpuData] = useState([]);
  const [status, setStatus] = useState("");
  const [timeStatus, setTimeStatus] = useState("Last7");
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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

  const options = {
    animationEnabled: true,
    // exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    height: 300, // Set chart height
    axisY: {
      title: "RAM (GB)",
      suffix: "",
      labelFontSize: 14,
      titleFontSize: 16
    },
    axisY2: {
      title: "CPU (%)",
      suffix: "",
      lineColor: "#C0504E",
      labelFontSize: 14,
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
      showInLegend: true,
      name: "RAM (GB)",
      dataPoints:ramData.map(item => ({
        x: item.timestamp,
        y: item.value,
        toolTipContent: format(item.timestamp,'yyyy-MM-dd hh:mm')+` : {y} GB`
      }))
      
    },{
      type: "line",
      showInLegend: true,
      name: "CPU (%)",
      axisYType: "secondary",
      dataPoints:cpuData.map(item => ({
        x: item.timestamp,
        y: item.value,
        toolTipContent: format(item.timestamp,'yyyy-MM-dd hh:mm')+` : {y} %`
      }))

    }]
  }

  const containerProps = {
    width: "94%", // Full width
  }



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
        {/* <BiAxialAmChart data1={filterchartData} data2={filterchartData} /> */}
        <CanvasJSChart options = {options} containerProps={containerProps} />
      </div>
    </>
  );
}

export default Bilaxicalchart;
