// import { ENDPOINTS } from "./api-constants";

// interface GetSessionRequest {
//     type: number;
//     connection: {
//       'ip-address': string;
//       port: string;
//     };
//     browser: {
//       name: string;
//       version: string;
//     };
//   }
  
//   interface GetSessionResponse {
//     status: string;
//     data: {
//       'session-id': string;
//       'device-id': string;
//       affiliate: string | null;
//       'device-type': number;
//       device: string | null;
//       'ip-country': string;
//     };
//   }
  
//   export const getSession = async (requestData: GetSessionRequest): Promise<GetSessionResponse> => {
//     const response = await fetch(ENDPOINTS.GET_SESSION, { 
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Basic JEcYcEMyantZV095WVc3G2JtVjNZbWx1'
//     },
//       body: JSON.stringify(requestData),
//     });
  
//     if (!response.ok) {
//       throw new Error('Failed to fetch session');
//     }
  
//     return response.json();
//   };
  