import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './screens/HomePage';
import NavigationBar from './components/NavigationBar';

function App() {

  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
