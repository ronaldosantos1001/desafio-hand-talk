import { useAuthContext } from "@/hooks/useAuth";
import { ConfigurationScreen } from "@/screens/configuration/configuration.view";
import { Login } from "@/screens/login";
import React from "react";
import { View, Text } from "react-native";

export default function Settings() {
  const { user } = useAuthContext();
  
 
  return (
    <View style={{flex: 1}}>
     <ConfigurationScreen userId={user?.uid ?? ''} />
    </View>
  );
}