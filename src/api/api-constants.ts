// src/api/api-constants.ts

export const BASE_URL = 'https://v2-api.obilet.com';
export const AUTHORIZATION = 'Basic JEcYcEMyantZV095WVc3G2JtVjNZbWx1';

export const ENDPOINTS = {
  GET_SESSION: `/api/client/getsession`,
  GET_BUS_LOCATIONS: `/api/location/getbuslocations`,
  GET_BUS_JOURNEYS: `/api/journey/getbusjourneys`,
} as const;