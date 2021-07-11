import { ReactElement } from 'react';
import { IconElevator, IconEscalatorEntry, IconEscalatorExit, IconEscalatorInternalTransfer, IconStairs, IconStairsInternal } from './PlatformIcons';

interface Props {
  isLandscape: boolean;
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

const Platform = ({ isLandscape }: Props): ReactElement => {
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
    return (
      <div key={index} className={`platform-feature-${distFromHead * 100}`}>
        {features.map(renderFeature)}
      </div>
    );
  };

  const maxFeaturesForAnArea = Math.max(...platformInfo.map(info => info.features.length));
  const value = maxFeaturesForAnArea * 2 + 1;
  const platformStyleValue = `${value}em`;
  const platformStyle = isLandscape ? { height: platformStyleValue } : { width: platformStyleValue };
  return (
    <div className="platform-info" style={platformStyle}>
      {platformInfo.map((feature, i) => renderPlatformFeature(feature, i))}
    </div>
  );
};

export default Platform;
