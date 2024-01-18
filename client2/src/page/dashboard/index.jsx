import { useState, useEffect } from 'react';
import { useNavigate,Routes,Route,Outlet} from 'react-router-dom';
import Header from '../../components/contents/Header';
import Sales from '../analytics/sales';
import CreateQrPage from '../qr/createQr';
import ListQrPage from '../qr';
import { LoadScript } from '@react-google-maps/api';

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
        googleMapsApiKey="AIzaSyCpWvfH4kaRJ7WxQxFU1oPasGVXWGhveQg"
        libraries={["places"]}
        >
            <div className="container-fluid">
            <Header user={user} />
            <main className="container-fluid">
            <Routes>
                <Route path="sales" element={<Sales />} />
                {/* Agrega aquí más rutas para otras secciones del dashboard */}
                <Route path="qr/create" element={<CreateQrPage />} />
                <Route path='qr/list' element={<ListQrPage />}/>
            </Routes>
            </main>
        </div>
        </LoadScript>
        
    );
};

export default Dashboard;