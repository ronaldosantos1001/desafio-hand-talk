// /src/styles/ConfigurationScreen.styles.ts

import styled from 'styled-components/native';
import { ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
  margin-bottom: 100px;
`;

export const Section = styled.View`
  margin-bottom: 20px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Label = styled.Text`
  font-size: 16px;
`;

export const Input = styled.TextInput`
  height: 40px;
  border-width: 1px;
  border-color: #ccc;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #ff6900;
  padding: 10px;
  align-items: center;
  border-radius: 4px;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const Spacing = styled.View`
margin-bottom:70px;
`;