import React, { useEffect, useState } from "react";
import "../App.css";
import { getLastUpdatedTime } from "../services/api";
function LastUpdatedTime() {
  const [state, setState] = useState("");
  useEffect(() => {
    getLastUpdatedTime().then((res) => {
      setState(res);
    });
  }, []);
  // fetch("http://192.168.8.205:8010/lastUpdatedTime")
  //   .then((res) => {
  //     return res.text();
  //   })
  //   .then((data) => {
  //     console.log(setState(data));
  //   });
  return (
    <div className="lastupdatedtime" id="last_updated_time">
      Last updated :{state}
    </div>
  );
}

export default LastUpdatedTime;
