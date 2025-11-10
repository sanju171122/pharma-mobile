import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'expo-router';
import { StatCard } from '../../../components/StatCard';
import { Button } from '../../../components/Button';
import { Colors } from '../../../constants/colors';
import { getInterventions } from '../../../lib/firebaseService';
import { Intervention } from '../../../types';
import { calculateAcceptanceRate, countHighRisk } from '../../../lib/utils';
import { Ionicons } from '@expo/vector-icons';

export default function PharmacistDashboard() {
  const { user, userData } = useAuth();
  const router = useRouter();
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    try {
      const interventionsData = await getInterventions(user.uid);
      setInterventions(interventionsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const acceptanceRate = calculateAcceptanceRate(interventions);
    const highRiskCount = countHighRisk(interventions);

    return {
      totalInterventions: interventions.length,
      acceptanceRate,
      highRiskCount,
    };
  }, [interventions]);

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
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>{userData?.fullName}</Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
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
        <View style={[styles.statItem, { width: '100%' }]}>
          <StatCard
            title="High-Risk Interventions"
            value={stats.highRiskCount}
            icon={<Ionicons name="warning" size={18} color={Colors.error} />}
          />
        </View>
      </View>

      <View style={styles.actionSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <Button
          title="Log New Intervention"
          onPress={() => router.push('/(app)/pharmacist/new-intervention')}
          variant="primary"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {interventions.slice(0, 3).map((intervention) => (
          <View key={intervention.id} style={styles.activityCard}>
            <Text style={styles.activityTitle} numberOfLines={1}>
              {intervention.problem}
            </Text>
            <Text style={styles.activitySubtitle}>
              {intervention.risk} risk • {intervention.outcome}
            </Text>
          </View>
        ))}
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
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 4,
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
  actionSection: {
    marginTop: 24,
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
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
