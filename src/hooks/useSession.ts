import { useEffect, useState } from 'react';
import { getBrowserInfo } from '../utils/browserInfo';
import { apiService } from '../api/api-service';

interface SessionData {
  sessionId: string;
  deviceId: string;
  ipCountry: string;
  deviceType: number;
}

export const useSession = () => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      try {
        // Check if the session data already exists in sessionStorage
        const storedSession = sessionStorage.getItem('sessionData');
        if (storedSession) {
          // If session data exists, parse it and set it in state
          const parsedSession: SessionData = JSON.parse(storedSession);
          setSessionData(parsedSession);
          setLoading(false);
          return;
        }

        // If not in sessionStorage, proceed to fetch the session
        // Get the IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResponse.json();

        // Get the browser information from utility
        const browserInfo = getBrowserInfo();

        const requestData = {
          type: 7,
          connection: {
            'ip-address': ip,
            port: '3000'
          },
          browser: {
            name: browserInfo.name,
            version: browserInfo.version
          }
        };

        // Call the session API
        const response = await apiService.getSession(requestData);
        
        if (response.status === 'Success') {
          const { 'session-id': sessionId, 'device-id': deviceId, 'ip-country': ipCountry, 'device-type': deviceType } = response.data;
          const session = { sessionId, deviceId, ipCountry, deviceType };
          
          // Set the session data in state and sessionStorage
          setSessionData(session);
          sessionStorage.setItem('sessionData', JSON.stringify(session));
        } else {
          setError('Failed to fetch session data');
        }
      } catch (err) {
        setError('An error occurred while fetching session data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { sessionData, loading, error };
};
