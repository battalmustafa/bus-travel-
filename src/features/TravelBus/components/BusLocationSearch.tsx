import { useState, useEffect } from 'react';
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
  const [originId, setOriginId] = useState<string>('');
  const [originName, setOriginName] = useState<string>('');
  
  const [destinationId, setDestinationId] = useState<string>('');
  const [destinationName, setDestinationName] = useState<string>('');
  
  const [departureDate, setDepartureDate] = useState<string>(getDefaultDate());
  const [error, setError] = useState<string | null>(null);

  const queryParameters = useQueryParameters();

  useEffect(() => {
    if (queryParameters) {
      setOriginId(queryParameters.originId.toString());
      setDestinationId(queryParameters.destinationId.toString());
      setDepartureDate(queryParameters.departureDate);
    }
  }, [queryParameters]);

  const validateInputs = () => {
    if (!originId || !destinationId) {
      setError('Please select both origin and destination');
      return false;
    }
    if (originId === destinationId) {
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
    if (validateInputs()) {
      const queryParams = BusQueryParametersService.encode({
        originId,
        destinationId,
        departureDate,
      });
      if (queryParams) {
        window.location.href = `/journey?${queryParams.toString()}`;
      }
    }
  };

  const swapLocations = () => {
    // Swap both the IDs and the names
    setOriginId(destinationId);
    setDestinationId(originId);

    setOriginName(destinationName);
    setDestinationName(originName);

    console.log(originId,destinationId, originName,destinationName)
  };

  return (
    <div className="pt-12 bg-background p-4">
      <LocationSelector
        className=""
        label="Nereden"
        locationId={originId}
        value={originName}
        onChange={(id, name) => {
          setOriginId(id);
          setOriginName(name);
        }}
      />
      <span className='flex justify-end -mt-5 -mb-5'>
        <SwapButton onClick={swapLocations} />
      </span>
      <LocationSelector
        className="-mt-2"
        label="Nereye"
        locationId={destinationId}
        value={destinationName}
        onChange={(id, name) => {
          setDestinationId(id);
          setDestinationName(name);
        }}
      />
      <DateSelector value={departureDate} onChange={setDepartureDate} />
      {error && <ValidationMessages error={error} />}
      <SearchButton onClick={handleSearch} />
    </div>
  );
};
export default BusLocationSearch