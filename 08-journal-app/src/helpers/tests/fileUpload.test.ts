import { fileUpload } from '../fileUpload';

jest.mock('../fileUpload');
const mockedFileUpload = fileUpload as jest.MockedFunction<typeof fileUpload>;

describe('fileUpload test', () => {
  test('Should upload an image and return the image url', async () => {
    const res =
      'https://res.cloudinary.com/jose4125/image/upload/v1629257489/mnok7i0nwzu7bihvoxma.png';
    mockedFileUpload.mockResolvedValue(res);

    const file = new File([], 'image.jpg');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');
    expect(url).toBe(res);
    expect(fileUpload).toHaveBeenCalledTimes(1);
    expect(fileUpload).toHaveBeenCalledWith(file);
  });

  test('Should return a cloudinary error', async () => {
    const errorMessage = 'cloudinary error when trying to upload the image';

    mockedFileUpload.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    expect(mockedFileUpload).toThrow(Error);
    expect(mockedFileUpload).toThrow(errorMessage);
  });
});
