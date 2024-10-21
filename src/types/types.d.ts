interface DeviceSession {
    sessionId: string;
    deviceId: string;
  }
  
  interface Data {
    originId: number;
    destinationId: number;
    departureDate: string;
  }
  
 export interface RequestPayload {
    deviceSession: DeviceSession;
    date: string;
    language: string;
    data: Data;
  }
  export interface SearchPayload {
    originId: number;
    destinationId: number;
    departureDate: string;
  }
  export interface LocationItem {
    id: number;
    name: string;
    country: string;
    city: string;
  }
  export interface Stop {
    id: number;
    kolayCarLocationId: number | null;
    name: string;
    station: string;
    time: string; // or use Date if you prefer to work with Date objects
    isOrigin: boolean;
    isDestination: boolean;
    isSegmentStop: boolean;
    index: number;
    obiletStationId: number | null;
    mapUrl: string | null;
    stationPhone: string | null;
    stationAddress: string | null;
}

export interface Policy {
    maxSeats: number | null;
    maxSingle: number;
    maxSingleMales: number | null;
    maxSingleFemales: number | null;
    mixedGenders: boolean;
    govId: boolean;
    lht: boolean;
}

export interface Journey {
    kind: string;
    code: string;
    stops: Stop[];
    origin: string;
    destination: string;
    departure: string; 
    arrival: string; 
    currency: string;
    duration: string; 
    originalPrice: number;
    internetPrice: number;
    providerInternetPrice: number;
    booking: string | null;
    busName: string;
    policy: Policy;
    features: string[];
    featuresDescription: string | null;
    description: string | null;
    available: boolean | null;
    partnerProviderCode: string | null;
    peronNo: string | null;
    partnerProviderId: string | null;
    isSegmented: boolean;
    partnerName: string | null;
    providerCode: string | null;
    sortingPrice: number;
}
