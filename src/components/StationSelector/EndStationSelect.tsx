import { ReactElement } from 'react';
import { groupedByLine } from '../../data/grouped';

interface EndStationSelectProps {
  endStationInput: string;
  setStation: (value: string) => void;
  placeholder: string;
}

const EndStationSelect = ({ endStationInput, setStation, placeholder }: EndStationSelectProps): ReactElement => {
  const renderOption = (station: { code: string; name: string }) => {
    return <option key={station.code} value={station.code}>{station.name}</option>;
  };

  const options = Object.entries(groupedByLine).map(item => {
    return (
      <optgroup key={item[0]} label={item[0]}>
        {item[1].map(renderOption)}
      </optgroup>
    );
  });

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
      <option value="" disabled>{placeholder}</option>
      {options}
    </select>
  );
};

export default EndStationSelect;
