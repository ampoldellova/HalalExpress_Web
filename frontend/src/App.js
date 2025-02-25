import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './screens/HomePage';
import NavigationBar from './components/NavigationBar';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Dashboard from './screens/Admin/Dashboard';
import { getUser } from './utils/helpers';
import RestaurantPage from './screens/Vendors/RestaurantPage';
import SupplierPage from './screens/Suppliers/SupplierPage';
import Profile from './screens/User/Profile';
import CheckOutPage from './screens/CheckOutPage';

function App() {
  const user = getUser();

  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
          <Route path="/supplier/:id" element={<SupplierPage />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/checkout/:id" element={<CheckOutPage />} />
        </Routes>
      </Router>
      <ToastContainer position='bottom-right' stacked limit={5} />
    </div>
  );
}

export default App;
