import React from "react";
import Tile from "./tileComponent";

const Row = ({ rowData, rowIndex, turn, last }) => {
  const evenOrOdd = rowIndex % 2 === 0 ? "board-row-even" : "board-row-odd";

  return (
    <div className={`board-row ${evenOrOdd}`}>
      {rowData.map((tile, columnIndex) => {
        return <Tile
          tile={tile}
          key={columnIndex}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          turn={turn}
          last={last} />;
      })}
    </div>
  );
};

export default Row;
