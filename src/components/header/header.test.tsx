import React from 'react';
import { render } from '@testing-library/react-native';
import { Header } from './header.view';

jest.mock('./header.types', () => ({
  headerText: {
    Title: 'Título do Usuário'
  }
}));

describe('Header Component', () => {
  it('deve renderizar o título e o email do usuário', () => {
    const testEmail = 'usuario@exemplo.com';
    const { getByText } = render(<Header email={testEmail} />);
    
    const titleElement = getByText('Título do Usuário');
    const emailElement = getByText(testEmail); 

    expect(titleElement).toBeTruthy();
    expect(titleElement).toHaveTextContent('Título do Usuário');

    expect(emailElement).toBeTruthy();
    expect(emailElement).toHaveTextContent(testEmail);
  });
});
