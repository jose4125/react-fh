import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { initialStateWithNotes } from '../../../testUtils/initialState';
import { storeFactory } from '../../../testUtils/storefactory';
import { startSetActiveNote } from '../../notes/notesActions';
import JournalEntry from '../JournalEntry';

jest.mock('../../notes/notesActions', () => ({
  startSetActiveNote: jest.fn(),
}));

describe('test JournalEntry', () => {
  const store = storeFactory(initialStateWithNotes);
  store.dispatch = jest.fn();
  const { notes } = initialStateWithNotes.notes;
  const activeNote = notes[1];
  const wrapper = mount(
    <Provider store={store}>
      <JournalEntry {...activeNote} />
    </Provider>,
  );

  describe('test handleActiveNote', () => {
    test('should call startSetActiveNote action', () => {
      const noteDiv = wrapper.find(`[data-test="note-${activeNote.id}"]`);
      const { title, body, imageUrl, date } = activeNote;
      const note = {
        title,
        body,
        imageUrl,
        date,
      };
      noteDiv.simulate('click');

      expect(startSetActiveNote).toHaveBeenCalled();
      expect(startSetActiveNote).toHaveBeenCalledWith(activeNote.id, note);
    });
  });
});
