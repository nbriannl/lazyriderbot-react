import { ReactElement } from 'react';

const stations = ['Yishun', 'Sembawang', 'Canberra', 'Bishan', 'Orchard', 'Somerset'];

interface EndStationSelectProps {
  endStationInput: string;
  setStation: (value: string) => void;
  placeholder: string;
}

const EndStationSelect = ({ endStationInput, setStation, placeholder }: EndStationSelectProps): ReactElement => {
  const renderOption = (station: string) => {
    return <option key={station} value={station}>{station}</option>;
  };

  return (
    <select
      name="end-stations"
      id="end-stations"
      value={endStationInput}
      required
      onChange={e => {
        setStation(e.target.value);
      }}
    >
      <option value="" disabled selected>{placeholder}</option>
      {stations.map(renderOption)}
    </select>
  );
};

export default EndStationSelect;
