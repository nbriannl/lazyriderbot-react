import { BsTriangleFill, BsCaretLeftFill, BsFillCaretUpFill } from 'react-icons/bs';
import { GrEscalator, GrElevator, GrTrain } from 'react-icons/gr';
import { GiStairs } from 'react-icons/gi';
import { FcRotateToLandscape, FcRotateToPortrait } from 'react-icons/fc';
import { useState, ReactElement } from 'react';

interface Props {
  startStation: string;
  endStation: string;
}

const MainDisplay = ({ endStation }: Props): ReactElement => {
  const numCarraiges = 6;
  const numDoors = 4;

  const [isLandscape, setIsLandscape] = useState(true);

  return (
    <div className="main-display">
      <div className="top">
        <p className="station-info">This station:<span className="station-name"> {endStation}</span></p>
        <div className="rotate-btn" onClick={() => setIsLandscape(!isLandscape)}>
          {
            isLandscape ?
              <FcRotateToPortrait /> :
              <FcRotateToLandscape />
          }
        </div>
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
      <div className={`main-info ${isLandscape ? 'landscape' : 'portrait'}`}>
        <div className="other-train">
          <p>Train towards Jurong East</p>
        </div>
        <div className="platform-info">
          {
            isLandscape ?
              <>
                <GrEscalator style={{ left: 'calc(0.75 * (100% - 2em))' }} />
                <GrElevator style={{ left: 'calc(0.3 * (100% - 2em))' }} />
                <GrTrain style={{ left: 'calc(0.2 * (100% - 2em))' }} />
                <GiStairs style={{ left: 'calc(0 * (100% - 2em))' }} />
              </> :
              <>
                <GrEscalator style={{ top: 'calc(0.75 * (100% - 2em))' }} />
                <GrElevator style={{ top: 'calc(0.3 * (100% - 2em))' }} />
                <GrTrain style={{ top: 'calc(0.2 * (100% - 2em))' }} />
                <GiStairs style={{ top: 'calc(0 * (100% - 2em))' }} />
              </>
          }

        </div>
        <div className="train-info">
          {
            isLandscape ?
              <BsCaretLeftFill className="direction-tri" /> :
              <BsFillCaretUpFill className="direction-tri" />
          }
          <div className="train">
            {
              [...Array(numCarraiges)].map((carraige, i) => {
                return (
                  <div key={i} className="carraige">{
                    [...Array(numDoors)].map((door, j) => {
                      return <div key={j} className="door" />;
                    })
                  }
                  </div>
                );

              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDisplay;