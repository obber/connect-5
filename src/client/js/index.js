import reactDOM from "react-dom";
import React from "react";

import App from "./app";
import CheckAuth from "./wrapper-components/checkAuth";

const AppWithLogin = CheckAuth(App);

reactDOM.render(<AppWithLogin />, document.getElementById("app"));
