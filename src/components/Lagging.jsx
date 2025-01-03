import React, { useEffect, useState } from "react";
import "../App.css";
import moment from "moment";
import { mycontext } from "../context/Usecontext";
import { useContext } from "react";
import Offstatus from "../components/Offstatus";
import { mycontext1 } from "../context/Mycontext";
import LineChartAm from "../components/LineChartAm";
import {
  getAllProjectComponentDetails,
  getComponentLagData,
} from "../services/api";
import CanvasJSReact from '@canvasjs/react-charts';
import { format } from 'date-fns';

function Lagging() {
  const [chartData, setchartData] = useState([]);
  const [componentList, setcomponentList] = useState([]);
  const [component, setcomponent] = useState("");
  const { state, setState } = useContext(mycontext);
  const { homepageState, setHomepageState } = useContext(mycontext1);
  const [timeStatus, setTimeStatus] = useState("Last1");
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;


  useEffect(() => {
    getAllProjectComponentDetails(homepageState.module).then((data) => {
      var temp = data.filter((ele) => ele.projectSchema === state.project);
      temp = temp.map((ele) => ele.componentName);
      setcomponentList(temp);
      if (temp.length) {
        setcomponent(temp[0]);
        setHomepageState({ ...homepageState, component: temp[0] });
      }
    });
    return () => {};
  }, [homepageState.module, state.project]);

  useEffect(() => {
    if (homepageState.component) {
      getComponentLagData(state.project, homepageState.component).then(
        (data) => {
          var data1 = data.map((ele) => {
            return {
              value: Math.round(ele.value * 100) / 100,
              timestamp: new Date(ele.timestamp),
            };
          });
          setchartData(data1);
        }
      );
    }
    return () => {};
  }, [state.project, homepageState.component]);


  var filterchartData = chartData.filter((ele) => {
    var timestamp = new Date(ele.timestamp);
    var curr = new Date();
    if (timeStatus === "Last1") {
      curr.setDate(curr.getDate() - 1);
    } else {
      curr.setDate(curr.getDate() - 7);
    }
    return timestamp >= curr;
  });

  var filteredBarData = chartData.filter((ele) => {
    var timestamp = new Date(ele.timestamp);
    var curr = new Date();
    curr.setDate(curr.getDate() - 1);
    return timestamp >= curr;
  });

  const options = {
    animationEnabled: true,
    // exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    height: 200, // Set chart height
    axisY: {
      title: "Lag (Hours)",
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
        toolTipContent: format(item.timestamp,'yyyy-MM-dd hh:mm')+` : ${item.value} hours` 
      }))
      
    }]
  }
  const options_bar_graph = {
    animationEnabled: true,
    // exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    height: 200, // Set chart height
    axisY: {
      title: "Lag (Hours)",
      suffix: "",
      labelFontSize: 14, // Set font size for Y-axis labels
      titleFontSize: 16,
      minimum: 0,
      maximum: 1,
      interval:1
  
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
      type: "column",
      // toolTipContent: "{x}: {y} connections",
      dataPoints:filteredBarData.map(item => ({
        x: item.timestamp,
        y:1,
        toolTipContent: format(item.timestamp,'yyyy-MM-dd hh:mm')
        ,color:item.value==0?"#e19090":"#8dae8a"
      }))
      
    }]
  }

  const containerProps = {
    width: "94%", // Full width
  }



  // filterchartData.reverse();
  return filterchartData.length == 0 || filteredBarData == 0 ? (
    <span>No data Available</span>
  ) : (
    <>
      <div>
        {chartData && chartData.length > 0 && (
          <div className="charts">
            <div className="chart-container" style={{ height: "20em" }}>
              <br /> &nbsp;&nbsp;&nbsp;&nbsp;
              <b>Lagging</b>
              <span
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "end",
                }}>
                <select
                  className="chart-dropdown"
                  onChange={(e) => {
                    setTimeStatus(e.target.value);
                  }}>
                  <option value="Last1" selected={timeStatus === "Last1"}>
                    Last 24 hrs
                  </option>
                  <option value="Last7" selected={timeStatus === "Last7"}>
                    Last 7 Days
                  </option>
                </select>
                <select
                  className="chart-componentdropdown"
                  onChange={(e) => {
                    setcomponent(e.target.value);
                    setHomepageState({
                      ...homepageState,
                      component: e.target.value,
                    });
                  }}>
                  {componentList.map((ele) => {
                    return <option value={ele}>{ele}</option>;
                  })}
                </select>
              </span>
              <br />
              <br />
              {/* <LineChartAm
                data={filterchartData}
                id="componenLagTrend"
                ylabel="Lag (hours)"
                name="Lag (hours)"
              /> */}
           <CanvasJSChart options = {options} containerProps={containerProps} />

            </div>
            <div className="chart-container1" style={{ height: "17.5em" }}>
              <br />
              <span
                style={{
                  display: "flex",
                  alignItems: "baseline",
                }}>
                &nbsp;&nbsp;&nbsp;
                <b>Running Status</b> : Last 24 hours
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <p id="rectangle_One"></p>&nbsp;On&nbsp;&nbsp;&nbsp;
                <p id="rectangle_two"></p>
                &nbsp;Off&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              {/* <Offstatus barData={filteredBarData} /> */}
              <CanvasJSChart options = {options_bar_graph} containerProps={containerProps} />
            </div>
          </div>
        )}{" "}
      </div>
    </>
  );
}

export default Lagging;
