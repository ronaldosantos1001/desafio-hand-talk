// customInput.tsx
import React from 'react';
import * as S from './customInput.styles';
import { InputProps } from './customInput.types';

export function CustomInput(props: InputProps) {
  const { label, themeMode = 'light', ...rest } = props;

  return (
    <S.Container themeMode={themeMode} testID="custom-container">
      {!!label && (
        <S.Label themeMode={themeMode} testID="custom-label">
          {label}
        </S.Label>
      )}
      <S.TextInputStyled themeMode={themeMode} testID="custom-text-input" {...rest} />
    </S.Container>
  );
}
