import { GrEscalator, GrElevator, GrTrain } from 'react-icons/gr';
import { GiStairs } from 'react-icons/gi';
import { ReactElement } from 'react';

export const IconElevator = (): ReactElement => {
  return <GrElevator />;
};

export const IconEscalatorExit = (): ReactElement => {
  return <GrEscalator className="escalator-exit-icon" />;
};

export const IconEscalatorEntry = (): ReactElement => {
  return <GrEscalator className="escalator-entry-icon" />;
};

export const IconEscalatorInternalTransfer = (): ReactElement => {
  return (
    <>
      <GrTrain className={'train-transfer'} />
      <GrEscalator className={'escalator-internal-transfer'} />
    </>
  );
};

export const IconOtherLineCC = (): ReactElement => {
  return (
    <GrTrain className={'train-transfer cc-transfer'} />
  );
};

export const IconStairs = (): ReactElement => {
  return <GiStairs />;
};

export const IconStairsInternal = (): ReactElement => {
  return <GiStairs className="stairs-internal-transfer" />;
};
