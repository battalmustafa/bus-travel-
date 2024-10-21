import React from 'react';
import Header from '../components/Header';
import BusJourney from '../features/TravelBus/components/BusJourney';

const Home: React.FC = () => {
  return (
    <div className='max-w-md'>
    <BusJourney/>
    </div>
  );
};

export default Home;
