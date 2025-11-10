import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { getInterventions, getAllUsers } from '../../../lib/firebaseService';
import { Intervention, User } from '../../../types';
import { Colors } from '../../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface LeaderboardEntry {
  user: User;
  interventionCount: number;
  acceptedCount: number;
  acceptanceRate: number;
}

export default function AdminLeaderboard() {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [interventionsData, usersData] = await Promise.all([
        getInterventions(),
        getAllUsers(),
      ]);
      setInterventions(interventionsData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const leaderboard = useMemo(() => {
    const pharmacists = users.filter((u) => u.role === 'Pharmacist');
    const entries: LeaderboardEntry[] = pharmacists.map((user) => {
      const userInterventions = interventions.filter((i) => i.userId === user.id);
      const acceptedCount = userInterventions.filter((i) => i.outcome === 'Accepted').length;
      const acceptanceRate =
        userInterventions.length > 0
          ? Math.round((acceptedCount / userInterventions.length) * 100)
          : 0;

      return {
        user,
        interventionCount: userInterventions.length,
        acceptedCount,
        acceptanceRate,
      };
    });

    return entries.sort((a, b) => b.interventionCount - a.interventionCount);
  }, [interventions, users]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const getMedalIcon = (index: number) => {
    if (index === 0) return <Ionicons name="trophy" size={24} color="#FFD700" />;
    if (index === 1) return <Ionicons name="trophy" size={24} color="#C0C0C0" />;
    if (index === 2) return <Ionicons name="trophy" size={24} color="#CD7F32" />;
    return null;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <Text style={styles.subtitle}>Top performing pharmacists</Text>
      </View>

      {leaderboard.map((entry, index) => (
        <View key={entry.user.id} style={styles.card}>
          <View style={styles.rankContainer}>
            {getMedalIcon(index) || <Text style={styles.rank}>#{index + 1}</Text>}
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{entry.user.fullName}</Text>
            <View style={styles.stats}>
              <Text style={styles.stat}>
                {entry.interventionCount} interventions
              </Text>
              <Text style={styles.stat}>
                {entry.acceptanceRate}% acceptance rate
              </Text>
            </View>
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rankContainer: {
    width: 50,
    alignItems: 'center',
    marginRight: 12,
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textSecondary,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
  stat: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
