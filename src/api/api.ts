import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// Create a reusable axios instance
export const api = axios.create({
  baseURL: '/api', // Adjust baseURL as needed
  // You can add headers, interceptors, etc. here
});

// Type for a claimed date
export interface ClaimedDate {
  year: number;
  month: number;
  day: number;
}

// Fetch claimed dates from the backend
export const fetchClaimedDates = async (): Promise<ClaimedDate[]> => {
  const response = await api.get<ClaimedDate[]>('/claimed-dates'); // Adjust endpoint as needed
  return response.data;
};

// React Query hook for claimed dates
export const useClaimedDates = () => {
  return useQuery({
    queryKey: ['claimedDates'],
    queryFn: fetchClaimedDates,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// You can add more queries/mutations below as your app grows
// Example:
// export const useCreateClaim = () => { ... } 