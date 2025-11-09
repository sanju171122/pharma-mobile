import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../utils/colors';

import DashboardScreen from '../screens/pharmacist/DashboardScreen';
import InterventionsScreen from '../screens/pharmacist/InterventionsScreen';
import NewInterventionScreen from '../screens/pharmacist/NewInterventionScreen';
import AnalyticsScreen from '../screens/pharmacist/AnalyticsScreen';
import FavoritesScreen from '../screens/pharmacist/FavoritesScreen';
import ProfileScreen from '../screens/pharmacist/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function InterventionsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="InterventionsList" 
        component={InterventionsScreen}
        options={{ 
          title: 'My Interventions',
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: 'white'
        }}
      />
      <Stack.Screen 
        name="NewIntervention" 
        component={NewInterventionScreen}
        options={{ 
          title: 'New Intervention',
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: 'white'
        }}
      />
    </Stack.Navigator>
  );
}

export default function PharmacistNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'home';

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Interventions':
              iconName = focused ? 'medical' : 'medical-outline';
              break;
            case 'Analytics':
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              break;
            case 'Favorites':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: 'white'
        }}
      />
      <Tab.Screen 
        name="Interventions" 
        component={InterventionsStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Analytics" 
        component={AnalyticsScreen}
        options={{
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: 'white'
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: 'white'
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: 'white'
        }}
      />
    </Tab.Navigator>
  );
}