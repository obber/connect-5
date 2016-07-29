import reactDOM from 'react-dom';
import React from 'react';
import Board from './components/boardComponent';

var data = (new Array(361)).fill(0).map((_, i) => {
  return i;
});

var Comp = () => {
  return (<div>
    <Board info={data} />
  </div>);
}

reactDOM.render(<Comp />, document.getElementById("app"));
