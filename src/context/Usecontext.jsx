import React, { createContext } from "react";
import { useState } from "react";

var mycontext = createContext();

export default function MyContextProvider({ children }) {
  var initial_config = {
    projectName: "all",
    module: "connector",
    project: "all",
  };

  const [state, setState] = useState(initial_config);
  return (
    <mycontext.Provider value={{ state, setState }}>
      {children}
    </mycontext.Provider>
  );
}

export { mycontext };
