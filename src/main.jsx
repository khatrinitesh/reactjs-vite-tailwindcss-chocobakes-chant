import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

//BELOW CODE FOR REDUX

function setScriptSrc(scriptId, src) {
  const script = document.getElementById(scriptId);
  if (script) {
    script.src = src;
  } else {
  }
}

setScriptSrc("hs-script-loader", import.meta.env.VITE_SCRIPT_SRC);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
