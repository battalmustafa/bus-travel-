import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../api/api-service';
import { LocationItem } from '../types/types';

interface UseGetBusLocationsReturn {
  locations: LocationItem[];
  loading: boolean;
  error: string | null;
  refetch: (term: string) => Promise<void>;
}

export const useGetBusLocations = (initialTerm: string = ''): UseGetBusLocationsReturn => {
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [term, setTerm] = useState<string>(initialTerm);

  const fetchLocations = useCallback(async (searchTerm: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getBusLocations(searchTerm);
      
      if (response.status === 'Success' && response.data) {
       
        setLocations(response.data);
      } else {
        setError('Failed to fetch locations');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching locations');
      console.error('Error fetching bus locations:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (term) {
      fetchLocations(term);
    }
  }, [term, fetchLocations]);

  const refetch = async (newTerm: string) => {
    setTerm(newTerm);
  };

  return {
    locations,
    loading,
    error,
    refetch
  };
};
