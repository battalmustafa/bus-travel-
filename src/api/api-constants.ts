// src/api/api-constants.ts

export const BASE_URL = 'https://v2-api.obilet.com';
export const AUTHORIZATION = 'Basic JEcYcEMyantZV095WVc3G2JtVjNZbWx1';

export const ENDPOINTS = {
  GET_SESSION: `/api/client/getsession`,
  GET_BUS_LOCATIONS: `/api/location/getbuslocations`,
  GET_BUS_JOURNEYS: `/api/journey/getbusjourneys`,
  GET_BUS_JOURNEY: `api/journey/getbusjourneydetail`,
  // Add other endpoints here...
} as const;