import { useSignOut } from "@/hooks/useAuth";
import { router } from "expo-router";
import React, { useEffect } from "react";

export default function Logout() {

    const { logOut } = useSignOut();

    useEffect(() => {
      const signOutAsync = async () => {
        try {
          await logOut();
          router.replace('/login');
        } catch (error) {
          console.error("Erro ao fazer logout:", error);
        }
      };
      signOutAsync();
    }, []);
    
  return <></>
   
}
