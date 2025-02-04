import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './screens/HomePage';
import NavigationBar from './components/NavigationBar';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Dashboard from './screens/Admin/Dashboard';
import { getUser } from './utils/helpers';
import RestaurantPage from './screens/Vendors/RestaurantPage';

function App() {
  const user = getUser();

  return (
    <div className="App">
      <Router>
        {/* {user.userType === 'Admin' ?
          (<></>) : (<NavigationBar />)
        } */}
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
        </Routes>
      </Router>
      <ToastContainer position='bottom-right' />
    </div>
  );
}

export default App;
