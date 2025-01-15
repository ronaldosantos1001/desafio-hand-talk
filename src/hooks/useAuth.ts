import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SignInProps } from "@/types/useAuth.types";
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de AuthProvider");
  }
  return context;
}

export function useSignIn() {
  const { user } = useAuthContext();

  async function signIn({ email, password }: SignInProps) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await AsyncStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      console.log("Erro ao fazer login:", error);
      throw error;
    }
  }

  return { signIn, currentUser: user };
}

export function useSignOut() {
  async function logOut() {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.log("Erro ao fazer logout:", error);
      throw error;
    }
  }

  return { logOut };
}
