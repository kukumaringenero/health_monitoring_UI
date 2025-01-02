import React, { useState } from "react";
import { getTotalProject } from "../services/api";
import { useEffect } from "react";

function Totalproject() {
  const [state, setState] = useState("");
  useEffect(() => {
    getTotalProject().then((res) => {
      setState(res);
    });
  }, []);
  // fetch("http://192.168.8.205:8010/projectCount")
  //   .then((res) => {
  //     return res.text();
  //   })
  //   .then((data) => {
  //     console.log(setState(data));
  //   });
  return <div> {state}</div>;
}

export default Totalproject;
