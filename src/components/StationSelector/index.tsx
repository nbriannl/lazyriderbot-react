import { BsArrowDownShort } from 'react-icons/bs';
import { Dispatch, ReactElement, SetStateAction } from 'react';
import { FcRotateToLandscape, FcRotateToPortrait } from 'react-icons/fc';
import { HiOutlineSwitchVertical, HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { MdLocationOn } from 'react-icons/md';
import { hashedByCode } from '../../data/hashedByCodeSource';
import { Line, lineInfo } from '../../data/hashedByCode';
import EndStationSelect from './EndStationSelect';
import StartStationSelect from './StartStationSelect';

interface Props {
  isLandscape: boolean;
  setIsLandscape: Dispatch<SetStateAction<boolean>>;
  startStation: string;
  setStartStation: Dispatch<SetStateAction<string>>;
  endStation: string;
  setEndStation: Dispatch<SetStateAction<string>>;
  direction: boolean;
  setDirection: Dispatch<SetStateAction<boolean>>;
  isMultiLocationMode: boolean;
  setIsMultiLocationMode: Dispatch<SetStateAction<boolean>>;
}

const StationSelector = ({
  isLandscape,
  setIsLandscape,
  startStation,
  setStartStation,
  endStation,
  setEndStation,
  direction,
  setDirection,
  isMultiLocationMode,
  setIsMultiLocationMode
}: Props): ReactElement => {
  const swapStationsSelect = () => {
    const prevEnd = endStation;
    const prevStart = startStation;
    setStartStation(prevEnd);
    setEndStation(prevStart);
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
        <EndStationSelect endStationInput={endStation} setStation={setEndStation} placeholder="Destination" />
        {endStation &&
          <p>Towards {direction ?
            lineInfo(hashedByCode[endStation].line as Line).firstStation :
            lineInfo(hashedByCode[endStation].line as Line).lastStation}
          </p>}
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
        <StartStationSelect startStation={startStation} setStation={setStartStation} placeholder="From" />
        <BsArrowDownShort className="down-arrow" />
        <EndStationSelect endStationInput={endStation} setStation={setEndStation} placeholder="To" />
      </div>
      <div
        className="btn" onClick={swapStationsSelect}
      >
        <HiOutlineSwitchVertical />
      </div>
    </div>
  );

  const mapLineToCssClass = (line: Line): string => {
    switch (line) {
      case Line.NorthSouth:
        return 'ns';
      case Line.EastWest:
        return 'ew';
    }
  };

  const addAnAccent = () => {
    if (endStation !== '') {
      return mapLineToCssClass(hashedByCode[endStation].line as Line);
    }
    return '';
  };

  return (
    <div className={`station-selector ${addAnAccent()}`}>
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
  );
};

export default StationSelector;
