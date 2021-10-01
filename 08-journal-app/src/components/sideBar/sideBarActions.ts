import Swal from 'sweetalert2';
import { AppThunk } from '../utils/types';
import { firebase } from '../firebase/firebase-config';
import { types } from '../auth/constants';
import { AuthAction } from '../auth/interfaces';
import { notesClean } from '../notes/notesActions';

export const logout = (): AuthAction => ({
  type: types.logout,
});

export const startLogout = (): AppThunk => async dispatch => {
  try {
    await firebase.auth().signOut();
    dispatch(logout());
    dispatch(notesClean());
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: error.message });
  }
};
