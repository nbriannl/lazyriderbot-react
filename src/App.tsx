import { ReactElement, useState } from 'react';
import './styles/App.scss';
import MainDisplay from './components/MainDisplay/index';
import StationSelector from './components/StationSelector';
import { hashedByCode } from './data/hashedByCode';
import { groupedByLine } from './data/grouped';

const App = (): ReactElement => {
  // const stationsMap: { [key: string]: Station } = {};
  // stations.forEach(s => {
  //   console.log(s);
  //   const station = { code: s[0], name: s[1], line: s[3] };
  //   stationsMap[station.code] = station;
  // });
  // console.log(stationsMap);

  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  // true is heading to JE
  const [singleLocdirection, setDirection] = useState(true);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isMultiLocationMode, setIsMultiLocationMode] = useState(true);

  const linesFilled = startStation !== '' && endStation !== '';
  const canShowMainDisplay = isMultiLocationMode ?
    (linesFilled && hashedByCode[startStation].line === hashedByCode[endStation].line) :
    endStation !== '';

  const findIndexWithinLine = (code: string, stations: Array<{ code: string; name: string }>) => {
    return stations.findIndex(station => station.code === code);
  };

  const multiLocDirection = () => {
    console.log(hashedByCode[startStation], hashedByCode[endStation]);
    const { line } = hashedByCode[startStation];
    const stations = groupedByLine[line];
    const startStationIndex = findIndexWithinLine(startStation, stations);
    const endStationIndex = findIndexWithinLine(endStation, stations);
    console.log(startStationIndex, endStationIndex);
    return endStationIndex < startStationIndex;
  };

  const direction = (isMultiLocationMode && linesFilled) ? multiLocDirection() : singleLocdirection;

  return (
    <div className="App">
      <StationSelector
        isLandscape={isLandscape}
        setIsLandscape={setIsLandscape}
        startStation={startStation}
        setStartStation={setStartStation}
        endStation={endStation}
        setEndStation={setEndStation}
        direction={direction}
        setDirection={setDirection}
        isMultiLocationMode={isMultiLocationMode}
        setIsMultiLocationMode={setIsMultiLocationMode}
      />
      {
        canShowMainDisplay ?
          <MainDisplay
            isLandscape={isLandscape}
            startStation={startStation}
            endStation={endStation}
            direction={direction}
            isMultiLocationMode={isMultiLocationMode}
          /> :
          <div className="introduction">{'You didn\'t pick anything'}</div>
      }

    </div>
  );
};

export default App;
