// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <main>
        <Outlet /> {/* The matched route components will be rendered here */}
      </main>
      <br />
      <br />
    </div>
  );
}

export default App;
