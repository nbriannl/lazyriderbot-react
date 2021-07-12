import { ReactElement, useState } from 'react';
import './styles/App.scss';
import MainDisplay from './components/MainDisplay/index';
import StationSelector from './components/StationSelector';
import grouped from './data/grouped';
// import stations from './data/trainStations';

// interface Station {
//   code: string;
//   name: string;
// }

const App = (): ReactElement => {
  // const stationsMap: { [key: string]: Array<Station> } = {};
  // stations.forEach(s => {
  //   console.log(s);
  //   const station = { code: s[0], name: s[1] };
  //   if (!stationsMap[s[3]]) {
  //     stationsMap[s[3]] = [station];
  //   } else {
  //     stationsMap[s[3]].push(station);
  //   }
  // });
  console.log(grouped);

  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  // true is heading to JE
  const [direction, setDirection] = useState(true);
  const [isLandscape, setIsLandscape] = useState(false);

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
      />
      <MainDisplay
        isLandscape={isLandscape}
        startStation={startStation}
        endStation={endStation}
        direction={direction}
      />
    </div>
  );
};

export default App;
