import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../button/Button';
import { startSaveNote, startUploadImage } from '../notes/notesActions';
import { RootState } from '../utils/types';

const NoteAppBar = (): JSX.Element => {
  const dispatch = useDispatch();
  const { activeNote } = useSelector(({ notes }: RootState) => notes);
  const inputFile = useRef<HTMLInputElement>(null);

  const handleSaveNote = () => {
    dispatch(startSaveNote(activeNote));
  };

  const handleUploadImage = () => {
    inputFile.current?.click();
  };

  const handleFileChange = () => {
    if (inputFile.current?.files) {
      const file = inputFile.current.files[0];
      dispatch(startUploadImage(file));
    }
  };

  return (
    <div className="notes__appbar">
      <input
        type="file"
        name="file"
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <span>28 August 2020</span>
      <div>
        <Button className="btn" onClick={handleUploadImage}>
          Picture
        </Button>
        <Button className="btn" onClick={handleSaveNote}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default NoteAppBar;
