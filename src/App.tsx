import { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import './App.scss';
import { BsTriangleFill, BsCaretLeftFill } from 'react-icons/bs';
import { GrEscalator, GrElevator, GrTrain } from "react-icons/gr";
import { GiStairs } from "react-icons/gi";


interface PickStartStationProps {
  setStation: Dispatch<SetStateAction<string>>;
}

const PickStartStation = ({ setStation }: PickStartStationProps) => {
  const stations = ['Bishan', 'Orchard', 'Somerset'];

  const renderOption = (station: string) => {
    return <option key={station} value={station} />;
  }

  return (
    <>
      <input list="start-station" name="start-stations" id="start-stations"
        onChange={e => {
          if (stations.includes(e.target.value)) {
            setStation(e.target.value)
          }
        }}
      />
      <datalist id="start-station">
        {stations.map(renderOption)}
      </datalist>
    </>
  );
}

interface PickEndStationProps {
  setStation: Dispatch<SetStateAction<string>>;
}

const PickEndStation = ({ setStation }: PickEndStationProps) => {
  const stations = ['Yishun', 'Sembawang', 'Canberra'];

  const renderOption = (station: string) => {
    return <option key={station} value={station} />;
  }

  return (
    <>
      <input list="end-station" name="end-stations" id="end-stations"
        onChange={e => {
          if (stations.includes(e.target.value)) {
            setStation(e.target.value)
          }
        }} />
      <datalist id="end-station">
        {stations.map(renderOption)}
      </datalist>
    </>
  );
}

interface ResultProps {
  startStation: string;
  endStation: string;
}
const Result = ({ startStation, endStation }: ResultProps) => {
  const numCarraiges = 6;
  const numDoors = 4;

  return (<>
    <div>
      <div className="display">
        <div className="content">
          <div className="top">
            <p>This station:<span className="station-name"> {endStation}</span></p>
          </div>
          <div className="med">
            <div className="door-opening-info">
              <BsTriangleFill className="triangle" />
              <div className="door-opening-info-text">
                <p className="sub">Doors opening:</p>
                <p className="main">Same side</p>
              </div>
              <BsTriangleFill className="triangle" />
            </div>
            <div className="door-number">
              <p className="sub">Door</p>
              <p className="main">24</p>
            </div>
          </div>
          <div className="bot">
            <div className="other-train">
              <p>Train towards Jurong East</p>
            </div>
            <div className="platform-info">
              <GrEscalator className="escalator" style={{ left: 'calc(0.75 * (100% - 2em))' }} />
              <GrElevator className="elevator" style={{ left: 'calc(0.3 * (100% - 2em))' }} />
              <GrTrain className="icon-train" style={{ left: 'calc(0.2 * (100% - 2em))' }} />
              <GiStairs className="stairs" style={{ left: 'calc(0.1 * (100% - 2em))' }} />
            </div>
            <div className="train-info">
              <BsCaretLeftFill className="direction-tri" />
              <div className="train">
                {
                  [...Array(numCarraiges)].map((item, i) => {
                    return <div key={i} className="carraige">{
                      [...Array(numDoors)].map((item, j) => {
                        return <div key={j} className="door"></div>
                      })
                    }</div>

                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}

const App = (): ReactElement => {
  const [startStation, setStartStation] = useState('Station');
  const [endStation, setEndStation] = useState('Station');

  return (
    <div className="App">
      <div>
        <PickStartStation setStation={setStartStation}></PickStartStation>
        <PickEndStation setStation={setEndStation}></PickEndStation>
      </div>
      <div>
        {<Result startStation={startStation} endStation={endStation}></Result>}
      </div>
    </div>
  );
}

export default App;
