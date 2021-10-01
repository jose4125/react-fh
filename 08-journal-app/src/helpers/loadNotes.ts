import 'firebase/firestore';
import Swal from 'sweetalert2';
import { db } from '../components/firebase/firebase-config';
import { Note } from '../components/notes/interfaces';

export const loadNotes = async (uid: string): Promise<Note[]> => {
  let notes: Note[] = [];
  try {
    const notesSnap = await db.collection(`${uid}/journal/notes`).get();

    notesSnap.forEach(note => {
      const noteData = note.data();
      const noteWithId = <Note>{ ...noteData, id: note.id };
      notes = [...notes, noteWithId];
    });
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: error.message });
  }
  return notes;
};

export const addActiveNote = async (
  uid: string,
  newNote: Note,
): Promise<string> => {
  try {
    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
    return doc.id;
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: error.message });
  }
  return '';
};

const cleanNote = (note: Note): Note => {
  const noteToFirestore = { ...note };
  delete noteToFirestore.id;

  if (!note.imageUrl) {
    delete noteToFirestore.imageUrl;
  }

  return noteToFirestore;
};

export const saveNote = async (uid: string, note: Note): Promise<boolean> => {
  try {
    await db.doc(`${uid}/journal/notes/${note.id}`).update(cleanNote(note));
    return true;
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: error.message });
  }
  return false;
};

export const removeNoteDb = async (
  uid: string,
  noteId: string,
): Promise<boolean | undefined> => {
  try {
    await db.doc(`${uid}/journal/notes/${noteId}`).delete();
    return true;
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: error.message });
  }
};

export const cleanTestDB = async (uid: string): Promise<void> => {
  const notes = await loadNotes(uid);

  if (notes.length) {
    notes.forEach(async note => {
      await db.doc(`${uid}/journal/notes/${note.id}`).delete();
    });
  }
};
