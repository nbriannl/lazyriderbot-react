import { ReactElement } from 'react';
import { IconElevator, IconEscalatorEntry, IconEscalatorExit, IconEscalatorInternalTransfer, IconStairs, IconStairsInternal } from './PlatformIcons';

export enum PlatformFeature {
  Elevator,
  EscalatorExit,
  EscalatorEntry,
  EscalatorInternalTransfer,
  Stairs,
  StairInternalTansfer
}

export interface PlatformFeatureInfo {
  distFromHead: number;
  features: Array<PlatformFeature>;
}

export type PlatformInfo = Array<PlatformFeatureInfo>;


interface Props {
  platformInfo: PlatformInfo;
  isLandscape: boolean;
  direction: boolean;
}

const Platform = ({ isLandscape, direction, platformInfo }: Props): ReactElement => {
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
