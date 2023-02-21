import "./SquareTiles.css";

const COUNT_OF_COLUMNS = 5;

interface ISquareTiles {
  countOfField: number;
  handleCellHover: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const SquareTiles = ({
  countOfField,
  handleCellHover,
}: ISquareTiles): JSX.Element => {
  const countOfRows = Math.ceil(countOfField / 5);

  const colorCell = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.target as HTMLSpanElement;

    if (target.classList.contains("active") === true) {
      target.classList.remove("active");
    } else {
      target.classList.add("active");
    }

    handleCellHover(e);
  };

  const buildRowsOfTiles = () => {
    let rows = [];

    for (let i = 0; i < countOfRows; i++) {
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

    for (let j = 0; j < COUNT_OF_COLUMNS; j++) {
      columns.push(
        <span
          data-row={i + 1}
          data-col={j + 1}
          key={j}
          className="square"
          onMouseEnter={(e) => colorCell(e)}
        />
      );
    }

    return columns;
  };

  return <div className="square-tiles__container">{buildRowsOfTiles()}</div>;
};

export default SquareTiles;
