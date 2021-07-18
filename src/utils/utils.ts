import { Line, lineInfo } from '../data/hashedByCode';

// 1-index
export const getFlippedDoorIndex = (index: number, line: Line): number => {
  const { numCarraiges, numDoors } = lineInfo(line);
  console.log('getFlippedDoor for', index, numCarraiges * numDoors - index + 1);
  return numCarraiges * numDoors - index + 1;
};
