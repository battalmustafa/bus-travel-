import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useSession } from './hooks/useSession';

const App: React.FC = () => {
  const { sessionData, loading, error } = useSession();
  console.log(sessionData)
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
