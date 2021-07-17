import { ReactElement } from 'react';
import { BsFillCaretUpFill, BsFillCaretLeftFill, BsFillCaretRightFill, BsFillCaretDownFill } from 'react-icons/bs';

interface Props {
  text: string;
  isLandscape: boolean;
  sameDirection: null | boolean;
}

const SpecialTrack = ({ text, isLandscape, sameDirection }: Props): ReactElement => {
  const sameDirectionArrow = isLandscape ?
    <BsFillCaretLeftFill className="direction-tri" /> :
    <BsFillCaretUpFill className="direction-tri" />;
  const oppDirectionArrow = isLandscape ?
    <BsFillCaretRightFill className="direction-tri" /> :
    <BsFillCaretDownFill className="direction-tri" />;
  let directionClass;
  if (sameDirection == null) {
    directionClass = 'no-direction';
  } else {
    directionClass = sameDirection ? 'same-direction' : 'other-direction';
  }
  return (
    <div className={`other-train-2 ${directionClass}`}>
      {
        sameDirection != null && sameDirection && sameDirectionArrow
      }
      <div className="other-train">
        <p>{text}</p>
      </div>
      {
        sameDirection != null && !sameDirection && oppDirectionArrow
      }
    </div>
  );
};

export default SpecialTrack;
