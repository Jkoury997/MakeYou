import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import Sidebar from '../../components/contents/Sidebar';
import DashboardRoutes from "../../components/DashboardRoutes"
// Otros componentes de página

const DashboardPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            setUser(JSON.parse(userDataString));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        
        <section>
                <Sidebar user={user} />
                <DashboardRoutes />
        </section>

    );
};

export default DashboardPage;