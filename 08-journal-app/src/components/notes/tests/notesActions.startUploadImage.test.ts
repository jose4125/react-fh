import { fileUpload } from '../../../helpers/fileUpload';
import { initialState } from '../../../testUtils/initialState';
import { storeFactory } from '../../../testUtils/storefactory';
import { startUploadImage } from '../notesActions';

global.scrollTo = jest.fn();
jest.mock('../../../helpers/fileUpload');
const mockedFileUpload = fileUpload as jest.MockedFunction<typeof fileUpload>;

describe('test notesActions', () => {
  describe('test startUploadImage', () => {
    test('should upload an image', async () => {
      const res =
        'https://res.cloudinary.com/jose4125/image/upload/v1629257489/mnok7i0nwzu7bihvoxma.png';

      mockedFileUpload.mockResolvedValue(res);

      const file = new File([], 'image.jpg');
      const newNote = {
        id: 'qwer1234',
        title: 'post 1',
        body: 'post description',
        date: 1,
      };

      initialState.notes.activeNote = newNote;
      const store = storeFactory(initialState);

      await store.dispatch(startUploadImage(file));

      const { activeNote } = store.getState().notes;

      const activeNoteWithImage = {
        ...newNote,
        imageUrl: res,
      };

      expect(activeNote).toEqual(activeNoteWithImage);
      expect(activeNote.imageUrl).toBe(activeNoteWithImage.imageUrl);
    });
  });
});
