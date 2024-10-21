import { useState, useEffect } from 'react';
import { useGetBusLocations } from '../../../hooks/useGetBusLocations'; // Assuming this hook fetches locations data
import {  getDefaultDate } from '../../../utils/utils';
import LocationSelector from './LocationSelector';
import DateSelector from './DateSelector';
import useQueryParameters from '../../../hooks/useQueryParameters';
import BusQueryParametersService from '../../../services/BusQueryParameterService';
import SwapButton from '../../../components/Swap';
import ValidationMessages from '../../../components/ValidationMessages';
import SearchButton from '../../../components/SearchButton';
import React from 'react';

const BusLocationSearch: React.FC = () => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<string>(getDefaultDate());
  const [error, setError] = useState<string | null>(null);
  const queryParameters = useQueryParameters()
  console.log(queryParameters)

  useEffect(() => {
    const storedValues = queryParameters;
    if (storedValues) {
      setOrigin(storedValues.originId.toString());
      setDestination(storedValues.destinationId.toString());
      setDepartureDate(storedValues.departureDate);
    }
  }, []);

  const validateInputs = () => {
    if (!origin || !destination) {
      setError('Please select both origin and destination');
      return false;
    }
    if (origin === destination) {
      setError('Origin and destination cannot be the same');
      return false;
    }
    if (new Date(departureDate) < new Date(Date.now() - 86400000)) {
      setError('Departure date cannot be in the past');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSearch = () => {
    console.log("run")
    if (validateInputs() && origin !== null && destination !== null) {
      // Encode the form values using BusQueryParametersService
      const queryParams = BusQueryParametersService.encode({
        originId:origin,
        destinationId:destination,
        departureDate,
      });
      console.log(queryParams,"params")

      if (queryParams) {
        window.location.href = `/journey?${queryParams.toString()}`;
      }
    }
  };

  const swapLocations = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  return (
    <div className="pt-12 bg-background p-4">
    <LocationSelector
      className=""
      label="Nereden"
      locationId={origin}
      value={""}
      onChange={setOrigin}
    
    />
    <span className=' flex justify-end -mt-5 -mb-5' >
    <SwapButton onClick={swapLocations} />

    </span>
    <LocationSelector
    className= "-mt-2 "
      label="Nereye"
      value={destination}
      onChange={setDestination}
      locationId={destination}
     
    />
    <DateSelector
      value={departureDate}
      onChange={setDepartureDate}
    />
    {error && <ValidationMessages error={error} />}
    <SearchButton onClick={handleSearch} />
  </div>  );
};

export default BusLocationSearch;
