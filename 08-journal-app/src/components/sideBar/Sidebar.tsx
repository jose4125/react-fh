import { useDispatch, useSelector } from 'react-redux';
import Button from '../button/Button';
import JournalEntries from '../journalEntries/JournalEntries';
import { startNewNote } from '../notes/notesActions';
import { RootState } from '../utils/types';
import { startLogout } from './sideBarActions';

const Sidebar = (): JSX.Element => {
  const dispatch = useDispatch();
  const { name } = useSelector(({ auth }: RootState) => auth);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleAddNote = () => {
    dispatch(startNewNote());
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon" />
          <span>{name}</span>
        </h3>
        <Button
          className="btn"
          onClick={handleLogout}
          data-test="sidebar-logout"
        >
          Log out
        </Button>
      </div>
      <Button
        className="journal__new-entry"
        onClick={handleAddNote}
        data-test="sidebar-new-entry"
      >
        <i className="far fa-calendar-plus fa-5x" />
        <span className="mt-5">New entry</span>
      </Button>
      <JournalEntries />
    </aside>
  );
};

export default Sidebar;
