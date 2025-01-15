
import { AuthProvider } from "@/contexts/AuthContext";
import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
    return (
        <AuthProvider>

            <Stack screenOptions={{ headerShown: false }} />

        </AuthProvider>
   )
}