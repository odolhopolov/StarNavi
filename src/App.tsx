import React, { useState, useEffect } from "react";
import "./App.css";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import LogHoverSquares from "./components/LogHoverSquares/LogHoverSquares";
import PickMode from "./components/PickMode/PickMode";
import SquareTiles from "./components/SquareTiles/SquareTiles";

const DEFAULT_COUNT_OF_FIELD = 0;

export interface IGameMode {
  name: string;
  field: number;
}

export interface ICellInfo {
  row: string | null;
  col: string | null;
}

function App() {
  const [appData, setAppData] = useState<IGameMode[]>([]);
  const [countOfField, setCountOfField] = useState<number>(
    DEFAULT_COUNT_OF_FIELD
  );
  const [cellsInfo, setCellsInfo] = useState<ICellInfo[]>([]);
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
    const selectedMode = appData.filter((mode) => mode.name === nameMode);

    setCountOfField(selectedMode?.[0].field);
  };

  const getCellInfo = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ): void => {
    const target = e.target as HTMLSpanElement;
    const row = target.getAttribute("data-row");
    const col = target.getAttribute("data-col");

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
          countOfField={countOfField}
          handleCellHover={getCellInfo}
        />
      </div>
      {cellsInfo.length !== 0 && <LogHoverSquares cellsInfo={cellsInfo} />}
    </div>
  );
}

export default App;
