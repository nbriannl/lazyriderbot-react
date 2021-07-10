import { ReactElement } from 'react';
import { BsCaretLeftFill, BsFillCaretUpFill } from 'react-icons/bs';

interface Props {
  isLandscape: boolean;
  numCarraiges: number;
  numDoors: number;
  bestDoorIndex: number;
}

const Train = ({ isLandscape, numCarraiges, numDoors, bestDoorIndex }: Props): ReactElement => {
  return (
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
                  const isBestDoor = ((i) * numDoors + j) === bestDoorIndex;
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
  );
};

export default Train;
