import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './page/login';
import ScannerQR from './components/ScannerQR';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/qr' element={<ScannerQR />}/>
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </Router>
  );
}

export default App;