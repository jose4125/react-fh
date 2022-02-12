import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import add from 'date-fns/add';
import set from 'date-fns/set';
import isAfter from 'date-fns/isAfter';
import isEqual from 'date-fns/isEqual';
import Swal, { SweetAlertIcon } from 'sweetalert2';

import {
  addNewEvent,
  cleanActiveEvent,
  setActiveEvent,
  updateEvent,
} from './calendarActions';
import { RootState } from '../../utils/types';
import {
  CalendarAction,
  CalendarModalProperties,
  CheckDatesError,
  EventCal,
} from '@calendar/shared/src/calendar/types';

import './modal.css';
import { format } from 'date-fns';

type formChangeEvents =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zindex: '4',
  },
};

Modal.setAppElement('#root');

const initialDate = add(set(new Date(), { minutes: 0, seconds: 0 }), {
  hours: 1,
});

const initialEndDate = add(initialDate, { hours: 1 });
const initFromValues = {
  title: '',
  notes: '',
  start: initialDate,
  end: initialEndDate,
};

const showErrorAlert = ({ title, msg, type }: CheckDatesError) => {
  console.log('show alert');
  Swal.fire(title, msg, type as SweetAlertIcon);
};

export const CalendarModal = ({
  isModalOpen,
  onCloseModal,
}: CalendarModalProperties): ReactElement => {
  const [startDate, setStartDate] = useState<Date>(initialDate);
  const [endDate, setEndDate] = useState<Date>(initialEndDate);
  const [formValues, setFormValues] = useState<EventCal>(initFromValues);
  const [areDatesValid, setAreDatesValid] = useState<boolean>(true);
  const [isTitleValid, setIsTitleValid] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { activeEvent } = useSelector(({ calendar }: RootState) => calendar);

  const { title, notes } = formValues;

  useEffect(() => {
    const { start, end } = activeEvent;
    console.log('activeEvent', activeEvent);

    if (start) {
      setFormValues(activeEvent);
      setStartDate(start as Date);
      setEndDate(end as Date);
    }

    if (!start) {
      cleanFormValues();
    }
  }, [activeEvent]);

  const handleInputChange = ({ target }: formChangeEvents): void => {
    const name = target.name;
    const value = target.value;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleStartDateChange = (event: Date) => {
    setStartDate(event);
    setFormValues({
      ...formValues,
      start: event,
    });
  };

  const handleEndDateChange = (event: Date) => {
    setEndDate(event);
    setFormValues({
      ...formValues,
      end: event,
    });
  };

  const checkDates = (start: Date, end: Date): CheckDatesError => {
    if (isEqual(start, end) || isAfter(start, end)) {
      return {
        error: true,
        title: 'Error',
        msg: 'The end date must be greater than the start date',
        type: 'error',
      };
    }

    return { error: false, title: '', msg: '', type: '' };
  };

  const cleanFormValues = () => {
    setFormValues(initFromValues);
    setStartDate(initialDate);
    setEndDate(initialEndDate);
  };

  const sendEvent = (
    eventAction: (event: EventCal) => CalendarAction,
    activeEvent?: EventCal,
  ) => {
    setIsTitleValid(true);
    setAreDatesValid(true);
    // TODO: BORRAR
    formValues.id = activeEvent?.id || Date.now().toString();
    dispatch(eventAction(formValues));
    onCloseModal();
    cleanFormValues();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { start, end } = formValues;
    const hasDatesError = checkDates(start as Date, end as Date);
    let hasTitleError = false;

    const { error } = hasDatesError;

    if (error) {
      showErrorAlert(hasDatesError);
      setAreDatesValid(false);
    }

    if ((formValues.title?.length as number) < 2) {
      setIsTitleValid(false);
      hasTitleError = true;
    }

    if (activeEvent.id && !error && !hasTitleError) {
      sendEvent(updateEvent, activeEvent);
      return;
    }

    if (!error && !hasTitleError) {
      sendEvent(addNewEvent);
    }
  };

  const handleCloseModal = () => {
    onCloseModal();
    cleanFormValues();

    if (activeEvent.title) {
      dispatch(cleanActiveEvent());
    }
  };

  // const afterOpenModal = () => {
  //   console.log('after open modal');
  // };
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> {activeEvent.id ? 'Update event' : 'New event'} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="form-control">Start date</label>
          <DateTimePicker
            className="form-control"
            onChange={handleStartDateChange}
            value={startDate}
            minDate={initialDate}
          />
        </div>

        <div className="form-group">
          <label htmlFor="form-control">End date</label>
          <DateTimePicker
            className={`form-control ${!areDatesValid && 'is-invalid'}`}
            onChange={handleEndDateChange}
            value={endDate}
            minDate={startDate}
          />
        </div>

        <hr />
        <div className="form-group">
          <label htmlFor="form-control">Title and notes</label>
          <input
            type="text"
            className={`form-control ${!isTitleValid && 'is-invalid'}`}
            placeholder="Títle and notes"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            this must be a short description
          </small>
        </div>

        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save" />
          <span> Save</span>
        </button>
      </form>
    </Modal>
  );
};
