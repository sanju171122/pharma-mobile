import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'expo-router';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Colors } from '../../../constants/colors';
import { createIntervention, getMedications } from '../../../lib/firebaseService';
import { RiskLevel, OutcomeStatus, Medication } from '../../../types';
import Toast from 'react-native-toast-message';

export default function NewIntervention() {
  const { user } = useAuth();
  const router = useRouter();
  const [problem, setProblem] = useState('');
  const [risk, setRisk] = useState<RiskLevel>('Low');
  const [outcome, setOutcome] = useState<OutcomeStatus>('Pending');
  const [medications, setMedications] = useState<Medication[]>([]);
  const [selectedMedication, setSelectedMedication] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    try {
      const meds = await getMedications();
      setMedications(meds);
      if (meds.length > 0) {
        setSelectedMedication(meds[0].id);
      }
    } catch (error) {
      console.error('Error loading medications:', error);
    }
  };

  const handleSubmit = async () => {
    if (!problem.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please describe the problem',
      });
      return;
    }

    if (!user) return;

    setLoading(true);
    try {
      await createIntervention({
        userId: user.uid,
        problem: problem.trim(),
        risk,
        outcome,
        medicationIds: selectedMedication ? [selectedMedication] : [],
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Intervention logged successfully',
      });

      setProblem('');
      setRisk('Low');
      setOutcome('Pending');
      router.back();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to log intervention',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Log New Intervention</Text>

        <Input
          label="Problem Description"
          value={problem}
          onChangeText={setProblem}
          placeholder="Describe the clinical issue..."
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Risk Level</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={risk}
              onValueChange={(value) => setRisk(value as RiskLevel)}
            >
              <Picker.Item label="Low" value="Low" />
              <Picker.Item label="Moderate" value="Moderate" />
              <Picker.Item label="High" value="High" />
              <Picker.Item label="Extreme" value="Extreme" />
            </Picker>
          </View>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Outcome</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={outcome}
              onValueChange={(value) => setOutcome(value as OutcomeStatus)}
            >
              <Picker.Item label="Pending" value="Pending" />
              <Picker.Item label="Accepted" value="Accepted" />
              <Picker.Item label="Not Accepted" value="Not Accepted" />
            </Picker>
          </View>
        </View>

        {medications.length > 0 && (
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Medication</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={selectedMedication}
                onValueChange={(value) => setSelectedMedication(value)}
              >
                {medications.map((med) => (
                  <Picker.Item key={med.id} label={med.name} value={med.id} />
                ))}
              </Picker>
            </View>
          </View>
        )}

        <Button title="Log Intervention" onPress={handleSubmit} loading={loading} />
      </ScrollView>
    </KeyboardAvoidingView>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 24,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
});
