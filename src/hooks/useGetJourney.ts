import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../api/api-service';
import { Journey } from '../types/types';

interface UseGetJourneyParams {
  originId: string;
  destinationId: string;
  departureDate: string;
}

interface UseGetJourneyReturn {
  offers: Journey[];
  loading: boolean;
  error: string | null;
}

export const useGetJourney = ({ originId, destinationId, departureDate }: UseGetJourneyParams): UseGetJourneyReturn => {
  const [offers, setOffers] = useState<Journey[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOffers = useCallback(async () => {
    if (!originId || !destinationId || !departureDate) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getBusJourneys(
        parseInt(originId),
        parseInt(destinationId),
        departureDate
      );

      if (response.status === 'Success' && response.data) {
        setOffers(response.data);
      } else {
        setError('Failed to fetch journeys');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching journeys');
      console.error('Error fetching bus journeys:', err);
    } finally {
      setLoading(false);
    }
  }, [originId, destinationId, departureDate]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  return {
    offers,
    loading,
    error,
  };
};