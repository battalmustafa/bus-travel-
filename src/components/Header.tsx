import React from 'react';
import { Link } from 'react-router-dom'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { formatDate } from '../utils/utils';

interface HeaderProps {
  isBackButtonExist?: boolean; 
  origin?: string;              
  destination?: string;         
  departureDate?: string;       
}

const Header: React.FC<HeaderProps> = ({ 
  isBackButtonExist = false, 
  origin, 
  destination, 
  departureDate 
}) => {
  

  return (
    <div className="bg-header text-white min-h-12 px-4 py-2">
      {/* Back Button */}
      {isBackButtonExist && (
        <Link to="/" className="text-white hover:text-gray-300">
          <ArrowBackIcon className='text-white' />
        </Link>
      )}

      {/* Title / Info Area */}
      <div className="flex flex-col items-center">
        {origin && destination && <p>{origin} - {destination}</p>}
        {departureDate && <p>{formatDate(departureDate)}</p>}
      </div>
    </div>
  );
};

export default Header;
