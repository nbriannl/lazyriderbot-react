import { ReactElement, useState } from 'react';
import './styles/App.scss';
import MainDisplay from './components/MainDisplay/index';
import StationSelector from './components/StationSelector';
import { hashedByCode } from './data/hashedByCodeSource';
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
  const checkCanShowMainDisplay = (): { canShowMainDisplay: boolean; instructions: string } => {
    if (isMultiLocationMode) {
      if (!linesFilled) {
        return { canShowMainDisplay: false, instructions: 'Please select a start and end station' };
      }
      if (hashedByCode[startStation].line !== hashedByCode[endStation].line) {
        return { canShowMainDisplay: false, instructions: 'The station selected are of different lines' };
      }
      return { canShowMainDisplay: true, instructions: '' };
    }
    if (endStation === '') {
      return { canShowMainDisplay: false, instructions: 'Please select a destination' };
    }
    return { canShowMainDisplay: true, instructions: '' };
  };
  const { canShowMainDisplay, instructions } = checkCanShowMainDisplay();

  const findIndexWithinLine = (code: string, stations: Array<{ code: string; name: string }>) => {
    return stations.findIndex(station => station.code === code);
  };

  // true is heading towards the first in the line
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
          <div className="introduction">{instructions}</div>
      }

    </div>
  );
};

export default App;
