import { ImageSourcePropType } from "react-native";

  export interface UseLoginReturn {
    email: string;
    password: string;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    handleLogin: () => void;
    logoImage: ImageSourcePropType;
  }
  
  export enum LoginText {
    Welcome = 'Bem-vindo(a) ao Desafio Hand Talk!',
    ButtonText = 'Entrar'
  }