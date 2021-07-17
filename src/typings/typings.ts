import { PlatformInfo } from '../components/MainDisplay/Platform';
import { StationFeatureType } from '../constants/station';

export type Train = {
  type: StationFeatureType.Train;
  bestDoorIndex: number;
}
export type Platform = {
  type: StationFeatureType.Platform;
  platformInfo: PlatformInfo;
}
export type OtherTrain = {
  type: StationFeatureType.OtherTrain;
  sameDirection: boolean;
}
export type StationFeature = Train | Platform | OtherTrain;
export type StationInfo = Array<StationFeature>;
