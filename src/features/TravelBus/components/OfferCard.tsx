import React from 'react';
import { Journey } from '../../../types/types';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface OfferCardProps {
  journey: Journey;
}

const OfferCard: React.FC<OfferCardProps> = ({ journey }) => {
  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {journey && (
        <div className="flex flex-col cursor-pointer justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative">
          {/* Price Area */}
          <div className="absolute right-4 top-4">
            <p className="text-xl font-medium bg-pricered text-white p-1 px-4 rounded-md whitespace-nowrap">
              {journey['internet-price'].toLocaleString('tr-TR')} ₺
            </p>
          </div>
          
          {/* Journey Details */}
          <div className="grid grid-cols-12">
            <div className="grid grid-cols-12 col-span-5 gap-2">
              <div className="col-span-4">
                <p className="text-md text-textcard">KALKIŞ</p>
                <p className="text-xl font-semibold text-textcard">{formatTime(journey.departure)}</p>
              </div>
            <div className='col-span-2'>
                <p className='h-6'></p>
                <p><ArrowForwardIcon className="text-textcard"/></p>
            </div>
              <div className="col-span-4">
                <p className="text-md text-textcard">VARIŞ</p>
                <p className="text-xl font-semibold text-textcard">{formatTime(journey.arrival)}</p>
              </div>
            </div>
            <div className="col-span-9">
              <span className="text-sm font-medium whitespace-nowrap">{journey.origin} - {journey.destination}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OfferCard;
