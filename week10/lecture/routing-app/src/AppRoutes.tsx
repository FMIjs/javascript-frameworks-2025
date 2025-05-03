import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/something" element={<div>Just an empty page</div>} />
    </Routes>
  );
};

export default AppRoutes; 