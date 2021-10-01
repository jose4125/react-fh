import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JournalEntry from '../journalEntry/JournalEntry';
import { startNotesLoad } from '../notes/notesActions';
import { RootState } from '../utils/types';

const JournalEntries = (): JSX.Element => {
  const { notes } = useSelector(({ notes }: RootState) => notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startNotesLoad());
  }, []);

  return (
    <div className="journal__entries">
      {notes.length > 0 &&
        notes.map(note => <JournalEntry key={note.id} {...note} />)}
    </div>
  );
};

export default JournalEntries;
