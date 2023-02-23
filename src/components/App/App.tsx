import React, { useState, useEffect } from "react";
import "./App.css";
import ErrorPage from "../ErrorPage/ErrorPage";
import LogHoverSquares from "../LogHoverSquares/LogHoverSquares";
import PickMode from "../PickMode/PickMode";
import SquareTiles from "../SquareTiles/SquareTiles";

const DEFAULT_COUNT_OF_FIELD = 0;

export interface IGameMode {
  name: string;
  field: number;
}

export interface ICellInfo {
  row: number;
  col: number;
}

function App() {
  const [appData, setAppData] = useState<IGameMode[]>([]);
  const [count, setCount] = useState<number>(DEFAULT_COUNT_OF_FIELD);
  const [cellsInfo, setCellsInfo] = useState<ICellInfo[]>([]);
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchAppMode(): Promise<void> {
      try {
        await fetch("http://demo7919674.mockable.io")
          .then((response) => response.json() as Promise<IGameMode[]>)
          .then((data) => setAppData(data));
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
    }
    fetchAppMode();
  }, []);

  const modeNames = appData.map((mode) => mode.name);

  const getCountOfFieldSelectedMode = (nameMode: string): void => {
    const [{ field }] = appData.filter((mode) => mode.name === nameMode);

    setCount(field);
  };

  const handleCellHover = (row: number, col: number, cellNum: number): void => {
    if (selectedCells.includes(cellNum)) {
      const filteredSelectedCells = selectedCells.filter(
        (selectedCell) => selectedCell !== cellNum
      );

      setSelectedCells(filteredSelectedCells);
    } else {
      setSelectedCells([...selectedCells, cellNum]);
    }

    setCellsInfo([
      {
        row,
        col,
      },
      ...cellsInfo,
    ]);
  };

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className="main__container">
      <div className="main__wrapper">
        <PickMode
          modeNames={modeNames}
          choseAppMode={getCountOfFieldSelectedMode}
        />
        <SquareTiles
          countOfField={count}
          handleCellHover={handleCellHover}
          selectedCells={selectedCells}
        />
      </div>
      {cellsInfo.length !== 0 && <LogHoverSquares cellsInfo={cellsInfo} />}
    </div>
  );
}

export default App;
