import { ReactElement } from 'react';

const stations = ['Yishun', 'Sembawang', 'Canberra', 'Bishan', 'Orchard', 'Somerset'];

interface EndStationSelectProps {
  startStation: string;
  setStation: (value: string) => void;
  placeholder: string;
}

const StartStationSelect = ({ startStation, setStation, placeholder }: EndStationSelectProps): ReactElement => {
  const renderOption = (station: string) => {
    return <option key={station} value={station}>{station}</option>;
  };

  return (
    <select
      name="start-stations"
      id="start-stations"
      value={startStation}
      required
      onChange={e => {
        setStation(e.target.value);
      }}
    >
      <option value="" disabled>{placeholder}</option>
      {stations.map(renderOption)}
    </select>
  );
};

export default StartStationSelect;
