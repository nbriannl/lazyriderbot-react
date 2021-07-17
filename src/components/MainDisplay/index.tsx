import { BsTriangleFill } from 'react-icons/bs';
import { ReactElement } from 'react';
import { hashedByCode } from '../../data/hashedByCode';
import Platform, { PlatformFeature, PlatformInfo } from './Platform';
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
  console.log('rendering main display for', endStation, 'bound for', direction);
  if (startStation !== '' && endStation !== '') {
    console.log(hashedByCode[startStation].name, hashedByCode[endStation].name, direction);
  }

  const lineInfo = {
    numCarraiges: 6,
    numDoors: 4
  };
  const { numCarraiges, numDoors } = lineInfo;

  const khatibPlatform: PlatformInfo = [
    {
      distFromHead: 20,
      features: [
        PlatformFeature.Stairs,
        PlatformFeature.EscalatorEntry
      ]
    },
    {
      distFromHead: 50,
      features: [
        PlatformFeature.Elevator
      ]
    },
    {
      distFromHead: 80,
      features: [
        PlatformFeature.Stairs,
        PlatformFeature.EscalatorExit
      ]
    }
  ];
  type Train = {
    type: 'train';
    bestDoorIndex: number;
  }
  type Platform = {
    type: 'platform';
    platformInfo: PlatformInfo;
  }
  type OtherTrain = {
    type: 'other_train';
    sameDirection: boolean;
  }
  type StationFeature = Train | Platform | OtherTrain;
  const khatibStation: Array<StationFeature> = [
    {
      type: 'train',
      bestDoorIndex: 18
    },
    {
      type: 'platform',
      platformInfo: khatibPlatform
    },
    {
      type: 'other_train',
      sameDirection: false
    }
  ];

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
        {khatibStation.map(element => {
          switch (element.type) {
            case 'train':
              return (
                <Train
                  isLandscape={isLandscape}
                  numCarraiges={numCarraiges}
                  numDoors={numDoors}
                  bestDoorIndex={oreintedBestDoorIndex}
                />
              );
            case 'platform':
              return (
                <Platform
                  platformInfo={element.platformInfo}
                  isLandscape={isLandscape}
                  direction={direction}
                />
              );
            case 'other_train':
              return (
                <OtherTrain
                  text={direction ? 'Train towards Marina Bay' : 'Train towards Jurong East'}
                  isLandscape={isLandscape}
                  sameDirection={false}
                />
              );
          }
        })}
      </div>
    </div>
  );
};

export default MainDisplay;
