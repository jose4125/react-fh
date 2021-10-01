import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { initialStateLogout } from '../../../testUtils/initialState';
import { storeFactory } from '../../../testUtils/storefactory';
import LoginScreen from '../LoginScreen';
import { startLoginEmailPassword, startLogingWithGoogle } from '../authActions';

jest.mock('../authActions', () => ({
  startLogingWithGoogle: jest.fn(),
  startLoginEmailPassword: jest.fn(),
}));

describe('test loginSceen', () => {
  let wrapper;
  const store = storeFactory(initialStateLogout);
  store.dispatch = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </Provider>,
    );
  });

  describe('test handleLogin', () => {
    test('should dispatch startLoginEmailPassword action', () => {
      wrapper
        .find('[data-test="login-form"]')
        .simulate('submit', { preventDefault() {} });

      expect(startLoginEmailPassword).toHaveBeenCalled();
      expect(startLoginEmailPassword).toHaveBeenCalledWith('', '');
    });
  });

  describe('test handleLoginWithGoogle', () => {
    test('should dispatch startLogingWithGoogle action', () => {
      const button = wrapper.find('button[data-test="login-with-google"]');
      button.simulate('click');

      expect(startLogingWithGoogle).toHaveBeenCalled();
    });
  });
});
