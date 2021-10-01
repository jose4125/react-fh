import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { initialStateLogout } from '../../../testUtils/initialState';
import { storeFactory } from '../../../testUtils/storefactory';
import { starRegisterWithNameEmailPassword } from '../authActions';
import RegisterScreen from '../RegisterScreen';

jest.mock('../authActions.ts', () => ({
  starRegisterWithNameEmailPassword: jest.fn(),
}));

describe('test RegisterScreen', () => {
  describe('test handleRegisterSubmit', () => {
    const store = storeFactory(initialStateLogout);
    store.dispatch = jest.fn();
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <RegisterScreen />
        </Provider>
      </MemoryRouter>,
    );

    test('should dispatch starRegisterWithNameEmailPassword action', () => {
      wrapper
        .find('input[data-test="register-name"]')
        .simulate('change', { target: { name: 'name', value: 'jose' } });
      wrapper
        .find('input[data-test="register-email"]')
        .simulate('change', { target: { name: 'email', value: 'j@j.com' } });
      wrapper
        .find('input[data-test="register-password"]')
        .simulate('change', { target: { name: 'password', value: '123456' } });
      wrapper
        .find('input[data-test="register-confirm-password"]')
        .simulate('change', {
          target: { name: 'confirmPassword', value: '123456' },
        });
      wrapper
        .find('[data-test="register-form"]')
        .simulate('submit', { preventDefault() {} });

      expect(starRegisterWithNameEmailPassword).toHaveBeenCalled();
    });

    describe('test handleRegisterSubmit errors', () => {
      const store = storeFactory(initialStateLogout);
      store.dispatch = jest.fn();
      const wrapper = mount(
        <MemoryRouter>
          <Provider store={store}>
            <RegisterScreen />
          </Provider>
        </MemoryRouter>,
      );

      test('should show the form errors', () => {
        wrapper
          .find('[data-test="register-form"]')
          .simulate('submit', { preventDefault() {} });

        const errors = wrapper.find('[data-test="register-error"]');

        expect(errors).toHaveLength(4);
        expect(errors.at(0).text()).toBe('Name is required');
        expect(errors.at(1).text()).toBe('Email is required');
        expect(errors.at(2).text()).toBe('Email is not valid');
        expect(errors.at(3).text()).toBe(
          'password and confirmPassword are required and should be the same',
        );
      });

      test('should show the confirm password error', () => {
        wrapper
          .find('input[data-test="register-name"]')
          .simulate('change', { target: { name: 'name', value: 'jose' } });
        wrapper
          .find('input[data-test="register-email"]')
          .simulate('change', { target: { name: 'email', value: 'j@j.com' } });
        wrapper
          .find('input[data-test="register-password"]')
          .simulate('change', {
            target: { name: 'password', value: '123456' },
          });
        wrapper
          .find('input[data-test="register-confirm-password"]')
          .simulate('change', {
            target: { name: 'confirmPassword', value: '1234567' },
          });
        wrapper
          .find('[data-test="register-form"]')
          .simulate('submit', { preventDefault() {} });

        const errors = wrapper.find('[data-test="register-error"]');

        expect(errors).toHaveLength(1);
        expect(errors.at(0).text()).toBe(
          'password and confirmPassword are required and should be the same',
        );
      });

      test('should show the invalid email error', () => {
        wrapper
          .find('input[data-test="register-name"]')
          .simulate('change', { target: { name: 'name', value: 'jose' } });
        wrapper
          .find('input[data-test="register-email"]')
          .simulate('change', { target: { name: 'email', value: 'j@j.' } });
        wrapper
          .find('input[data-test="register-password"]')
          .simulate('change', {
            target: { name: 'password', value: '123456' },
          });
        wrapper
          .find('input[data-test="register-confirm-password"]')
          .simulate('change', {
            target: { name: 'confirmPassword', value: '123456' },
          });
        wrapper
          .find('[data-test="register-form"]')
          .simulate('submit', { preventDefault() {} });

        const errors = wrapper.find('[data-test="register-error"]');

        expect(errors).toHaveLength(1);
        expect(errors.at(0).text()).toBe('Email is not valid');
      });

      test('should clean the errors if the inputs values are valid', () => {
        wrapper
          .find('[data-test="register-form"]')
          .simulate('submit', { preventDefault() {} });

        wrapper
          .find('input[data-test="register-name"]')
          .simulate('change', { target: { name: 'name', value: 'jose' } });
        wrapper
          .find('input[data-test="register-email"]')
          .simulate('change', { target: { name: 'email', value: 'j@j.com' } });
        wrapper
          .find('input[data-test="register-password"]')
          .simulate('change', {
            target: { name: 'password', value: '123456' },
          });
        wrapper
          .find('input[data-test="register-confirm-password"]')
          .simulate('change', {
            target: { name: 'confirmPassword', value: '123456' },
          });
        wrapper
          .find('[data-test="register-form"]')
          .simulate('submit', { preventDefault() {} });

        const errors = wrapper.find('[data-test="register-error"]');

        expect(errors).toHaveLength(0);
        expect(starRegisterWithNameEmailPassword).toHaveBeenCalled();
      });
    });
  });
});
