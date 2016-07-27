import reactDOM from 'react-dom';
import React from 'react';

var Comp = () => {
  return (<div>
    <h1>Hello React!</h1>
  </div>);
}

reactDOM.render(<Comp />, document.getElementById("app"));
