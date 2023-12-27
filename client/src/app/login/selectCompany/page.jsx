"use client"
import withAuth from '@/components/security/withAuth'; // Asegúrate de ajustar la ruta según sea necesario
import Cookies from 'js-cookie';
import { SelectCompany } from '@/components/SelectCompanyComponent/SelectCompany';

const selectcompany = () => {
    const empresasRaw = Cookies.get('Empresas');
    const empresas = empresasRaw ? JSON.parse(empresasRaw) : null;
    const datos = {
        Nombre: Cookies.get('Nombre'),
        Empresas: empresas,
    };

    // Suponiendo que tienes otro componente para mostrar la empresa seleccionada
    return (
        <SelectCompany datos={datos} />
        
    );
};

export default withAuth(selectcompany);