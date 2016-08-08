import React from "react";
// import indexToTileId from "../modules/indexToTileId";

const Tile = ({tile}) => {
  return (
    <div className="board-tile">
      {tile}
    </div>
  );
};

export default Tile;
