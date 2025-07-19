import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const api = axios.create({
  baseURL: '/api',
});

export interface ClaimedDate {
  year: number;
  month: number;
  day: number;
}

export const fetchClaimedDates = async (): Promise<ClaimedDate[]> => {
  const response = await api.get<ClaimedDate[]>('/claimed-dates');
  return response.data;
};

export const useClaimedDates = () => {
  return useQuery({
    queryKey: ['claimedDates'],
    queryFn: fetchClaimedDates,
    staleTime: 5 * 60 * 1000,
  });
};
