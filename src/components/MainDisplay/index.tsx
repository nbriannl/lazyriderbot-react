import { BsTriangleFill } from 'react-icons/bs';
import { ReactElement } from 'react';
import { hashedByCode, Line, lineInfo, Station } from '../../data/hashedByCode';
import { StationFeatureType } from '../../constants/station';
import { StationInfo, Train as TrainType } from '../../typings/typings';
import { getFlippedDoorIndex } from '../../utils/utils';
import Platform from './Platform';
import OtherTrain from './OtherTrain';
import Train from './Train';
import SpecialTrack from './SpecialTrack';

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

  const { numCarraiges, numDoors, firstStation, lastStation } = lineInfo(displayedStation.line as Line);

  const isDoorOpeningSameSide = true;
  // 1-index
  const getOreintedBestDoorIndex = (index: number) => {
    const orientedIndex = direction ? index : getFlippedDoorIndex(index, displayedStation.line as Line);
    console.log('oriented?', direction, orientedIndex);
    return orientedIndex;
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
    const suggested = (station.find(sf => sf.type === StationFeatureType.Train) as TrainType).bestDoorIndex;
    console.log('suggested best door', suggested);
    return suggested;
  };

  const renderStation = (info: StationInfo) => {
    const orientedInfo = direction ? info : info.slice().reverse();
    console.log(`${direction ? 'towards JE' : 'towards MSP'}`, orientedInfo.map(i => i.type));
    return orientedInfo.map((element, index) => {
      switch (element.type) {
        case StationFeatureType.Train:
          return direction ? (
            <Train
              key={index}
              isLandscape={isLandscape}
              numCarraiges={numCarraiges}
              numDoors={numDoors}
              bestDoorIndex={element.bestDoorIndex}
            />
          ) : (
            <OtherTrain
              key={index}
              text={`Train towards ${firstStation}`}
              isLandscape={isLandscape}
              sameDirection={false}
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
          return direction ? (
            <OtherTrain
              key={index}
              text={direction ? `Train towards ${lastStation}` : `Train towards ${firstStation}`}
              isLandscape={isLandscape}
              sameDirection={element.sameDirection}
            />
          ) : (
            <Train
              key={index}
              isLandscape={isLandscape}
              numCarraiges={numCarraiges}
              numDoors={numDoors}
              bestDoorIndex={element.bestDoorIndex}
            />
          );
        case StationFeatureType.SpecialTrack:
          return (
            <SpecialTrack
              key={index}
              text={element.message}
              isLandscape={isLandscape}
              sameDirection={element.sameDirection}
            />
          );
      }
    });
  };

  const stationInfo = (displayedStation as Station).info;
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
          <p className="main">{getOreintedBestDoorIndex(suggestedBestDoorIndex(stationInfo))}</p>
        </div>
      </div>
      <div className={`main-info ${isLandscape ? 'landscape' : 'portrait'}`}>
        {renderStation(stationInfo)}
      </div>
    </div>
  );
};

export default MainDisplay;
