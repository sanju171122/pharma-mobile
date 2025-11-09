import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../utils/colors';

interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  color?: string;
}

export default function StatCard({ icon, value, label, color = Colors.primary }: StatCardProps) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon as any} size={24} color={color} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.gray[900],
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: Colors.gray[500],
    textAlign: 'center',
  },
});
