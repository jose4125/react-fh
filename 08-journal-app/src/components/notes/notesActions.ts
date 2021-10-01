import Swal from 'sweetalert2';
import { fileUpload } from '../../helpers/fileUpload';
import {
  addActiveNote,
  loadNotes,
  removeNoteDb,
  saveNote,
} from '../../helpers/loadNotes';
import { AppThunk } from '../utils/types';
import { types } from './constants';
import { Note, NotesAction } from './interfaces';

export const startSetActiveNote = (id: string, note: Note): NotesAction => ({
  type: types.noteSetActive,
  payload: {
    id,
    ...note,
  },
});

export const noteNew = (note: Note): NotesAction => ({
  type: types.noteNew,
  payload: note,
});

export const startNewNote = (): AppThunk => async (dispatch, getState) => {
  const { uid } = getState().auth;
  const newNote = {
    title: '',
    body: '',
    date: new Date().getTime(),
  };

  try {
    let docId;

    if (uid) {
      docId = await addActiveNote(uid, newNote);
    }

    if (docId) {
      dispatch(startSetActiveNote(docId, newNote));
      dispatch(noteNew({ ...newNote, id: docId }));
    }
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: error.message });
  }
};

export const setNotes = (notes: Note[]): NotesAction => ({
  type: types.notesSetAll,
  payload: notes,
});

export const startNotesLoad = (): AppThunk => async (dispatch, getState) => {
  const { uid } = getState().auth;
  if (uid) {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  }
};

export const startSaveNote =
  (note: Note): AppThunk =>
  async (dispatch, getState) => {
    const { uid } = getState().auth;

    try {
      let saved;

      if (uid) {
        saved = await saveNote(uid, note);
      }

      if (saved) {
        dispatch(updateNote(note));
        Swal.fire({
          icon: 'success',
          title: 'Note saved',
          text: `${note.title}`,
        });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: error.message });
    }
  };

export const updateNote = (note: Note): NotesAction => ({
  type: types.noteUpdate,
  payload: note,
});

export const startUploadImage =
  (image: File): AppThunk =>
  async (dispatch, getState) => {
    const { activeNote } = getState().notes;

    try {
      Swal.fire({
        title: 'Uploding image...',
        text: image.name,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const imageUrl = await fileUpload(image);

      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'remember to save the note!!!',
        text: image.name,
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      if (typeof imageUrl === 'string') {
        activeNote.imageUrl = imageUrl;
      }

      if (activeNote.id) {
        dispatch(startSetActiveNote(activeNote.id, activeNote));
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: error.message });
    }
  };

export const removeNote = (note: Note): NotesAction => ({
  type: types.noteDelete,
  payload: note,
});

export const startRemoveNote =
  (note: Note): AppThunk =>
  async (dispatch, getState) => {
    const { uid } = getState().auth;

    try {
      let removed;
      if (uid && note.id) {
        removed = await removeNoteDb(uid, note.id);
      }

      if (removed) {
        dispatch(removeNote(note));
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: error.message });
    }
  };

export const notesClean = (): NotesAction => ({
  type: types.notesLogoutClean,
});
