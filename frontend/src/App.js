import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './screens/HomePage';
import NavigationBar from './components/NavigationBar';
import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
      <ToastContainer position='top-center' />
    </div>
  );
}

export default App;
