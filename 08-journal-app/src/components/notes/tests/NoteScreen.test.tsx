import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { initialStateWithNewNote } from '../../../testUtils/initialState';
import { storeFactory } from '../../../testUtils/storefactory';
import { startSetActiveNote, startRemoveNote } from '../notesActions';
import NoteScreen from '../NoteScreen';

jest.mock('../notesActions', () => ({
  startSetActiveNote: jest.fn(),
  startRemoveNote: jest.fn(),
}));

describe('test NoteScreen', () => {
  const store = storeFactory(initialStateWithNewNote);
  store.dispatch = jest.fn();
  const wrapper = mount(
    <Provider store={store}>
      <NoteScreen />
    </Provider>,
  );
  describe('test active note change values', () => {
    test('should call startSetActiveNote action', () => {
      const { activeNote } = initialStateWithNewNote.notes;
      const newActiveNote = {
        ...activeNote,
        title: 'hello world',
        body: 'hello world copy',
      };
      const titleInput = wrapper.find('input[data-test="note-title"]');
      const bodyTeaxtarea = wrapper.find('textarea[data-test="note-body"]');
      titleInput.simulate('change', {
        target: {
          name: 'title',
          value: newActiveNote.title,
        },
      });
      bodyTeaxtarea.simulate('change', {
        target: {
          name: 'body',
          value: newActiveNote.body,
        },
      });

      expect(startSetActiveNote).toHaveBeenCalled();
      expect(startSetActiveNote).toHaveBeenLastCalledWith(
        newActiveNote.id,
        newActiveNote,
      );
    });
  });

  describe('test handleRemoveNote', () => {
    test('should call startRemoveNote action', () => {
      const { activeNote } = initialStateWithNewNote.notes;
      const removeNoteButton = wrapper.find('button[data-test="note-delete"]');
      removeNoteButton.simulate('click');

      expect(startRemoveNote).toHaveBeenCalled();
      expect(startRemoveNote).toHaveBeenCalledWith(activeNote);
    });
  });
});
