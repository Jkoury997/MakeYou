import { useState, useEffect } from 'react';
import { useNavigate,Routes,Route,Outlet} from 'react-router-dom';
import Header from '../../components/contents/Header';
import Sales from '../analytics/sales';
import CreateQrPage from '../qr/createQr';
import ListQrPage from '../qr';
import { LoadScript } from '@react-google-maps/api';
import StoreSendPage from '../logistics/storeSend';
import AutorizationPage from '../stores/autorization';

// Otros componentes de página

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            setUser(JSON.parse(userDataString));
        }
    },[]);

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <LoadScript 
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
         libraries={["places"]}
        >
            <div className="container-fluid">
            <Header user={user} />
            <main className="container-fluid">
            <Routes>
                {/* Analitics*/}
                <Route path="sales" element={<Sales />} />
                {/* QR*/}
                <Route path="qr/create" element={<CreateQrPage />} />
                <Route path='qr/list' element={<ListQrPage />}/>
                {/* Logistics*/}
                <Route path='logistics/storesend' element={<StoreSendPage />} />
                {/* Stores*/}
                <Route path='stores/autorization' element={<AutorizationPage />} />

                


            </Routes>
            </main>
        </div>
        </LoadScript>
        
    );
};

export default Dashboard;