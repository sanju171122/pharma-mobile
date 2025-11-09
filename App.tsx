import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

// Import screens
import LoginScreen from './src/screens/auth/LoginScreen';
import SignupScreen from './src/screens/auth/SignupScreen';
import PharmacistNavigator from './src/navigation/PharmacistNavigator';
import AdminNavigator from './src/navigation/AdminNavigator';

// Import Firebase auth
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './src/config/firebase';
import { doc, getDoc } from 'firebase/firestore';

// Import context
import { AuthProvider, useAuth } from './src/context/AuthContext';

const Stack = createStackNavigator();

// Custom theme matching the web app
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#10B981',
    accent: '#059669',
  },
};

function RootNavigator() {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' }}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      ) : userRole === 'Administrator' ? (
        <Stack.Screen name="AdminMain" component={AdminNavigator} />
      ) : (
        <Stack.Screen name="PharmacistMain" component={PharmacistNavigator} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <RootNavigator />
          <Toast />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
