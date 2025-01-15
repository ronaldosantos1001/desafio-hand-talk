import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 10px; 
  align-items: center;
  padding: 20px;
  border-bottom-width: 0.5px;
  border-bottom-color: #6f6f6f;
`;


export const User = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  color: #6f6f6f;
  font-weight: 500;
  font-size: 16px;
`;

export const Email = styled.Text`
  color: #6f6f6f;
  font-size: 14px;
`;
