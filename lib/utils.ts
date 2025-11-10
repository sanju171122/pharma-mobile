import { format } from 'date-fns';
import { RiskLevel, OutcomeStatus } from '../types';
import { Colors } from '../constants/colors';

export const formatDate = (date: Date): string => {
  return format(date, 'MMM dd, yyyy');
};

export const formatDateTime = (date: Date): string => {
  return format(date, 'MMM dd, yyyy hh:mm a');
};

export const getRiskColor = (risk: RiskLevel): string => {
  switch (risk) {
    case 'Low':
      return Colors.riskLow;
    case 'Moderate':
      return Colors.riskModerate;
    case 'High':
      return Colors.riskHigh;
    case 'Extreme':
      return Colors.riskExtreme;
    default:
      return Colors.textSecondary;
  }
};

export const getOutcomeColor = (outcome: OutcomeStatus): string => {
  switch (outcome) {
    case 'Accepted':
      return Colors.outcomeAccepted;
    case 'Not Accepted':
      return Colors.outcomeNotAccepted;
    case 'Pending':
      return Colors.outcomePending;
    default:
      return Colors.textSecondary;
  }
};

export const calculateAcceptanceRate = (interventions: any[]): number => {
  if (interventions.length === 0) return 0;
  const accepted = interventions.filter(i => i.outcome === 'Accepted').length;
  return Math.round((accepted / interventions.length) * 100);
};

export const countHighRisk = (interventions: any[]): number => {
  return interventions.filter(i => i.risk === 'High' || i.risk === 'Extreme').length;
};
