import { BsTriangleFill } from 'react-icons/bs';
import { ReactElement } from 'react';
import { hashedByCode } from '../../data/hashedByCode';
import Platform from './Platform';
import Train from './Train';
import OtherTrain from './OtherTrain';

interface Props {
  isLandscape: boolean;
  startStation: string;
  endStation: string;
  direction: boolean;
  isMultiLocationMode: boolean;
}

const MainDisplay = ({ isLandscape, startStation, endStation, direction, isMultiLocationMode }: Props): ReactElement => {
  if (startStation !== '' && endStation !== '') {
    console.log(hashedByCode[startStation].name, hashedByCode[endStation].name, direction);
  }

  const numCarraiges = 6;
  const numDoors = 4;
  const isDoorOpeningSameSide = true;
  // 0-index
  const bestDoorIndex = 18;
  const oreintedBestDoorIndex = direction ? bestDoorIndex : (6 * 4) - bestDoorIndex - 1;

  const doorOpeningInfo = (
    <><BsTriangleFill />
      <div className="door-opening-info-text">
        <p className="sub">Doors opening:</p>
        <p className="main">{isDoorOpeningSameSide ? 'Same side' : 'Other side'}</p>
      </div>
      <BsTriangleFill />
    </>
  );

  const selectMsg = (
    <p className="main">Single Location</p>
  );

  return (
    <div className="main-display">
      <div className="med">
        <div className={`door-opening-info ${isDoorOpeningSameSide ? 'same-side' : 'other-side'}`}>
          {isMultiLocationMode ? doorOpeningInfo : selectMsg}
        </div>
        <div className="door-number">
          <p className="sub">Door</p>
          <p className="main">{oreintedBestDoorIndex + 1}</p>
        </div>
      </div>
      <div className={`main-info ${isLandscape ? 'landscape' : 'portrait'}`}>
        <OtherTrain
          text={direction ? 'Train towards Marina Bay' : 'Train towards Jurong East'}
          isLandscape={isLandscape}
          sameDirection={false}
        />
        <Platform isLandscape={isLandscape} direction={direction} />
        <Train
          isLandscape={isLandscape}
          numCarraiges={numCarraiges}
          numDoors={numDoors}
          bestDoorIndex={oreintedBestDoorIndex}
        />
      </div>
    </div>
  );
};

export default MainDisplay;
