import { ReactElement, useState } from 'react';
import './styles/App.scss';
import MainDisplay from './components/MainDisplay/index';
import StationSelector from './components/StationSelector';


const App = (): ReactElement => {
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
