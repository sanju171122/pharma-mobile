import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getInterventions, getAllUsers, getMedications } from '../../../lib/firebaseService';
import { Intervention, User, Medication } from '../../../types';
import { Badge } from '../../../components/Badge';
import { Colors } from '../../../constants/colors';
import { formatDate, getRiskColor, getOutcomeColor } from '../../../lib/utils';

export default function AdminInterventions() {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [interventionsData, usersData, medicationsData] = await Promise.all([
        getInterventions(),
        getAllUsers(),
        getMedications(),
      ]);
      setInterventions(interventionsData);
      setUsers(usersData);
      setMedications(medicationsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserName = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    return user?.fullName || 'Unknown';
  };

  const getMedicationName = (medicationId: string) => {
    const medication = medications.find((m) => m.id === medicationId);
    return medication?.name || 'Unknown';
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
        <Text style={styles.title}>All Interventions</Text>
        <Text style={styles.subtitle}>{interventions.length} total</Text>
      </View>

      {interventions.map((intervention) => (
        <View key={intervention.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Badge text={intervention.risk} color={getRiskColor(intervention.risk)} />
            <Badge text={intervention.outcome} color={getOutcomeColor(intervention.outcome)} />
          </View>
          <Text style={styles.problem} numberOfLines={2}>
            {intervention.problem}
          </Text>
          <Text style={styles.info}>Pharmacist: {getUserName(intervention.userId)}</Text>
          <Text style={styles.date}>{formatDate(intervention.createdAt)}</Text>
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
    gap: 8,
    marginBottom: 12,
  },
  problem: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: Colors.textLight,
  },
});
