import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ShoppingCart from './features/cart/ShoppingCart';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/shopping-cart" element={<ShoppingCart />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes; 