import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Colors } from '../utils/colors';

import AdminDashboard from '../screens/admin/AdminDashboard';
import UserManagement from '../screens/admin/UserManagement';
import ReferenceData from '../screens/admin/ReferenceData';
import AllInterventions from '../screens/admin/AllInterventions';
import SystemAnalytics from '../screens/admin/SystemAnalytics';
import AdminLeaderboard from '../screens/admin/AdminLeaderboard';
import AdminProfile from '../screens/admin/AdminProfile';

const Drawer = createDrawerNavigator();

const LogoutButton = () => (
  <TouchableOpacity 
    onPress={() => signOut(auth)}
    style={{ marginRight: 15 }}
  >
    <Ionicons name="log-out-outline" size={24} color="white" />
  </TouchableOpacity>
);

export default function AdminNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: 'white',
        drawerActiveTintColor: Colors.primary,
        drawerInactiveTintColor: 'gray',
        headerRight: () => <LogoutButton />,
        drawerStyle: {
          backgroundColor: Colors.gray[50],
          width: 280,
        },
      }}
    >
      <Drawer.Screen 
        name="Dashboard" 
        component={AdminDashboard}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? 'speedometer' : 'speedometer-outline'} 
              size={size} 
              color={focused ? Colors.primary : 'gray'} 
            />
          ),
        }}
      />
      <Drawer.Screen 
        name="User Management" 
        component={UserManagement}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? 'people' : 'people-outline'} 
              size={size} 
              color={focused ? Colors.primary : 'gray'} 
            />
          ),
        }}
      />
      <Drawer.Screen 
        name="Reference Data" 
        component={ReferenceData}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? 'list' : 'list-outline'} 
              size={size} 
              color={focused ? Colors.primary : 'gray'} 
            />
          ),
        }}
      />
      <Drawer.Screen 
        name="All Interventions" 
        component={AllInterventions}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? 'medical' : 'medical-outline'} 
              size={size} 
              color={focused ? Colors.primary : 'gray'} 
            />
          ),
        }}
      />
      <Drawer.Screen 
        name="System Analytics" 
        component={SystemAnalytics}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? 'analytics' : 'analytics-outline'} 
              size={size} 
              color={focused ? Colors.primary : 'gray'} 
            />
          ),
        }}
      />
      <Drawer.Screen 
        name="Leaderboard" 
        component={AdminLeaderboard}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? 'trophy' : 'trophy-outline'} 
              size={size} 
              color={focused ? Colors.primary : 'gray'} 
            />
          ),
        }}
      />
      <Drawer.Screen 
        name="My Profile" 
        component={AdminProfile}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? 'person' : 'person-outline'} 
              size={size} 
              color={focused ? Colors.primary : 'gray'} 
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}