import { format } from 'date-fns';

export const formatDate = (date: string | Date) => {
  if (!date) return 'N/A';
  return format(new Date(date), 'MMM dd, yyyy');
};

export const getRiskColor = (risk: string) => {
  switch(risk) {
    case 'High': return '#EF4444';
    case 'Medium': return '#F59E0B';
    case 'Low': return '#10B981';
    default: return '#6B7280';
  }
};

export const getOutcomeColor = (outcome: string) => {
  switch(outcome) {
    case 'Accepted': return '#10B981';
    case 'Rejected': return '#EF4444';
    case 'Pending': return '#F59E0B';
    default: return '#6B7280';
  }
};

export const calculateScore = (total: number, accepted: number) => {
  if (total === 0) return 0;
  const acceptanceRate = (accepted / total) * 100;
  return (total * 0.3) + (acceptanceRate * 0.7);
};
