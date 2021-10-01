import { types } from './constants';
import { Note, NotesAction, NotesObject } from './interfaces';

const initialState: NotesObject = {
  notes: [],
  activeNote: {
    id: '',
    title: '',
    body: '',
    imageUrl: '',
    date: 0,
  },
};

const notesReducer = (
  state = initialState,
  { type, payload }: NotesAction,
): NotesObject => {
  switch (type) {
    case types.noteNew:
      return { ...state, notes: [<Note>payload, ...state.notes] };
    case types.noteSetActive:
      return { ...state, activeNote: <Note>{ ...payload } };
    case types.notesSetAll:
      return { ...state, notes: [...(payload as Note[])] };
    case types.noteUpdate: {
      const notes = state.notes.map(note => {
        const updatedNote = payload as Note;
        if (note.id === updatedNote.id) {
          return updatedNote;
        }
        return note;
      });

      return { ...state, notes };
    }
    case types.noteDelete: {
      const activeNote = payload as Note;
      const notes = state.notes.filter(note => note.id !== activeNote.id);
      return {
        ...state,
        activeNote: initialState.activeNote,
        notes,
      };
    }
    case types.notesLogoutClean:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default notesReducer;
