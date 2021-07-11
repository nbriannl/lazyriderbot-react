import { BsTriangleFill } from 'react-icons/bs';
import { FcRotateToLandscape, FcRotateToPortrait } from 'react-icons/fc';
import { useState, ReactElement } from 'react';
import Platform from './Platform';
import Train from './Train';
import OtherTrain from './OtherTrain';

interface Props {
  startStation: string;
  endStation: string;
}

const MainDisplay = ({ endStation }: Props): ReactElement => {
  const numCarraiges = 6;
  const numDoors = 4;
  const isDoorOpeningSameSide = true;
  // 0-index
  const bestDoorIndex = 19;

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
          <p className="main">{bestDoorIndex + 1}</p>
        </div>
      </div>
      <div className={`main-info ${isLandscape ? 'landscape' : 'portrait'}`}>
        <OtherTrain
          text={'Train towards Marina Bay'}
          isLandscape={isLandscape}
          sameDirection={false}
        />
        <Platform isLandscape={isLandscape} />
        <Train
          isLandscape={isLandscape}
          numCarraiges={numCarraiges}
          numDoors={numDoors}
          bestDoorIndex={bestDoorIndex}
        />
      </div>
    </div>
  );
};

export default MainDisplay;
