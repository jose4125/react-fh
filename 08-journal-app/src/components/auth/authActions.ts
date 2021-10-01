import Swal from 'sweetalert2';
import { finishLoading, startLoading } from '../../globalActions';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { AppThunk } from '../utils/types';
import { AuthAction, Payload, RegisterParams } from './interfaces';
import { types } from './constants';

export const login = (userData: Payload): AuthAction => ({
  type: types.login,
  payload: userData,
});

export const startLoginEmailPassword =
  (email: string, password: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(startLoading());
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      dispatch(login({ uid: user?.uid, displayName: user?.displayName }));
      dispatch(finishLoading());
    } catch (error) {
      dispatch(finishLoading());
      Swal.fire({ icon: 'error', title: 'Oops...', text: error.message });
    }
  };

export const authProvider = async (
  authProvider: firebase.auth.GoogleAuthProvider,
): Promise<firebase.User | null> => {
  const { user } = await firebase.auth().signInWithPopup(authProvider);
  return user;
};

export const startLogingWithGoogle = (): AppThunk => async dispatch => {
  try {
    const user = await authProvider(googleAuthProvider);
    dispatch(login({ uid: user?.uid, displayName: user?.displayName }));
  } catch (error) {
    console.log('error', error);
    // TODO: se rompe cuando no hay internet
    Swal.fire({ icon: 'error', title: 'Oops...', text: error.message });
  }
};

export const starRegisterWithNameEmailPassword =
  ({ email, password, name }: RegisterParams): AppThunk =>
  async dispatch => {
    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await user?.updateProfile({ displayName: name });
      dispatch(login({ uid: user?.uid, displayName: user?.displayName }));
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: error.message });
    }
  };
