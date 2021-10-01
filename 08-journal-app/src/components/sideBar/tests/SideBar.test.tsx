import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { initialState } from '../../../testUtils/initialState';
import { storeFactory } from '../../../testUtils/storefactory';
import { startNewNote } from '../../notes/notesActions';
import Sidebar from '../Sidebar';
import { startLogout } from '../sideBarActions';

jest.mock('../sideBarActions', () => ({
  startLogout: jest.fn(),
}));

jest.mock('../../notes/notesActions', () => ({
  startNewNote: jest.fn(),
  startNotesLoad: jest.fn(),
}));

describe('test Sidebar', () => {
  const store = storeFactory(initialState);
  store.dispatch = jest.fn();

  const wrapper = mount(
    <Provider store={store}>
      <Sidebar />
    </Provider>,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('should call handleLogout', () => {
    test('should call startLogout action', () => {
      const logoutButton = wrapper.find('button[data-test="sidebar-logout"]');
      logoutButton.simulate('click');

      expect(startLogout).toHaveBeenCalled();
    });
  });

  describe('should call handleAddNote', () => {
    test('should call startNewNote action', () => {
      const newEntryButton = wrapper.find(
        'button[data-test="sidebar-new-entry"]',
      );
      newEntryButton.simulate('click');

      expect(startNewNote).toHaveBeenCalled();
    });
  });
});
