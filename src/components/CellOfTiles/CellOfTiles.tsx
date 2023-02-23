interface ICellOfTiles {
  row: number;
  col: number;
  cellNum: number;
  isHovered: boolean;
  handleHover: (row: number, col: number, cellNum: number) => void;
}

const CellOfTiles = ({
  row,
  col,
  cellNum,
  isHovered,
  handleHover,
}: ICellOfTiles): JSX.Element => {
  return (
    <span
      className={isHovered ? "square active" : "square"}
      onMouseEnter={() => handleHover(row, col, cellNum)}
    />
  );
};

export default CellOfTiles;
