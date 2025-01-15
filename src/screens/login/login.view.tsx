// src/screens/Login/LoginScreen.tsx
import React from 'react';
import { useLogin } from './useLogin';
import * as S from './login.styles';
import { CustomInput } from '@/components/customInput';
import { LoginText } from './login.types';


export function LoginView() {
  const { email, password, setEmail, setPassword, handleLogin, logoImage } = useLogin();

  return (
    <S.Container testID="custom-container">
      <S.LogoImage
               source={logoImage}
               testID='logo-image'

            />
      <S.Title>{LoginText.Welcome}</S.Title>
      <CustomInput
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        themeMode='light'
         testID="custom-text-input"
      />
      <CustomInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        themeMode='light'
         testID="custom-text-input"
      />
      <S.Button onPress={handleLogin}>
        <S.ButtonText>{LoginText.ButtonText}</S.ButtonText>
      </S.Button>
    </S.Container>
  );
}
