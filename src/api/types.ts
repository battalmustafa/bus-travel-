// src/api/types.ts

import { Journey, LocationItem } from "../types/types";

// Session Types
export interface GetSessionRequest {
  type: number;
  connection: {
    'ip-address': string;
    port: string;
  };
  browser: {
    name: string;
    version: string;
  };
}

export interface GetSessionResponse {
  status: string;
  data: {
    'session-id': string;
    'device-id': string;
    affiliate: string | null;
    'device-type': number;
    device: string | null;
    'ip-country': string;
  };
}

// Bus Locations Types
export interface GetBusLocationsRequest {
  data: null | string;
  "device-session": {
    'session-id': string;
    'device-id': string;
  };
  date: string;
  language: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  zoom: number;
  // Add other location properties...
}

export interface GetBusLocationsResponse {
  status: string;
  data: LocationItem[];
}

// Journey Types
export interface GetBusJourneysRequest {
  "device-session": {
    'session-id': string;
    'device-id': string;
  };
  data: {
    originId: number;
    destinationId: number;
    departureDate: string;
  };
  language: string;
}


export interface GetBusJourneysResponse {
  status: string;
  data: Journey[];
}

// Add other types as needed...