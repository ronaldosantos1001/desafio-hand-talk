import styled from 'styled-components/native';
import { colors } from './colors';

export const Container = styled.View<{ themeMode: 'light' | 'dark' }>`
  width: 100%;
  margin-bottom: 16px;
`;

export const Label = styled.Text<{ themeMode: 'light' | 'dark' }>`
  font-size: 14px;
  margin-bottom: 4px;
  color: ${({ themeMode }: { themeMode: 'light' | 'dark' }) =>
    themeMode === 'dark' ? colors.dark.text : colors.light.text};
`;

export const TextInputStyled = styled.TextInput<{ themeMode: 'light' | 'dark' }>`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border-width: 1px;
  /* Usando a cor do tema para o border */
  border-color: ${({ themeMode }: { themeMode: 'light' | 'dark' }) =>
    themeMode === 'dark' ? colors.dark.border : colors.light.border};
  /* E também para a cor do texto */
  color: ${({ themeMode }: { themeMode: 'light' | 'dark' }) =>
    themeMode === 'dark' ? colors.dark.text : colors.light.text};
`;