import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../button/Button';
import { FormState, useForm } from '../hooks/useForm';
import NoteAppBar from '../noteAppBar/NoteAppBar';
import { RootState } from '../utils/types';
import { startRemoveNote, startSetActiveNote } from './notesActions';

const NoteScreen = (): JSX.Element => {
  const { activeNote } = useSelector(({ notes }: RootState) => notes);
  const { formState, handleInputChange, resetForm } = useForm(activeNote);
  const dispatch = useDispatch();
  const activeId = useRef(activeNote.id);

  useEffect(() => {
    if (activeId.current !== activeNote.id) {
      resetForm(activeNote as FormState);
      activeId.current = activeNote.id;
    }
  }, [activeNote, resetForm]);

  useEffect(() => {
    dispatch(startSetActiveNote(formState.id, formState));
  }, [formState, dispatch]);

  useEffect(() => {
    resetForm(activeNote as FormState);
  }, [activeNote.imageUrl]);

  const { title, body, imageUrl } = formState;

  const handleRemoveNote = () => {
    if (activeNote.id) {
      dispatch(startRemoveNote(activeNote));
    }
  };

  return (
    <div className="notes__main-content">
      <NoteAppBar />
      <div className="notes__content">
        <input
          className="notes__title-input"
          name="title"
          type="text"
          placeholder="Awesome title"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
          data-test="note-title"
        />
        <textarea
          className="notes__textarea"
          name="body"
          placeholder="What happen today?"
          value={body}
          onChange={handleInputChange}
          data-test="note-body"
        ></textarea>
        {imageUrl && (
          <div className="notes__image">
            <img src={imageUrl} alt="" />
          </div>
        )}
      </div>
      <Button
        className="btn btn-danger"
        onClick={handleRemoveNote}
        data-test="note-delete"
      >
        Delete
      </Button>
    </div>
  );
};

export default NoteScreen;
