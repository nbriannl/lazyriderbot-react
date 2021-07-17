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
  console.log('rendering main display for', hashedByCode[endStation].name, 'bound for', direction);
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
  enum StationFeatureType {
    Train = 'TRAIN',
    Platform = 'PLATFORM',
    OtherTrain = 'OTHER_TRAIN'
  }
  type Train = {
    type: StationFeatureType.Train;
    bestDoorIndex: number;
  }
  type Platform = {
    type: StationFeatureType.Platform;
    platformInfo: PlatformInfo;
  }
  type OtherTrain = {
    type: StationFeatureType.OtherTrain;
    sameDirection: boolean;
  }
  type StationFeature = Train | Platform | OtherTrain;
  type Station = Array<StationFeature>;
  const khatibStation: Station = [
    {
      type: StationFeatureType.Train,
      bestDoorIndex: 18
    },
    {
      type: StationFeatureType.Platform,
      platformInfo: khatibPlatform
    },
    {
      type: StationFeatureType.OtherTrain,
      sameDirection: false
    }
  ];

  const isDoorOpeningSameSide = true;
  // 0-index
  const getOreintedBestDoorIndex = (index: number) => {
    return direction ? index : (6 * 4) - index - 1;
  };

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

  const suggestedBestDoorIndex = (station: Station) => {
    return (station.find(sf => sf.type === StationFeatureType.Train) as Train).bestDoorIndex;
  };

  return (
    <div className="main-display">
      <div className="med">
        <div className={`door-opening-info ${isDoorOpeningSameSide ? 'same-side' : 'other-side'}`}>
          {isMultiLocationMode ? doorOpeningInfo : selectMsg}
        </div>
        <div className="door-number">
          <p className="sub">Door</p>
          <p className="main">{getOreintedBestDoorIndex(suggestedBestDoorIndex(khatibStation)) + 1}</p>
        </div>
      </div>
      <div className={`main-info ${isLandscape ? 'landscape' : 'portrait'}`}>
        {khatibStation.map(element => {
          switch (element.type) {
            case StationFeatureType.Train:
              return (
                <Train
                  isLandscape={isLandscape}
                  numCarraiges={numCarraiges}
                  numDoors={numDoors}
                  bestDoorIndex={getOreintedBestDoorIndex(element.bestDoorIndex)}
                />
              );
            case StationFeatureType.Platform:
              return (
                <Platform
                  platformInfo={element.platformInfo}
                  isLandscape={isLandscape}
                  direction={direction}
                />
              );
            case StationFeatureType.OtherTrain:
              return (
                <OtherTrain
                  text={direction ? 'Train towards Marina Bay' : 'Train towards Jurong East'}
                  isLandscape={isLandscape}
                  sameDirection={element.sameDirection}
                />
              );
          }
        })}
      </div>
    </div>
  );
};

export default MainDisplay;
