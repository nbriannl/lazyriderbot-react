import { ReactElement } from 'react';
import { groupedByLine } from '../../data/grouped';
import { hashedByCode } from '../../data/hashedByCode';

interface EndStationSelectProps {
  startStation: string;
  setStation: (value: string) => void;
  placeholder: string;
}

const StartStationSelect = ({ startStation, setStation, placeholder }: EndStationSelectProps): ReactElement => {
  const renderOption = (station: { code: string; name: string }) => {
    if (hashedByCode[station.code].info == null) return null;
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
      name="start-stations"
      id="start-stations"
      value={startStation}
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

export default StartStationSelect;
