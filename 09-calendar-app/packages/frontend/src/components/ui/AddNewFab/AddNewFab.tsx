import { FabProperties } from '../../../../../shared/types';
import './styes.css';

export const AddNewFab = ({ onClickHandler }: FabProperties): JSX.Element => {
  return (
    <button
      className=" btn btn-primary fab"
      onClick={() => {
        onClickHandler(true);
      }}
    >
      <i className="fas fa-plus" />
    </button>
  );
};
