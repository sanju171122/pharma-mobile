import React, { createContext, useState, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  user: any;
  userRole: string | null;
  userProfile: any;
  loading: boolean;
  updateUserProfile: (profile: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  userProfile: null,
  loading: true,
  updateUserProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.role);
            setUserProfile(userData.profile || {});
            
            await AsyncStorage.setItem('userRole', userData.role);
            await AsyncStorage.setItem('userProfile', JSON.stringify(userData.profile || {}));
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
        setUserRole(null);
        setUserProfile(null);
        
        await AsyncStorage.removeItem('userRole');
        await AsyncStorage.removeItem('userProfile');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateUserProfile = async (profileData: any) => {
    setUserProfile(profileData);
    await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
  };

  const value = {
    user,
    userRole,
    userProfile,
    loading,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
