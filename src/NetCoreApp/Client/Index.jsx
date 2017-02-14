import React from "react";
import ReactDom from "react-dom";
import RouteConfig from "./routes/routeConfig";

const preLoadedState = window.__PRELOADED_STATE__;

ReactDom.render(
    <RouteConfig {...preLoadedState}/>,
    document.getElementById("app")
);