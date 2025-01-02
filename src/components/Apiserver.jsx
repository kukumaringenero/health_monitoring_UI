import React, { useEffect, useState } from "react";
import "../App.css";
import { getServer } from "../services/api";
function Apiserver() {
  const [state, setState] = useState("");
  useEffect(() => {
    getServer().then((res) => {
      setState(res);
    });
  }, []);
  // fetch("http://192.168.8.205:8010/server")
  //   .then((res) => {
  //     return res.text();
  //   })
  //   .then((data) => {
  //     console.log(setState(data));
  //   });
  return (
    <div className="Apiserver" id="driver_server">
      {" "}
      {state}{" "}
    </div>
  );
}

export default Apiserver;
