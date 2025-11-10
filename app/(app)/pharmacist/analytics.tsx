import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';
import { getInterventions } from '../../../lib/firebaseService';
import { Intervention } from '../../../types';
import { Colors } from '../../../constants/colors';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function PharmacistAnalytics() {
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

  const outcomeData = useMemo(() => {
    const accepted = interventions.filter((i) => i.outcome === 'Accepted').length;
    const notAccepted = interventions.filter((i) => i.outcome === 'Not Accepted').length;
    const pending = interventions.filter((i) => i.outcome === 'Pending').length;

    return [
      {
        name: 'Accepted',
        count: accepted,
        color: Colors.success,
        legendFontColor: Colors.text,
      },
      {
        name: 'Not Accepted',
        count: notAccepted,
        color: Colors.error,
        legendFontColor: Colors.text,
      },
      {
        name: 'Pending',
        count: pending,
        color: Colors.warning,
        legendFontColor: Colors.text,
      },
    ];
  }, [interventions]);

  const riskData = useMemo(() => {
    const low = interventions.filter((i) => i.risk === 'Low').length;
    const moderate = interventions.filter((i) => i.risk === 'Moderate').length;
    const high = interventions.filter((i) => i.risk === 'High').length;
    const extreme = interventions.filter((i) => i.risk === 'Extreme').length;

    return [
      { name: 'Low', count: low, color: Colors.riskLow, legendFontColor: Colors.text },
      { name: 'Moderate', count: moderate, color: Colors.riskModerate, legendFontColor: Colors.text },
      { name: 'High', count: high, color: Colors.riskHigh, legendFontColor: Colors.text },
      { name: 'Extreme', count: extreme, color: Colors.riskExtreme, legendFontColor: Colors.text },
    ];
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
      <Text style={styles.title}>Analytics</Text>

      {interventions.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No data available</Text>
          <Text style={styles.emptySubtext}>Log interventions to see analytics</Text>
        </View>
      ) : (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Outcomes Distribution</Text>
            <View style={styles.chartContainer}>
              <PieChart
                data={outcomeData}
                width={screenWidth - 32}
                height={220}
                chartConfig={{
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="count"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Risk Level Distribution</Text>
            <View style={styles.chartContainer}>
              <PieChart
                data={riskData}
                width={screenWidth - 32}
                height={220}
                chartConfig={{
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="count"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  chartContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
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
