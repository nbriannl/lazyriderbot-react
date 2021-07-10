import { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import './styles/App.scss';
import MainDisplay from './components/MainDisplay/index';

interface PickStartStationProps {
  setStation: Dispatch<SetStateAction<string>>;
}

const PickStartStation = ({ setStation }: PickStartStationProps) => {
  const stations = ['Bishan', 'Orchard', 'Somerset'];

  const renderOption = (station: string) => {
    return <option key={station} value={station} />;
  };

  return (
    <>
      <input
        list="start-station" name="start-stations" id="start-stations"
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
  const stations = ['Yishun', 'Sembawang', 'Canberra'];

  const renderOption = (station: string) => {
    return <option key={station} value={station} />;
  };

  return (
    <>
      <input
        list="end-station" name="end-stations" id="end-stations"
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

  return (
    <div className="App">
      <div className="station-selector">
        <PickStartStation setStation={setStartStation} />
        <PickEndStation setStation={setEndStation} />
      </div>
      <MainDisplay startStation={startStation} endStation={endStation} />
    </div>
  );
};

export default App;
