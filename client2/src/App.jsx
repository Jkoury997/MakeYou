import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './page/login';
import CompanyPage from './page/company';
import DashboardRoutes from './components/DashboardRoutes';
import DashboardPage from './page/dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/company' element={<CompanyPage />} />
        <Route path='/dashboard' element={<DashboardPage />}/>
      </Routes>
      <DashboardRoutes />
    </Router>
  );
}

export default App;