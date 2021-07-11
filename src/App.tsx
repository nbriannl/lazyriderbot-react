import { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import './styles/App.scss';
import { BsArrowDownShort } from 'react-icons/bs';
import { FcRotateToLandscape, FcRotateToPortrait } from 'react-icons/fc';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import MainDisplay from './components/MainDisplay/index';

interface PickStartStationProps {
  setStation: Dispatch<SetStateAction<string>>;
}

const PickStartStation = ({ setStation }: PickStartStationProps) => {
  const stations = ['Yishun', 'Sembawang', 'Canberra', 'Bishan', 'Orchard', 'Somerset'];

  const renderOption = (station: string) => {
    return <option key={station} value={station} />;
  };

  return (
    <>
      <input
        list="start-station" name="start-stations" id="start-stations"
        placeholder="From"
        onChange={e => {
          if (stations.includes(e.target.value)) {
            setStation(e.target.value);
          }
        }}
      />
      <datalist id="start-station">
        {stations.map(renderOption)}
      </datalist>
    </>
  );
};

interface PickEndStationProps {
  setStation: Dispatch<SetStateAction<string>>;
}

const PickEndStation = ({ setStation }: PickEndStationProps) => {
  const stations = ['Yishun', 'Sembawang', 'Canberra', 'Bishan', 'Orchard', 'Somerset'];

  const renderOption = (station: string) => {
    return <option key={station} value={station} />;
  };

  return (
    <>
      <input
        list="end-station" name="end-stations" id="end-stations"
        placeholder="To"
        onChange={e => {
          if (stations.includes(e.target.value)) {
            setStation(e.target.value);
          }
        }}
      />
      <datalist id="end-station">
        {stations.map(renderOption)}
      </datalist>
    </>
  );
};


const App = (): ReactElement => {
  const [startStation, setStartStation] = useState('Station');
  const [endStation, setEndStation] = useState('Khatib');
  const [isLandscape, setIsLandscape] = useState(true);

  return (
    <div className="App">
      <div className="station-selector">
        <div className="station-input">
          <div className="options">
            <PickStartStation setStation={setStartStation} />
            <BsArrowDownShort className="down-arrow" />
            <PickEndStation setStation={setEndStation} />
          </div>
          <div
            className="btn" onClick={() => {
              const prevEnd = endStation;
              const prevStart = startStation;
              setStartStation(prevEnd);
              setEndStation(prevStart);
              console.log('swapped');
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
