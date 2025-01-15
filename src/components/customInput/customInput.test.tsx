// CustomInput.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { CustomInput } from './customInput.view';

describe('CustomInput Component', () => {
  it('deve renderizar o componente sem label quando a prop label não for informada', () => {
    const { queryByTestId } = render(
      <CustomInput placeholder="Digite algo" />
    );
    
    // Verifica se o TextInput foi renderizado
    const textInput = queryByTestId('custom-text-input');
    expect(textInput).toBeTruthy();
    
    // Verifica se o Label não foi renderizado
    const label = queryByTestId('custom-label');
    expect(label).toBeNull();
  });

  it('deve renderizar o label quando a prop label for informada', () => {
    const testLabel = 'Nome:';
    const { getByTestId } = render(
      <CustomInput label={testLabel} placeholder="Digite seu nome" />
    );

    // Verifica se o Label foi renderizado corretamente
    const label = getByTestId('custom-label');
    expect(label).toBeTruthy();
    expect(label.props.children).toBe(testLabel);

    // Verifica se o TextInput também foi renderizado
    const textInput = getByTestId('custom-text-input');
    expect(textInput).toBeTruthy();
  });

  it('deve repassar a prop "themeMode" para o container e aplicá-la corretamente', () => {
    const { getByTestId } = render(
      <CustomInput label="Senha:" themeMode="dark" placeholder="Digite sua senha" />
    );

    const container = getByTestId('custom-container');

    // Verifica se a prop "themeMode" foi repassada corretamente para o container.
    // Essa verificação garante que o componente está configurado para utilizar o tema "dark".
    expect(container.props.themeMode).toBe('dark');

    /* 
    Se você deseja testar os estilos reais aplicados (por exemplo, um `backgroundColor` específico),
    é preciso que esses estilos estejam disponíveis no objeto `style` do container.
    Se o styled-components não injetar estilos inline, considere uma das abordagens abaixo:

    1. Snapshot testing:
       const tree = render(<CustomInput label="Senha:" themeMode="dark" placeholder="Digite sua senha" />).toJSON();
       expect(tree).toMatchSnapshot();

    2. Testar a lógica de mapeamento de estilos extraída para uma função auxiliar:
       import { getContainerStyle } from './customInput.styles';
       expect(getContainerStyle('dark')).toEqual({ backgroundColor: '#000' });
    */
  });
});
