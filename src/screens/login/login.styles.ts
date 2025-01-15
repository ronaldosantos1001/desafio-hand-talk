// src/screens/Login/Login.styles.ts
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background-color: #ffffff;
`;

export const Title = styled.Text`
  font-size: 22px;
  margin-bottom: 32px;
  font-weight: 600;
  color: #333333;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 48px;
  background-color: #ff6900;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: #ffffff;
  font-weight: 600;
`;

export const LogoImage = styled.Image`
  marginBottom: 50px;
  
`;