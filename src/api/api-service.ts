// src/api/api-service.ts
import { ENDPOINTS, AUTHORIZATION } from './api-constants';
import {
  GetBusJourneysRequest,
  GetBusJourneysResponse,
  GetBusLocationsRequest,
  GetBusLocationsResponse,
  GetSessionRequest,
  GetSessionResponse
} from './types';

class ApiService {
  private static instance: ApiService;
  private sessionId: string | null = null;
  private deviceId: string | null = null;

  private constructor() {
    this.loadSessionInfo(); // Load session info from sessionStorage on initialization
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private async fetchApi<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AUTHORIZATION,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  private saveSessionInfo(sessionId: string, deviceId: string) {
    this.sessionId = sessionId;
    this.deviceId = deviceId;
    // Save session info to sessionStorage
    sessionStorage.setItem('sessionId', sessionId);
    sessionStorage.setItem('deviceId', deviceId);
  }

  private loadSessionInfo() {
    // Load session info from sessionStorage
    this.sessionId = sessionStorage.getItem('sessionId');
    this.deviceId = sessionStorage.getItem('deviceId');
  }

  public setSessionInfo(sessionId: string, deviceId: string) {
    this.saveSessionInfo(sessionId, deviceId);
  }

  public async getSession(requestData: GetSessionRequest): Promise<GetSessionResponse> {
    const response = await this.fetchApi<GetSessionResponse>(
      ENDPOINTS.GET_SESSION,
      {
        method: 'POST',
        body: JSON.stringify(requestData),
      }
    );

    if (response.status === 'Success') {
      this.setSessionInfo(response.data['session-id'], response.data['device-id']);
    }

    return response;
  }

  public async getBusLocations(term: string): Promise<GetBusLocationsResponse> {
    if (!this.sessionId || !this.deviceId) {
      throw new Error('Session not initialized');
    }
  
    const requestData: GetBusLocationsRequest = {
      data: 
        term 
      ,
      "device-session": {
        'session-id': this.sessionId,
        'device-id': this.deviceId,
      },
      date: new Date().toISOString(),
      language: 'tr-TR',
    };
  
    return this.fetchApi<GetBusLocationsResponse>(
      ENDPOINTS.GET_BUS_LOCATIONS,
      {
        method: 'POST',
        body: JSON.stringify(requestData),
      }
    );
  }
  

  public async getBusJourneys(
    originId: number,
    destinationId: number,
    departureDate: string
  ): Promise<GetBusJourneysResponse> {
    if (!this.sessionId || !this.deviceId) {
      throw new Error('Session not initialized');
    }

    const requestData: GetBusJourneysRequest = {
        "device-session": {
            'session-id': this.sessionId,
            'device-id': this.deviceId,
          },
      data: {
        originId,
        destinationId,
        departureDate,
      },
      language: 'tr-TR',
    };

    return this.fetchApi<GetBusJourneysResponse>(
      ENDPOINTS.GET_BUS_JOURNEYS,
      {
        method: 'POST',
        body: JSON.stringify(requestData),
      }
    );
  }

  // Add other API methods as needed...
}

// Export singleton instance
export const apiService = ApiService.getInstance();
