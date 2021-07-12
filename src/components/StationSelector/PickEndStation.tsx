import { ReactElement } from 'react';

const stations = ['Yishun', 'Sembawang', 'Canberra', 'Bishan', 'Orchard', 'Somerset'];

interface PickEndStationProps {
  endStationInput: string;
  setInputAndStation: (value: string) => void;
  placeholder: string;
}

const PickEndStation = ({ endStationInput, setInputAndStation, placeholder }: PickEndStationProps): ReactElement => {
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

export default PickEndStation;
