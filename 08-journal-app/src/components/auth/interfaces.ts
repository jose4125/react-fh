type Name = string | null;

export interface Payload {
  uid?: string;
  displayName?: Name;
}

export interface AuthAction {
  type: string;
  payload?: Payload;
}

export interface AuthObject {
  uid?: string;
  name?: Name;
}

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
}
