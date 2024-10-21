class BusQueryParametersService {
    static encode(formValues: any): URLSearchParams | null {

    
      const { originId, destinationId, departureDate } = formValues;
  
      if (originId && destinationId && departureDate) {
        const params = {
          "origin-id": originId.toString(),
          "destination-id": destinationId.toString(),
          "departure-date": departureDate,
        };
        return new URLSearchParams(params);

      }
      return null;
    }
  
    static decode(urlParams: URLSearchParams): { originId: number; destinationId: number; departureDate: string } | null {
        console.log(urlParams)
      const originId = urlParams.get("origin-id");
      const destinationId = urlParams.get("destination-id");
      const departureDate = urlParams.get("departure-date");
  
      if (originId && destinationId && departureDate) {
        return {
          originId: parseInt(originId, 10),
          destinationId: parseInt(destinationId, 10),
          departureDate,
        };
      }
  
      return null;
    }
  }
  
  export default BusQueryParametersService;
  