import { User } from "@firebase/auth";
import { ReactNode } from "react";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}