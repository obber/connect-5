import reactDOM from "react-dom";
import React from "react";
import Board from "./components/boardComponent";

const data = (new Array(361)).fill(0).map((_, i) => {
  return i;
});

const Comp = () => {
  return (<div>
    <h1>Hello world!</h1>
    <Board info={data} />
  </div>);
};

reactDOM.render(<Comp />, document.getElementById("app"));
