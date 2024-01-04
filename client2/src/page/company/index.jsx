// CompanyPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from "../../api/auth";
import SelectCompany from '../../components/Auth/Company';

const CompanyPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Leer datos del usuario desde Local Storage
        const userDataString = localStorage.getItem('userDataLogin');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUser(userData);
        } else {
            navigate('/login'); // Redirige al login si no hay datos de usuario
        }
    }, [navigate]);

    const handleCompanySelect = async (codigoEmpresa) => {
        try {
            const userData = await authService.userAccess(codigoEmpresa);
            if (userData.Estado) {
                // Actualizar los datos del usuario en Local Storage si es necesario
                localStorage.setItem('userData', JSON.stringify(userData));
                setUser(userData);
                navigate('/dashboard');
            } else {
                // Manejar respuesta no exitosa
            }
        } catch (error) {
            alert(error.message);
        }
    };

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <SelectCompany 
            user={user.Nombre}
            empresas={user.Empresas}
            onCompanySelect={handleCompanySelect} 
        />
    );
};

export default CompanyPage;
