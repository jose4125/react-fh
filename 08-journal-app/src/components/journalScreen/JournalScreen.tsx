import { useSelector } from 'react-redux';
import NoteScreen from '../notes/NoteScreen';
import NothingSelected from '../nothingSelected/NothingSelected';
import Sidebar from '../sideBar/Sidebar';
import { RootState } from '../utils/types';

const JournalScreen = (): JSX.Element => {
  const { activeNote } = useSelector(({ notes }: RootState) => notes);
  return (
    <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
      <Sidebar />
      <main>{activeNote.id ? <NoteScreen /> : <NothingSelected />}</main>
    </div>
  );
};

export default JournalScreen;
