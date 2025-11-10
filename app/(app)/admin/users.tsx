import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getAllUsers, updateUserRole } from '../../../lib/firebaseService';
import { User, UserRole } from '../../../types';
import { Badge } from '../../../components/Badge';
import { Colors } from '../../../constants/colors';
import { formatDate } from '../../../lib/utils';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, currentRole: UserRole) => {
    const newRole: UserRole = currentRole === 'Administrator' ? 'Pharmacist' : 'Administrator';
    try {
      await updateUserRole(userId, newRole);
      Toast.show({
        type: 'success',
        text1: 'Role Updated',
        text2: `User role changed to ${newRole}`,
      });
      loadData();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update role',
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>User Management</Text>
        <Text style={styles.subtitle}>{users.length} total users</Text>
      </View>

      {users.map((user) => (
        <View key={user.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{user.fullName}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
            <Badge
              text={user.role}
              color={user.role === 'Administrator' ? Colors.error : Colors.primary}
            />
          </View>
          <Text style={styles.date}>Joined: {formatDate(user.createdAt)}</Text>
          <TouchableOpacity
            style={styles.roleButton}
            onPress={() => handleRoleChange(user.id, user.role)}
          >
            <Ionicons name="swap-horizontal" size={16} color={Colors.primary} />
            <Text style={styles.roleButtonText}>Change Role</Text>
          </TouchableOpacity>
        </View>
      ))}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  date: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 12,
  },
  roleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  roleButtonText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
});
