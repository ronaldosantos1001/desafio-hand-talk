import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

import { useSignIn } from '../../hooks/useAuth'; // Ajuste o caminho conforme seu projeto
import { UseLoginReturn } from './login.types';

export function useLogin(): UseLoginReturn {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  // Imagem do logo
  const logoImage = require('../../../assets/images/Logo.png');

  // Hook do Expo Router para navegação
  const router = useRouter();

  // Hook de login no Firebase
  const { signIn } = useSignIn();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      // Tenta logar com Firebase (email/senha)
      await signIn({ email, password });

      // Se sucesso, redireciona para rota protegida
      router.replace('/(tabs)'); 
    } catch (error) {
      // Caso falhe, mostre alerta. Você pode verificar o tipo de erro para mensagem customizada
      Alert.alert('Erro', 'Não foi possível fazer login. Verifique suas credenciais.');
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    logoImage,
  };
}
