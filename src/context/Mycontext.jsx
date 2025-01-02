import React, { createContext } from "react";
import { useState } from "react";

var mycontext1 = createContext();

export default function ProjectContextProvider({ children }) {
  var initial_config = {
    module: "all",
    component: "",
    status: "ON",
  };

  const [homepageState, setHomepageState] = useState(initial_config);
  return (
    <mycontext1.Provider value={{ homepageState, setHomepageState }}>
      {children}
    </mycontext1.Provider>
  );
}

export { mycontext1 };
