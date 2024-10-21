import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useSession } from './hooks/useSession';

const App: React.FC = () => {
  useSession();
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
