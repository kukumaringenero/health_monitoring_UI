import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Landingpage from "./pages/Landingpage";
import Projectpage from "./pages/Projectpage";
import Adminpage from "./pages/Adminpage";
import RootLayout from "./pages/RootLayout";
import "driver.js/dist/driver.css";
function App() {
  return (
    <>
      <main>
        <Routes>
          <Route exact path="/" element={<Landingpage />} />
          <Route path="/Projectpage" element={<Projectpage />} />
          <Route path="/Adminpage" element={<Adminpage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
