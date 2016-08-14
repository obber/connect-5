import reactDOM from "react-dom";
import React from "react";

import App from "./app";
import * as auth from "./modules/auth";

reactDOM.render(<App login={auth.loginPromise} />, document.getElementById("app"));
