import { Note } from '../components/notes/interfaces';

export const initialState = {
  auth: {
    uid: 'testingId',
  },
  ui: {
    loading: false,
  },
  notes: {
    notes: <Note[]>[],
    activeNote: <Note>{
      id: '',
      title: '',
      body: '',
      imageUrl: '',
      date: 0,
    },
  },
};

export const initialStateLogout = {
  auth: {},
  ui: {
    loading: false,
  },
  notes: {
    notes: <Note[]>[],
    activeNote: <Note>{
      id: '',
      title: '',
      body: '',
      imageUrl: '',
      date: 0,
    },
  },
};

export const initialStateWithNewNote = {
  auth: {
    uid: 'testingId',
  },
  ui: {
    loading: false,
  },
  notes: {
    notes: <Note[]>[],
    activeNote: <Note>{
      id: 'qwer1234',
      title: '',
      body: '',
      imageUrl: '',
      date: 0,
    },
  },
};

export const initialStateWithNotes = {
  auth: {
    uid: 'testingId',
  },
  ui: {
    loading: false,
  },
  notes: {
    notes: <Note[]>[
      {
        id: 'asdf1234qw',
        title: 'hello world',
        body: 'hello world body',
        imageUrl: '',
        date: 1631331999901,
      },
      {
        id: 'qwer1234sdf',
        title: 'this is another note',
        body: 'this is another body',
        imageUrl: '',
        date: 1631331999901,
      },
    ],
    activeNote: <Note>{
      id: '',
      title: '',
      body: '',
      imageUrl: '',
      date: 0,
    },
  },
};
