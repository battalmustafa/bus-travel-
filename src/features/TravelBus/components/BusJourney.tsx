import React, { useState, useEffect } from 'react';
import LocationSelector from './LocationSelector';
import useQueryParameters from '../../../hooks/useQueryParameters';
import { useGetJourney } from '../../../hooks/useGetJourney';
import OfferCard from './OfferCard';
import Header from '../../../components/Header';
import Pagination from '@mui/material/Pagination';

interface BusJourneySearchProps {
  className?: string;
}

const BusJourney: React.FC<BusJourneySearchProps> = ({ className = '' }) => {
  const queryParameters = useQueryParameters();
  const [originId, setOriginId] = useState<string>(queryParameters?.originId?.toString() || '');
  const [destinationId, setDestinationId] = useState<string>(queryParameters?.destinationId?.toString() || '');
  const [departureDate, setDepartureDate] = useState<string>(queryParameters?.departureDate || '');
  
  const { offers, loading, error } = useGetJourney({ originId, destinationId, departureDate });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate the index of the last offer
  const indexOfLastOffer = currentPage * itemsPerPage;
  const indexOfFirstOffer = indexOfLastOffer - itemsPerPage;
  const currentOffers = offers.slice(indexOfFirstOffer, indexOfLastOffer);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Header 
        isBackButtonExist={true} 
        origin="departureName" 
        destination="arrivalName" 
        departureDate={departureDate} 
      />

      <div className={`max-w-md mx-auto bg-background p-4 ${className}`}>
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {loading && (
          <div className="mt-8 flex justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}

        {currentOffers.length > 0 && (
          <div className="mt-8">
            <div className="space-y-4">
              {currentOffers.map((offer: any) => (
                <OfferCard key={offer.journey.id} journey={offer.journey} />
              ))}
            </div>

            {/* Pagination Component */}
            <div className="flex justify-center mt-4">
              <Pagination
                count={Math.ceil(offers.length / itemsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BusJourney;
