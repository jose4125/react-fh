/** * @jest-environment node */
import configureStore from 'redux-mock-store'; //only test actions, it does not update the Redux store
import thunk from 'redux-thunk';
import { addActiveNote, cleanTestDB } from '../../../helpers/loadNotes';
import { initialState } from '../../../testUtils/initialState';
import { storeFactory } from '../../../testUtils/storefactory';
import { types } from '../constants';
import {
  noteNew,
  removeNote,
  setNotes,
  startNewNote,
  startNotesLoad,
  startRemoveNote,
  startSaveNote,
  startSetActiveNote,
  startUploadImage,
  updateNote,
} from '../notesActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('test notesActions', () => {
  describe('test startNewNote', () => {
    const payload = {
      id: expect.any(String),
      title: '',
      body: '',
      date: expect.any(Number),
    };

    beforeEach(async () => {
      await cleanTestDB(initialState.auth.uid);
    });

    afterEach(async () => {
      await cleanTestDB(initialState.auth.uid);
    });

    test('should start a new note', async () => {
      const store = mockStore(initialState);
      const startSetActiveNoteAction = {
        type: types.noteSetActive,
        payload,
      };

      const startNewNoteAction = {
        type: types.noteNew,
        payload,
      };

      await store.dispatch(startNewNote());

      const actions = store.getActions();

      expect(actions[0]).toEqual(startSetActiveNoteAction);
      expect(actions[1]).toEqual(startNewNoteAction);
    });

    test('should update the active note state, integration test', async () => {
      const store = storeFactory(initialState);
      await store.dispatch(startNewNote());

      const newState = store.getState().notes.activeNote;

      expect(newState).toEqual(payload);
    });
  });

  describe('test startSetActiveNote', () => {
    test('should return a startSetActiveNote action', () => {
      const note = {
        id: 'asd123f',
        title: '',
        body: '',
        date: 1,
      };

      const startSetActiveNoteAction = {
        type: types.noteSetActive,
        payload: {
          id: expect.any(String),
          title: '',
          body: '',
          date: expect.any(Number),
        },
      };

      const action = startSetActiveNote(note.id, note);

      expect(action).toEqual(startSetActiveNoteAction);
    });
  });

  describe('test noteNew', () => {
    test('should return a noteNew action', () => {
      const note = {
        id: 'asd123f',
        title: 'test 1',
        body: 'test 1 description',
        date: 123,
      };

      const noteNewAction = {
        type: types.noteNew,
        payload: {
          id: expect.any(String),
          title: expect.any(String),
          body: expect.any(String),
          date: expect.any(Number),
        },
      };

      const action = noteNew(note);

      expect(action).toEqual(noteNewAction);
    });
  });

  describe('test startNotesLoad', () => {
    beforeEach(async () => {
      await cleanTestDB(initialState.auth.uid);
    });

    afterEach(async () => {
      await cleanTestDB(initialState.auth.uid);
    });

    test('Should get all notes', async () => {
      const store = mockStore(initialState);
      const { uid } = store.getState().auth;

      const setNotesAction = {
        type: types.notesSetAll,
        payload: expect.any(Array),
      };

      await store.dispatch(startNotesLoad(uid));
      const actions = store.getActions();

      expect(actions[0]).toEqual(setNotesAction);
    });

    test('should update the notes state, integration test', async () => {
      const newNote = {
        title: 'post 1',
        body: 'post description',
        date: 1,
      };
      const store = storeFactory(initialState);
      const { uid } = store.getState().auth;

      const noteId = await addActiveNote(uid, newNote);
      await store.dispatch(startNotesLoad(uid));
      const { notes } = store.getState().notes;
      newNote.id = noteId;

      expect(notes).toEqual([newNote]);
      expect(notes).toHaveLength(1);
    });
  });

  describe('test setNotes', () => {
    test('should return a setNotes action', () => {
      const newNote = [
        {
          title: 'post 1',
          body: 'post description',
          date: 1,
        },
      ];
      const newNoteAction = {
        type: types.notesSetAll,
        payload: newNote,
      };

      const action = setNotes(newNote);

      expect(action).toEqual(newNoteAction);
    });
  });

  describe('test updateNote', () => {
    test('should return a updateNote action', () => {
      const note = {
        id: 'asd123f',
        title: 'test 1',
        body: 'test 1 description',
        date: 123,
      };

      const updateNoteAction = {
        type: types.noteUpdate,
        payload: {
          id: expect.any(String),
          title: expect.any(String),
          body: expect.any(String),
          date: expect.any(Number),
        },
      };

      const action = updateNote(note);

      expect(action).toEqual(updateNoteAction);
    });
  });

  describe('test startSaveNote', () => {
    beforeEach(async () => {
      await cleanTestDB(initialState.auth.uid);
    });

    afterEach(async () => {
      await cleanTestDB(initialState.auth.uid);
    });

    test('should save note', async () => {
      const note = {
        id: expect.any(String),
        title: expect.any(String),
        body: expect.any(String),
        image: expect.any(String),
        date: expect.any(Number),
      };
      const updateNoteAction = {
        type: types.noteUpdate,
        payload: note,
      };
      const store = mockStore(initialState);

      await store.dispatch(updateNote(note));
      const actions = store.getActions();

      expect(actions[0]).toEqual(updateNoteAction);
      expect(actions[0].type).toBe(updateNoteAction.type);
    });

    test('should update an existing note and update the notes state, integration test', async () => {
      const newNote = {
        title: 'post 1',
        body: 'post description',
        date: 1,
      };
      const store = storeFactory(initialState);

      await store.dispatch(startNewNote());
      const noteId = store.getState().notes.notes[0].id;
      const updatedNote = {
        ...newNote,
        id: noteId,
        title: 'post 1 updated',
      };

      await store.dispatch(startSaveNote(updatedNote));

      const { notes } = store.getState().notes;

      expect(notes).toEqual([updatedNote]);
      expect(notes).toHaveLength(1);
      expect(notes[0].title).toBe(updatedNote.title);
    });
  });

  describe('tets removeNote', () => {
    test('should return removeNote action', () => {
      const newNote = {
        id: 'qwer1234',
        title: 'post 1',
        body: 'post description',
        date: 1,
      };

      const removeNoteAction = {
        type: types.noteDelete,
        payload: newNote,
      };

      const action = removeNote(newNote);

      expect(action).toEqual(removeNoteAction);
    });
  });

  describe('test startRemoveNote', () => {
    beforeEach(async () => {
      await cleanTestDB(initialState.auth.uid);
    });

    afterEach(async () => {
      await cleanTestDB(initialState.auth.uid);
    });

    test('should start deleting notes and call removeNote', async () => {
      const notes = [
        {
          id: 'qwer1234',
          title: 'post 1',
          body: 'post description',
          date: 1,
        },
      ];
      const removeNoteAction = {
        type: types.noteDelete,
        payload: notes[0],
      };

      const { activeNote } = initialState.notes;

      const initialStateWithNotes = {
        ...initialState,
        notes: {
          notes,
          activeNote: {
            ...activeNote,
          },
        },
      };
      const store = mockStore(initialStateWithNotes);

      await store.dispatch(startRemoveNote(notes[0]));
      const actions = store.getActions();

      expect(actions[0]).toEqual(removeNoteAction);
    });

    test('should remove the note and update the state, integration test', async () => {
      const store = storeFactory(initialState);

      await store.dispatch(startNewNote());
      const note = store.getState().notes.notes[0];

      await store.dispatch(startRemoveNote(note));
      const notes = store.getState().notes.notes;

      expect(notes).toHaveLength(0);
    });
  });
  // TODO: hacer test de los catch
});
