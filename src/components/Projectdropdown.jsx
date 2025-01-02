import React, { useState, useEffect, useContext } from "react";
import { mycontext } from "../context/Usecontext";
import { useNavigate } from "react-router-dom";
import { mycontext1 } from "../context/Mycontext";
import { getProjectDropdown, getSchemaToProject } from "../services/api";
import { themeContext } from "../context/ThemeContext";
export default function Projectdropdown() {
  const { theme, setTheme } = useContext(themeContext);
  const [selects, setSelects] = useState([]);
  const [selected, setSelected] = useState([]);
  const { state, setState } = useContext(mycontext);
  const { homepageState, setHomepageState } = useContext(mycontext1);

  const [mapState, setMapState] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getSchemaToProject().then((data) => {
      setMapState(data);
    });
  }, []);

  // useEffect(() => {
  //   fetch("http://192.168.8.205:8010/schemaToProject")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setMapState(data);
  //     });
  // }, []);

  useEffect(() => {
    getProjectDropdown().then((data) => {
      setSelects(data);
    });
  }, []);

  // useEffect(() => {
  //   fetch("http://192.168.8.205:8010/projectDropdown")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setSelects(data);
  //     });
  // }, []);

  return (
    <div class="custom-select projectdropdown" id="project_dropdown">
      <select
        id="myDropdown"
        className="projectdropdown"
        onChange={(e) => {
          setSelected(e.target.value);
          setState({
            ...state,
            projectName: e.target.value,
            project: mapState[e.target.value],
          });
          setHomepageState({ ...homepageState, module: "connector" });
          if (e.target.value != "all") {
            navigate("/Projectpage");
          } else {
            setState({
              projectName: "all",
              module: "connector",
              project: "all",
            });
            setHomepageState({ ...homepageState, module: "all" });
            navigate("/");
          }
        }}
      >
        <option className="all" value="all" selected={state.project === "all"}>
          All Projects
        </option>
        {selects.map((dropdownEle) => {
          return (
            <option
              value={dropdownEle}
              className="dropdownele"
              selected={state.projectName === dropdownEle}
            >
              {" "}
              {dropdownEle}
            </option>
          );
        })}
      </select>
    </div>
  );
}
