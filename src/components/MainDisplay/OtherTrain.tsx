import { ReactElement } from 'react';
import { BsFillCaretUpFill, BsFillCaretLeftFill, BsFillCaretRightFill, BsFillCaretDownFill } from 'react-icons/bs';

interface Props {
  text: string;
  isLandscape: boolean;
  sameDirection: boolean;
}

const OtherTrain = ({ text, isLandscape, sameDirection }: Props): ReactElement => {
  const sameDirectionArrow = isLandscape ?
    <BsFillCaretLeftFill className="direction-tri" /> :
    <BsFillCaretUpFill className="direction-tri" />;
  const oppDirectionArrow = isLandscape ?
    <BsFillCaretRightFill className="direction-tri" /> :
    <BsFillCaretDownFill className="direction-tri" />;
  return (
    <div className={`other-train-2 ${sameDirection ? 'same-direction' : 'other-direction'}`}>
      {
        sameDirection && sameDirectionArrow
      }
      <div className="other-train">
        <p>{text}</p>
      </div>
      {
        !sameDirection && oppDirectionArrow
      }
    </div>
  );
};

export default OtherTrain;
