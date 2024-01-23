import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './page/auth/login';
import CompanyPage from './page/company';
import DashboardPage from './page/dashboard';
import ProtectedRoute from './hooks/useSecurity';
import ShowQrVcardPage from './page/qr/ShowQr/Vcard';
import ForgotPasswordPage from './page/auth/forgotpassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/forgotpassword' element={<ForgotPasswordPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/dashboard/*" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
        <Route path='/showqr/:id' element={<ShowQrVcardPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
