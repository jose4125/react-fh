import { Event, EventProps } from "react-big-calendar";

interface UserEvent {
  _id: string;
  name: string;
}

export interface EventCal extends Event {
  id?: string;
  notes: string;
  user?: UserEvent;
}

export interface EventPropertiesCal extends EventProps {
  event: EventCal;
}

export interface CheckDatesError {
  error: boolean;
  title: string;
  msg: string;
  type: "" | "error";
}

export interface EventCalState {
  events: EventCal[];
  activeEvent: EventCal;
}

export interface CalendarAction {
  type: string;
  payload?: EventCal;
}

export interface CalendarModalProperties {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export interface FabProperties {
  onClickHandler: (prop: boolean) => void;
}
