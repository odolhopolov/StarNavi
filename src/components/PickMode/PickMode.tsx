import React, { useState } from "react";
import "./PickMode.css";

interface IPickMode {
  modeNames: string[];
  choseAppMode: (value: string) => void;
}

const PickMode = ({ modeNames, choseAppMode }: IPickMode): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="pick-mode__container">
      <select
        value={selectedValue}
        className="pick-mode__select"
        onChange={(e) => handleSelectChange(e)}
      >
        <option disabled={true} value="">
          Pick mode
        </option>
        {modeNames.map((mode) => (
          <option key={mode} value={mode}>
            {mode}
          </option>
        ))}
      </select>
      <button
        className="pick-mode__button"
        onClick={() => selectedValue && choseAppMode(selectedValue)}
      >
        Start
      </button>
    </div>
  );
};

export default PickMode;
