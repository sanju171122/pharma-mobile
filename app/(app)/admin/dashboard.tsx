import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';
import { StatCard } from '../../../components/StatCard';
import { Colors } from '../../../constants/colors';
import { getInterventions, getAllUsers } from '../../../lib/firebaseService';
import { Intervention, User } from '../../../types';
import { calculateAcceptanceRate, countHighRisk } from '../../../lib/utils';
import { Ionicons } from '@expo/vector-icons';

export default function AdminDashboard() {
  const { userData } = useAuth();
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

  const stats = useMemo(() => {
    const pharmacists = users.filter((u) => u.role === 'Pharmacist').length;
    const acceptanceRate = calculateAcceptanceRate(interventions);
    const highRiskCount = countHighRisk(interventions);

    return {
      pharmacists,
      totalInterventions: interventions.length,
      acceptanceRate,
      highRiskCount,
    };
  }, [interventions, users]);

  if (userData?.role !== 'Administrator') {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Access Denied</Text>
      </View>
    );
  }

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
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>System Overview</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <StatCard
            title="Total Pharmacists"
            value={stats.pharmacists}
            icon={<Ionicons name="people" size={18} color={Colors.primary} />}
          />
        </View>
        <View style={styles.statItem}>
          <StatCard
            title="Total Interventions"
            value={stats.totalInterventions}
            icon={<Ionicons name="list" size={18} color={Colors.primary} />}
          />
        </View>
        <View style={styles.statItem}>
          <StatCard
            title="Acceptance Rate"
            value={`${stats.acceptanceRate}%`}
            icon={<Ionicons name="checkmark-circle" size={18} color={Colors.success} />}
          />
        </View>
        <View style={styles.statItem}>
          <StatCard
            title="High-Risk Interventions"
            value={stats.highRiskCount}
            icon={<Ionicons name="warning" size={18} color={Colors.error} />}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          <Text style={styles.activityText}>
            {interventions.length} total interventions logged
          </Text>
          <Text style={styles.activityText}>
            {users.length} total users registered
          </Text>
        </View>
      </View>
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
    backgroundColor: Colors.background,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  statItem: {
    width: '50%',
    padding: 8,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  activityCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activityText: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 18,
    color: Colors.error,
    textAlign: 'center',
  },
});
