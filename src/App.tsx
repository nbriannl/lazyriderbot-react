import { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import './styles/App.scss';
import { BsArrowDownShort } from 'react-icons/bs';
import { FcRotateToLandscape, FcRotateToPortrait } from 'react-icons/fc';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import MainDisplay from './components/MainDisplay/index';

interface PickStartStationProps {
  startStationInput: string;
  setInputAndStation: (value: string) => void;
}

const stations = ['Yishun', 'Sembawang', 'Canberra', 'Bishan', 'Orchard', 'Somerset'];

const PickStartStation = ({ startStationInput, setInputAndStation }: PickStartStationProps) => {
  const renderOption = (station: string) => {
    return <option key={station} value={station} />;
  };

  return (
    <>
      <input
        list="start-station" name="start-stations" id="start-stations"
        placeholder="From"
        value={startStationInput}
        onChange={e => {
          setInputAndStation(e.target.value);
        }}
      />
      <datalist id="start-station">
        {stations.map(renderOption)}
      </datalist>
    </>
  );
};

interface PickEndStationProps {
  endStationInput: string;
  setInputAndStation: (value: string) => void;
}

const PickEndStation = ({ endStationInput, setInputAndStation }: PickEndStationProps) => {
  const renderOption = (station: string) => {
    return <option key={station} value={station} />;
  };

  return (
    <>
      <input
        list="end-station" name="end-stations" id="end-stations"
        placeholder="To"
        value={endStationInput}
        onChange={e => {
          setInputAndStation(e.target.value);
        }}
      />
      <datalist id="end-station">
        {stations.map(renderOption)}
      </datalist>
    </>
  );
};


const App = (): ReactElement => {
  const [startStationInput, setStartStationInput] = useState('');
  const [startStation, setStartStation] = useState('');
  const [endStationInput, setEndStationInput] = useState('');
  const [endStation, setEndStation] = useState('');
  const [isLandscape, setIsLandscape] = useState(true);

  const setInputAndStation = (
    value: string,
    setStation: Dispatch<SetStateAction<string>>,
    setInputValue: Dispatch<SetStateAction<string>>
  ) => {
    setInputValue(value);
    stations.includes(value) ? setStation(value) : setStation('');
  };

  const setStartInputAndStation = (value: string) => {
    setInputAndStation(value, setStartStation, setStartStationInput);
  };

  const setEndInputAndStation = (value: string) => {
    setInputAndStation(value, setEndStation, setEndStationInput);
  };

  return (
    <div className="App">
      <div className="station-selector">
        <div className="station-input">
          <div className="options">
            <PickStartStation
              startStationInput={startStationInput}
              setInputAndStation={setStartInputAndStation}
            />
            <BsArrowDownShort className="down-arrow" />
            <PickEndStation
              endStationInput={endStationInput}
              setInputAndStation={setEndInputAndStation}
            />
          </div>
          <div
            className="btn" onClick={() => {
              const prevEndInput = endStationInput;
              const prevStartInput = startStationInput;
              setStartInputAndStation(prevEndInput);
              setEndInputAndStation(prevStartInput);
            }}
          >
            <HiOutlineSwitchVertical />
          </div>
        </div>
        <div className="btn" onClick={() => setIsLandscape(!isLandscape)}>
          {isLandscape ? <FcRotateToPortrait /> : <FcRotateToLandscape />}
        </div>
      </div>
      <MainDisplay isLandscape={isLandscape} startStation={startStation} endStation={endStation} />
    </div>
  );
};

export default App;
