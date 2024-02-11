import { useState, useEffect } from 'react';
import { useNavigate,Routes,Route} from 'react-router-dom';
import Header from '../../components/contents/Header';
import Sales from '../analytics/sales';
import CreateQrPage from '../qr/createQr';
import ListQrPage from '../qr';
import { LoadScript } from '@react-google-maps/api';
import StoreSendPage from '../logistics/storeSend';
import AutorizationPage from '../stores/autorization';
import SupplierDebtPage from '../supplier/debt';
import CustomerDebtPage from '../customer/debt';
import StockPage from '../stores/stock';
import PaymentMethodsPage from '../analytics/paymentMethods';

// Otros componentes de página

const libraries = ["places"];

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            setUser(JSON.parse(userDataString));
        } else {
            navigate('/login'); // Asegúrate de tener una ruta de login definida
        }
    }, [navigate]);

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <LoadScript 
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
        >
            <Header user={user} />
            <main className="container-fluid">
            <Routes>
                {/* Analitics*/}
                <Route path="analytics/sales" element={<Sales />} />
                <Route path="analytics/paymentmethods" element={<PaymentMethodsPage />} />
                {/* QR*/}
                <Route path="qr/create" element={<CreateQrPage />} />
                <Route path='qr/list' element={<ListQrPage />}/>
                {/* Logistics*/}
                <Route path='logistics/storesend' element={<StoreSendPage />} />
                {/* Stores*/}
                <Route path='stores/autorization' element={<AutorizationPage />} />
                <Route path='stores/stock' element={<StockPage />} />
                {/* Suplier*/}
                <Route path='supplier/debt' element={<SupplierDebtPage/>} />
                {/* Customer*/}
                <Route path='customer/debt' element={<CustomerDebtPage/>} />

            </Routes>
            </main>
        </LoadScript>

        
    );
};

export default Dashboard;