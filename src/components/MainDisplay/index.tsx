import { BsTriangleFill } from 'react-icons/bs';
import { ReactElement } from 'react';
import { hashedByCode, Line, lineInfo, Station } from '../../data/hashedByCode';
import { StationFeatureType } from '../../constants/station';
import { StationInfo, Train as TrainType } from '../../typings/typings';
import Platform from './Platform';
import OtherTrain from './OtherTrain';
import Train from './Train';

interface Props {
  isLandscape: boolean;
  startStation: string;
  endStation: string;
  direction: boolean;
  isMultiLocationMode: boolean;
}

const MainDisplay = ({ isLandscape, startStation, endStation, direction, isMultiLocationMode }: Props): Nullable<ReactElement> => {
  const displayedStation = hashedByCode[endStation];
  console.log('rendering main display for', displayedStation.name, 'bound for', direction);
  if (startStation !== '' && endStation !== '') {
    console.log(hashedByCode[startStation].name, displayedStation.name, direction);
  }

  const { numCarraiges, numDoors } = lineInfo(displayedStation.line as Line);

  const isDoorOpeningSameSide = true;
  // 1-index
  const getOreintedBestDoorIndex = (index: number) => {
    return direction ? index - 1 : (numCarraiges * numDoors) - index;
  };

  const doorOpeningInfo = (
    <>
      <BsTriangleFill />
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

  const suggestedBestDoorIndex = (station: StationInfo) => {
    return (station.find(sf => sf.type === StationFeatureType.Train) as TrainType).bestDoorIndex;
  };

  const stationInfo = (displayedStation as Station).info;
  console.log(endStation, displayedStation, stationInfo);
  if (stationInfo == null) {
    return <div className="main-display"> No station info for {displayedStation.name}</div>;
  }
  return (
    <div className="main-display">
      <div className="med">
        <div className={`door-opening-info ${isDoorOpeningSameSide ? 'same-side' : 'other-side'}`}>
          {isMultiLocationMode ? doorOpeningInfo : selectMsg}
        </div>
        <div className="door-number">
          <p className="sub">Door</p>
          <p className="main">{getOreintedBestDoorIndex(suggestedBestDoorIndex(stationInfo)) + 1}</p>
        </div>
      </div>
      <div className={`main-info ${isLandscape ? 'landscape' : 'portrait'}`}>
        {stationInfo.map((element, index) => {
          switch (element.type) {
            case StationFeatureType.Train:
              return (
                <Train
                  key={index}
                  isLandscape={isLandscape}
                  numCarraiges={numCarraiges}
                  numDoors={numDoors}
                  bestDoorIndex={getOreintedBestDoorIndex(element.bestDoorIndex)}
                />
              );
            case StationFeatureType.Platform:
              return (
                <Platform
                  key={index}
                  platformInfo={element.platformInfo}
                  isLandscape={isLandscape}
                  direction={direction}
                />
              );
            case StationFeatureType.OtherTrain:
              return (
                <OtherTrain
                  key={index}
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
