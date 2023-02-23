import CellOfTiles from "../CellOfTiles/CellOfTiles";
import "./SquareTiles.css";

const COUNT_OF_COLUMNS = 5;

interface ISquareTiles {
  countOfField: number;
  handleCellHover: (row: number, col: number, cellNum: number) => void;
  selectedCells: number[];
}

const SquareTiles = ({
  countOfField,
  handleCellHover,
  selectedCells,
}: ISquareTiles): JSX.Element => {
  const countOfRows = Math.ceil(countOfField / 5);

  const buildRowsOfTiles = () => {
    let rows = [];

    for (let i = 1; i <= countOfRows; i++) {
      rows.push(
        <div key={i} className="square-tiles__row">
          {buildColumnsOfTiles(i)}
        </div>
      );
    }

    return rows;
  };

  const buildColumnsOfTiles = (i: number) => {
    let columns = [];

    for (let j = 1; j <= COUNT_OF_COLUMNS; j++) {
      const cellNum = i * 5 + j;
      columns.push(
        <CellOfTiles
          key={cellNum}
          cellNum={cellNum}
          row={i}
          col={j}
          isHovered={selectedCells.includes(cellNum)}
          handleHover={handleCellHover}
        />
      );
    }

    return columns;
  };

  return <div className="square-tiles__container">{buildRowsOfTiles()}</div>;
};

export default SquareTiles;
