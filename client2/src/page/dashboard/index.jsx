import { useState, useEffect } from 'react';
import { useNavigate,Routes,Route,Outlet} from 'react-router-dom';
import Header from '../../components/contents/Header';
import Sales from '../analytics/sales';

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
        <div className="container-fluid">
            <Header user={user} />
            <main className="container-fluid">
            <Routes>
                <Route path="sales" element={<Sales />} />
                {/* Agrega aquí más rutas para otras secciones del dashboard */}
            </Routes>
            </main>
        </div>
    );
};

export default Dashboard;