import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { LoadingScreen } from '../components/LoadingScreen';

export default function Index() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/(auth)/login');
      } else if (userData) {
        if (userData.role === 'Administrator') {
          router.replace('/(app)/admin/dashboard');
        } else if (userData.role === 'Pharmacist') {
          if (userData.profileCompleted === false) {
            router.replace('/(app)/pharmacist/profile');
          } else {
            router.replace('/(app)/pharmacist/dashboard');
          }
        }
      }
    }
  }, [user, userData, loading]);

  return <LoadingScreen />;
}
