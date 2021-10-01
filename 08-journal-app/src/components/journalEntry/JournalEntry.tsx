import format from 'date-fns/format';
import { useDispatch } from 'react-redux';
import { Note } from '../notes/interfaces';
import { startSetActiveNote } from '../notes/notesActions';

const JournalEntry = ({
  id,
  title,
  body,
  imageUrl,
  date,
}: Note): JSX.Element => {
  const dispatch = useDispatch();
  const dayName = format(date as Date, 'EEEE');
  const dateNumber = format(date as Date, 'do');

  const handleActiveNote = () => {
    dispatch(
      startSetActiveNote(id as string, {
        title,
        body,
        imageUrl,
        date,
      }),
    );
  };
  return (
    <div
      className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
      onClick={handleActiveNote}
      data-test={`note-${id}`}
    >
      {imageUrl && (
        <picture className="journal__entry-picture">
          <img
            className="journal__entry-image"
            src={imageUrl}
            alt={`journal image ${title}`}
          />
        </picture>
      )}
      <div className="journal__entry-body">
        <h3 className="journal__entry-title">{title}</h3>
        <p className="journal__entry-content">{body}</p>
      </div>
      <div className="journal__entry-date-box">
        <span>{dayName}</span>
        <p>{dateNumber}</p>
      </div>
    </div>
  );
};

export default JournalEntry;
