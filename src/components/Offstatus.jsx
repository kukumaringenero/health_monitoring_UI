import "../App.css";
import moment from "moment";
import BarChart from "./BarChart";
export default function Offstatus({ barData }) {
  var chartData = barData.map((ele) => {
    return { value: 1, color: ele.value, timestamp: ele.timestamp };
  });
  const dateFormatter = (date) => {
    // return moment(date).unix();
    return moment(date).format("DD/MM/YY HH:mm");
  };

  return (
    <div className="chart-container1">
      {/* <br />
      <span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <b>Off Status</b> : Last 24 hrs
      </span> */}
      <BarChart data={chartData} id="componentLagData" />
    </div>
  );
}
