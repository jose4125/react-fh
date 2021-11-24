import { Event, EventProps } from "react-big-calendar";

interface UserEvent {
  _id: string;
  name: string;
}
export interface EventCal extends Event {
  bgColor: string;
  notes: string;
  user: UserEvent;
}

export interface EventPropsCal extends EventProps {
  event: EventCal;
}
