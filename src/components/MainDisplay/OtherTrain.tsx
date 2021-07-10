import { ReactElement } from 'react';

interface Props {
  terminus: string;
}

const OtherTrain = ({ terminus }: Props): ReactElement => {
  return (
    <div className="other-train">
      <p>Train towards {terminus}</p>
    </div>
  );
};

export default OtherTrain;
