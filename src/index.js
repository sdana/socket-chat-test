import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import Nutshell from "./Nutshell";

ReactDOM.render(
  <Router>
    <Nutshell />
  </Router>,
  document.querySelector("#root")
);

registerServiceWorker();
