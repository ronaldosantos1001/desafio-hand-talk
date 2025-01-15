import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LoginView } from './login.view';
import { LoginText } from './login.types';

const mockSetEmail = jest.fn();
const mockSetPassword = jest.fn();
const mockHandleLogin = jest.fn();

jest.mock('./useLogin', () => ({
  useLogin: jest.fn(() => ({
    email: '',
    password: '',
    setEmail: mockSetEmail,
    setPassword: mockSetPassword,
    handleLogin: mockHandleLogin,
    logoImage: { uri: 'mock-logo-uri' },
  })),
}));

describe('LoginView Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa todos os mocks antes de cada teste
  });

  it('should render logo, title, inputs, and button', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<LoginView />);

    // Assert that logo is rendered
    expect(getByTestId('logo-image')).toBeTruthy();

    // Assert that title is rendered
    expect(getByText(LoginText.Welcome)).toBeTruthy();

    // Assert that email input is rendered
    expect(getByPlaceholderText('E-mail')).toBeTruthy();

    // Assert that password input is rendered
    expect(getByPlaceholderText('Senha')).toBeTruthy();

    // Assert that button is rendered
    expect(getByText(LoginText.ButtonText)).toBeTruthy();
  });

  it('should call setEmail and setPassword on input change', () => {
    const { getByPlaceholderText } = render(<LoginView />);

    const emailInput = getByPlaceholderText('E-mail');
    const passwordInput = getByPlaceholderText('Senha');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(mockSetEmail).toHaveBeenCalledWith('test@example.com');
    expect(mockSetPassword).toHaveBeenCalledWith('password123');
  });

  it('should call handleLogin on button press', () => {
    const { getByText } = render(<LoginView />);

    const button = getByText(LoginText.ButtonText);
    fireEvent.press(button);

    expect(mockHandleLogin).toHaveBeenCalled();
  });
});
