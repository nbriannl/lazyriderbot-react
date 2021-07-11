import { ReactElement } from 'react';
import { IconElevator, IconEscalatorEntry, IconEscalatorExit, IconEscalatorInternalTransfer, IconStairs, IconStairsInternal } from './PlatformIcons';

interface Props {
  isLandscape: boolean;
  direction: boolean;
}


enum PlatformFeature {
  Elevator,
  EscalatorExit,
  EscalatorEntry,
  EscalatorInternalTransfer,
  Stairs,
  StairInternalTansfer
}

interface PlatformFeatureInfo {
  distFromHead: number;
  features: Array<PlatformFeature>;
}

const khatib: Array<PlatformFeatureInfo> = [
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

const Platform = ({ isLandscape, direction }: Props): ReactElement => {
  const platformInfo = khatib;
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
    const distFromHeadOriented = direction ? distFromHead : (100 - distFromHead);
    return (
      <div key={index} className={`platform-feature platform-feature-${distFromHeadOriented}`}>
        {features.map(renderFeature)}
      </div>
    );
  };

  const maxFeaturesForAnArea = Math.max(...platformInfo.map(info => info.features.length));
  const value = maxFeaturesForAnArea * 2 + 1;
  const platformStyleValue = `${value}em`;
  const platformStyle = isLandscape ? { height: platformStyleValue } : { width: platformStyleValue };
  return (
    <div className={`platform-info ${direction ? '' : 'flip'}`} style={platformStyle}>
      {platformInfo.map((feature, i) => renderPlatformFeature(feature, i))}
    </div>
  );
};

export default Platform;
