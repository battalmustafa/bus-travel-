import React from 'react';
import BusLocationSearch from '../features/TravelBus/components/BusLocationSearch';
import Header from '../components/Header';
import TextComponent from '../components/TextComponent';

const Home: React.FC = () => {
  return (
    <div className='max-w-md border'>
    <Header />
    <BusLocationSearch />
    <TextComponent/>
    </div>
  );
};

export default Home;
