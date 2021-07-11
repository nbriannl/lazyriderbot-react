import { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import './styles/App.scss';
import { BsArrowDownShort } from 'react-icons/bs';
import { FcRotateToLandscape, FcRotateToPortrait } from 'react-icons/fc';
import { HiOutlineSwitchVertical, HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { MdLocationOn } from 'react-icons/md';
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
  placeholder: string;
}

const PickEndStation = ({ endStationInput, setInputAndStation, placeholder }: PickEndStationProps) => {
  const renderOption = (station: string) => {
    return <option key={station} value={station} />;
  };

  return (
    <>
      <input
        list="end-station" name="end-stations" id="end-stations"
        placeholder={placeholder}
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
  const [isMultiLocationMode, setIsMultiLocationMode] = useState(true);
  // true is heading to JE
  const [direction, setDirection] = useState(true);
  const [isLandscape, setIsLandscape] = useState(false);

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

  const swapStations = () => {
    const prevEndInput = endStationInput;
    const prevStartInput = startStationInput;
    setStartInputAndStation(prevEndInput);
    setEndInputAndStation(prevStartInput);
  };

  const multiLocationIcon = (
    <div className="multi-loc-icon">
      <MdLocationOn className="behind-icon" />
      <MdLocationOn className="overlap-icon" />
    </div>
  );

  const singleLocationInput = (
    <div className="station-input">
      <div className="options">
        <PickEndStation
          endStationInput={endStationInput}
          setInputAndStation={setEndInputAndStation}
          placeholder={'Destination'}
        />
        <p>Towards {direction ? 'Jurong East' : 'Marina South Pier'}</p>
      </div>
      <div
        className="btn" onClick={() => setDirection(!direction)}
      >
        <HiOutlineSwitchHorizontal />
      </div>
    </div>
  );

  const multiLocationInput = (
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
          placeholder={'To'}
        />
      </div>
      <div
        className="btn" onClick={swapStations}
      >
        <HiOutlineSwitchVertical />
      </div>
    </div>
  );

  return (
    <div className="App">
      <div className="station-selector">
        <div
          className={`btn column ${isMultiLocationMode ? 'multiloc' : 'singleloc'} `} onClick={() => setIsMultiLocationMode(!isMultiLocationMode)}
        >
          {multiLocationIcon}
          <MdLocationOn className="single-loc-icon" />
        </div>
        {isMultiLocationMode ? multiLocationInput : singleLocationInput}
        <div className="btn" onClick={() => setIsLandscape(!isLandscape)}>
          {isLandscape ? <FcRotateToPortrait /> : <FcRotateToLandscape />}
        </div>
      </div>
      <MainDisplay
        isLandscape={isLandscape}
        startStation={startStation}
        endStation={endStation}
        direction={direction}
      />
    </div>
  );
};

export default App;
