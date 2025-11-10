import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../contexts/AuthContext';
import { signOut, updateUserProfile } from '../../../lib/firebaseService';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Colors } from '../../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function PharmacistProfile() {
  const { userData, refreshUserData } = useAuth();
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState(userData?.fullName || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!userData) return;

    if (!fullName.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Name cannot be empty',
      });
      return;
    }

    setLoading(true);
    try {
      await updateUserProfile(userData.id, {
        fullName: fullName.trim(),
        profileCompleted: true,
      });
      await refreshUserData();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Profile updated successfully',
      });
      setEditMode(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update profile',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      Toast.show({
        type: 'success',
        text1: 'Signed Out',
        text2: 'You have been logged out',
      });
      router.replace('/(auth)/login');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to sign out',
      });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={48} color={Colors.primary} />
        </View>
        {editMode ? (
          <View style={styles.editForm}>
            <Input
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your name"
            />
            <View style={styles.buttonRow}>
              <View style={styles.buttonHalf}>
                <Button
                  title="Cancel"
                  onPress={() => {
                    setFullName(userData?.fullName || '');
                    setEditMode(false);
                  }}
                  variant="outline"
                />
              </View>
              <View style={styles.buttonHalf}>
                <Button title="Save" onPress={handleUpdate} loading={loading} />
              </View>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.name}>{userData?.fullName}</Text>
            <Text style={styles.email}>{userData?.email}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{userData?.role}</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setEditMode(true)}
            >
              <Ionicons name="create-outline" size={20} color={Colors.primary} />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {!editMode && (
        <>
          <View style={styles.section}>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="settings-outline" size={24} color={Colors.text} />
              <Text style={styles.menuText}>Settings</Text>
              <Ionicons name="chevron-forward" size={24} color={Colors.textLight} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="help-circle-outline" size={24} color={Colors.text} />
              <Text style={styles.menuText}>Help & Support</Text>
              <Ionicons name="chevron-forward" size={24} color={Colors.textLight} />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Sign Out" onPress={handleSignOut} variant="outline" />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  editForm: {
    width: '100%',
    marginTop: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonHalf: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  roleBadge: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  editButtonText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
  section: {
    marginTop: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  buttonContainer: {
    marginTop: 32,
  },
});
