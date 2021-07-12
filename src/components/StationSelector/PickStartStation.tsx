import { ReactElement } from 'react';

interface PickStartStationProps {
  startStationInput: string;
  setInputAndStation: (value: string) => void;
}

const stations = ['Yishun', 'Sembawang', 'Canberra', 'Bishan', 'Orchard', 'Somerset'];

const PickStartStation = ({ startStationInput, setInputAndStation }: PickStartStationProps): ReactElement => {
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

export default PickStartStation;
