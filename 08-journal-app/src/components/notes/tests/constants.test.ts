import { types } from '../constants';

describe('test notes constants', () => {
  test('Should have constant action types', () => {
    const testTypes = {
      noteNew: '[notes] new note',
      noteSetActive: '[notes] set active note',
      notesLoad: '[notes] load notes',
      notesSetAll: '[notes] set all',
      noteUpdate: '[notes] update note',
      noteUploadImage: '[notes] upload image',
      noteDelete: '[notes] delete note',
      notesLogoutClean: '[notes] logout clean notes',
    };
    expect(types).toEqual(testTypes);
  });
});
