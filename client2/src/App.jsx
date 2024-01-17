import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './page/login';
import CompanyPage from './page/company';
import DashboardPage from './page/dashboard';
import ProtectedRoute from './hooks/useSecurity';
import ShowQrVcardPage from './page/qr/ShowQr/Vcard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/dashboard/*" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
        <Route path='/showqr/:id' element={<ShowQrVcardPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
