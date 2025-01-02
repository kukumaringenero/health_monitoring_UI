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

function Lagging() {
  const [chartData, setchartData] = useState([]);
  const [componentList, setcomponentList] = useState([]);
  const [component, setcomponent] = useState("");

  const { state, setState } = useContext(mycontext);
  const { homepageState, setHomepageState } = useContext(mycontext1);
  console.log(state);

  const [timeStatus, setTimeStatus] = useState("Last1");

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

  // useEffect(() => {
  //   var url = `http://192.168.8.205:8010/allProjectComponentDetails/connector`;
  //   if (homepageState.module != "all")
  //     url = `http://192.168.8.205:8010/allProjectComponentDetails/${homepageState.module}`;

  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       var temp = data.filter((ele) => ele.projectSchema === state.project);
  //       temp = temp.map((ele) => ele.componentName);
  //       setcomponentList(temp);
  //       if (temp.length) {
  //         setcomponent(temp[0]);
  //         setHomepageState({ ...homepageState, component: temp[0] });
  //       }
  //     });
  //   return () => {
  //     // setcomponent("");
  //     // setchartData([]);
  //   };
  // }, [homepageState.module, state.project]);

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

  // useEffect(() => {
  //   if (homepageState.component) {
  //     fetch(
  //       `http://192.168.8.205:8010/componentLagData/${state.project}/${homepageState.component}`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         var data1 = data.map((ele) => {
  //           return {
  //             value: Math.round(ele.value * 100) / 100,
  //             timestamp: new Date(ele.timestamp),
  //           };
  //         });
  //         setchartData(data1);
  //       })
  //       .catch(() => {
  //         console.log("bad request");
  //       });
  //   }
  //   return () => {
  //     // setchartData([]);
  //     // setcomponent("");
  //   };
  // }, [state.project, homepageState.component]);

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
              <LineChartAm
                data={filterchartData}
                id="componenLagTrend"
                ylabel="Lag (hours)"
                name="Lag (hours)"
              />
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
              <Offstatus barData={filteredBarData} />
            </div>
          </div>
        )}{" "}
      </div>
    </>
  );
}

export default Lagging;
