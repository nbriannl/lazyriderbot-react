import { BsTriangleFill, BsCaretLeftFill, BsFillCaretUpFill } from 'react-icons/bs';
import { FcRotateToLandscape, FcRotateToPortrait } from 'react-icons/fc';
import { useState, ReactElement } from 'react';
import Platform from './Platform';

interface Props {
  startStation: string;
  endStation: string;
}

const MainDisplay = ({ endStation }: Props): ReactElement => {
  const numCarraiges = 6;
  const numDoors = 4;
  const isDoorOpeningSameSide = true;
  // 0-index
  const best = 19;

  const [isLandscape, setIsLandscape] = useState(true);

  return (
    <div className="main-display">
      <div className="top">
        <p className="station-info">This station:<span className="station-name"> {endStation}</span></p>
        <div className="rotate-btn" onClick={() => setIsLandscape(!isLandscape)}>
          {isLandscape ? <FcRotateToPortrait /> : <FcRotateToLandscape />}
        </div>
      </div>
      <div className="med">
        <div className={`door-opening-info ${isDoorOpeningSameSide ? 'same-side' : 'other-side'}`}>
          <BsTriangleFill />
          <div className="door-opening-info-text">
            <p className="sub">Doors opening:</p>
            <p className="main">{isDoorOpeningSameSide ? 'Same side' : 'Other side'}</p>
          </div>
          <BsTriangleFill />
        </div>
        <div className="door-number">
          <p className="sub">Door</p>
          <p className="main">{best + 1}</p>
        </div>
      </div>
      <div className={`main-info ${isLandscape ? 'landscape' : 'portrait'}`}>
        <div className="other-train">
          <p>Train towards Marina Bay</p>
        </div>
        <Platform isLandscape={isLandscape} />
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
                      const isBestDoor = ((i) * numDoors + j) === best;
                      // 0-index
                      return <div key={`${(i) * numDoors + j}`} className={`door ${isBestDoor ? 'best' : ''}`} />;
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
