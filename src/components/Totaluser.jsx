import React, { useState } from "react";
import { getTotalUser } from "../services/api";
import { useEffect } from "react";

function Totaluser() {
  const [state, setState] = useState("");
  useEffect(() => {
    getTotalUser().then((res) => {
      setState(res);
    });
  }, []);

  // fetch("http://192.168.8.205:8010/userCount")
  //   .then((res) => {
  //     return res.text();
  //   })
  //   .then((data) => {
  //     console.log(setState(data));
  //   });
  return <div>{state}</div>;
}

export default Totaluser;
