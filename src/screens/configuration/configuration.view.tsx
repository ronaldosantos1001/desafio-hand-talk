// /src/screens/ConfigurationScreen.tsx

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';


import {
  Container,
  Section,
  SectionTitle,
  Label,
  Input,
  Button,
  ButtonText,
  Spacing
} from './configuration.styles';
import { useConfiguration } from './useConfiguration';
import { ShapeType } from './configuration.types';

interface Props {
  userId: string;
}

export function ConfigurationScreen({ userId }: Props) {
  const { config, loading, updateObjectConfig } = useConfiguration(userId);
  const [localConfig, setLocalConfig] = useState(config);

  // Para sincronizar com as mudanças vindas do Firebase
  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  const handleChange = (
    shape: ShapeType,
    field: keyof Omit<typeof config[ShapeType], 'rotation'>,
    value: string
  ) => {
    setLocalConfig((prevState) => ({
          ...prevState,
          [shape]: {
            ...prevState[shape],
            [field]: value,
          },
        }));
  };

  // Atualizando os campos de rotação separadamente
  const handleRotationChange = (
    shape: ShapeType,
    axis: keyof typeof config[ShapeType]['rotation'],
    value: string
  ) => {
    setLocalConfig((prevState) => ({
          ...prevState,
          [shape]: {
            ...prevState[shape],
            rotation: {
              ...prevState[shape].rotation,
              [axis]: parseFloat(value),
            },
          },
        }));
  };

  const handleSave = async (shape: ShapeType) => {
    try {
      await updateObjectConfig(shape, localConfig[shape]);
      Alert.alert('Sucesso', `Configurações do ${shape} salvas!`);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as configurações.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  const renderObjectConfig = (shape: ShapeType) => (
    <Section key={shape}>
      <SectionTitle>{shape.toUpperCase()}</SectionTitle>

      <Label>Cor</Label>
      <Input
        value={localConfig[shape].color}
        onChangeText={(value: string) => handleChange(shape, 'color', value)}
      />

      <Label>Rotação X</Label>
      <Input
        value={localConfig[shape].rotation.x.toString()}
        keyboardType="numeric"
        onChangeText={(value: string) => handleRotationChange(shape, 'x', value)}
      />

      <Label>Rotação Y</Label>
      <Input
        value={localConfig[shape].rotation.y.toString()}
        keyboardType="numeric"
        onChangeText={(value: string) => handleRotationChange(shape, 'y', value)}
      />

      <Label>Rotação Z</Label>
      <Input
        value={localConfig[shape].rotation.z.toString()}
        keyboardType="numeric"
        onChangeText={(value: string) => handleRotationChange(shape, 'z', value)}
      />

      <Button onPress={() => handleSave(shape)}>
        <ButtonText>Salvar {shape}</ButtonText>
      </Button>
      
    </Section>
    
  );

  return (
  
    <Container>
      {(['cone', 'cube', 'dodecahedron'] as ShapeType[]).map(renderObjectConfig)}
    </Container>

  );
}
