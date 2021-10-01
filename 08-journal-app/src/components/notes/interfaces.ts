export interface Note {
  id?: string;
  title?: string;
  body?: string;
  imageUrl?: string;
  date?: Date | number;
}

export interface NotesObject {
  notes: Note[];
  activeNote: Note;
}

export interface NotesAction {
  type: string;
  payload?: Note | Note[];
}
