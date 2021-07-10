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
    const styleValue = `calc(${distFromHead} * (100% - 2em))`;
    const style = isLandscape ? { left: styleValue } : { top: styleValue };
    return (
      <div key={index} style={style}>
        {features.map(renderFeature)}
      </div>
    );
  };

  return (
    <div className="platform-info">
      {platformInfo.map((feature, i) => renderPlatformFeature(feature, i))}
    </div>
  );
};

export default Platform;
