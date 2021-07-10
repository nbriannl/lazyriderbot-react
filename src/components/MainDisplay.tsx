import { BsTriangleFill, BsCaretLeftFill, BsFillCaretUpFill } from 'react-icons/bs';
import { GrEscalator, GrElevator, GrTrain } from 'react-icons/gr';
import { GiStairs } from 'react-icons/gi';
import { FcRotateToLandscape, FcRotateToPortrait } from 'react-icons/fc';
import { useState, ReactElement } from 'react';

interface Props {
  startStation: string;
  endStation: string;
}

enum PlatformFeature {
  Elevator,
  EscalatorExit,
  EscalatorEntry,
  EscalatorInternalTransfer,
  Stairs,
  StairInternalTansfer
}

const IconElevator = (): ReactElement => {
  return <GrElevator />;
};

const IconEscalatorExit = (): ReactElement => {
  return <GrEscalator className="escalator-exit-icon" />;
};

const IconEscalatorEntry = (): ReactElement => {
  return <GrEscalator className="escalator-entry-icon" />;
};

const IconEscalatorInternalTransfer = (): ReactElement => {
  return (
    <>
      <GrTrain className="train-transfer" />
      <GrEscalator className="escalator-internal-transfer" />
    </>
  );
};

const IconStairs = (): ReactElement => {
  return <GiStairs />;
};

const IconStairsInternal = (): ReactElement => {
  return <GiStairs className="stairs-internal-transfer" />;
};

const MainDisplay = ({ endStation }: Props): ReactElement => {
  const numCarraiges = 6;
  const numDoors = 4;
  const isDoorOpeningSameSide = true;
  // 0-index
  const best = 20;

  const [isLandscape, setIsLandscape] = useState(true);

  interface PlatformFeatureInfo {
    distFromHead: number;
    features: Array<PlatformFeature>;
  }

  const platformInfo: Array<PlatformFeatureInfo> = [
    {
      distFromHead: 0.2,
      features: [
        PlatformFeature.Stairs,
        PlatformFeature.EscalatorEntry
      ]
    },
    {
      distFromHead: 0.5,
      features: [
        PlatformFeature.Elevator
      ]
    },
    {
      distFromHead: 0.8,
      features: [
        PlatformFeature.Stairs,
        PlatformFeature.EscalatorExit
      ]
    }
  ];

  const renderFeature = (feature: PlatformFeature, index: number): ReactElement => {
    switch (feature) {
      case PlatformFeature.Elevator:
        return <IconElevator key={index} />;
      case PlatformFeature.EscalatorExit:
        return <IconEscalatorExit key={index} />;
      case PlatformFeature.EscalatorEntry:
        return <IconEscalatorEntry key={index} />;
      case PlatformFeature.EscalatorInternalTransfer:
        return <IconEscalatorInternalTransfer key={index} />;
      case PlatformFeature.Stairs:
        return <IconStairs key={index} />;
      case PlatformFeature.StairInternalTansfer:
        return <IconStairsInternal key={index} />;
    }
  };

  const renderPlatformFeature = (feature: PlatformFeatureInfo, index: number): ReactElement => {
    const { distFromHead, features } = feature;
    console.log(features);
    const styleValue = `calc(${distFromHead} * (100% - 2em))`;
    const style = isLandscape ? { left: styleValue } : { top: styleValue };
    return (
      <div key={index} style={style}>
        {features.map(renderFeature)}
      </div>
    );
  };

  const renderPlatformInfo = (info: Array<PlatformFeatureInfo>): ReactElement => {
    return (
      <>{
        info.map((feature, i) => {
          return renderPlatformFeature(feature, i);
        })
      }
      </>
    );
  };

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
          <p className="main">24</p>
        </div>
      </div>
      <div className={`main-info ${isLandscape ? 'landscape' : 'portrait'}`}>
        <div className="other-train">
          <p>Train towards Marina Bay</p>
        </div>
        <div className="platform-info">
          {renderPlatformInfo(platformInfo)}
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
