import { FabProperties } from '../../../../../shared/types';
import './styes.css';

export const DeleteEventFab = ({
  onClickHandler,
}: FabProperties): JSX.Element => {
  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={() => {
        onClickHandler(true);
      }}
    >
      <i className=" fas fa-trash" />
      <span>Remove Event</span>
    </button>
  );
};
