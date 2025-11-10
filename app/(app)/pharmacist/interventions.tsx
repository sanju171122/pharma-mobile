import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';
import { getInterventions } from '../../../lib/firebaseService';
import { Intervention } from '../../../types';
import { Badge } from '../../../components/Badge';
import { Colors } from '../../../constants/colors';
import { formatDate, getRiskColor, getOutcomeColor } from '../../../lib/utils';

export default function PharmacistInterventions() {
  const { user } = useAuth();
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
        <Text style={styles.title}>My Interventions</Text>
        <Text style={styles.subtitle}>{interventions.length} total</Text>
      </View>

      {interventions.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No interventions yet</Text>
          <Text style={styles.emptySubtext}>Start by logging your first intervention</Text>
        </View>
      ) : (
        interventions.map((intervention) => (
          <View key={intervention.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Badge text={intervention.risk} color={getRiskColor(intervention.risk)} />
              <Badge text={intervention.outcome} color={getOutcomeColor(intervention.outcome)} />
            </View>
            <Text style={styles.problem} numberOfLines={2}>
              {intervention.problem}
            </Text>
            <Text style={styles.date}>{formatDate(intervention.createdAt)}</Text>
          </View>
        ))
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
    gap: 8,
    marginBottom: 12,
  },
  problem: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: Colors.textLight,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
