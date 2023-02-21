import { ICellInfo } from "../../App";
import "./LogHoverSquares.css";

interface ILogHoverSquares {
  cellsInfo: ICellInfo[];
}

const LogHoverSquares = ({ cellsInfo }: ILogHoverSquares): JSX.Element => {
  return (
    <div className="squares__container">
      <h2 className="squares__title">Hover squares</h2>
      {cellsInfo.map(({ row, col }, index) => (
        <span className="squares__item" key={index}>
          row {row} col {col}
        </span>
      ))}
    </div>
  );
};

export default LogHoverSquares;
