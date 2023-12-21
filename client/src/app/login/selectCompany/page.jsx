"use client"
import withAuth from '@/components/security/withAuth'; // Asegúrate de ajustar la ruta según sea necesario
import Cookies from 'js-cookie';
import { SelectCompany } from '@/components/component/selectCompany';

const selectcompany = () => {
    const datos = {
        Nombre: Cookies.get('Nombre'),
        Empresas: JSON.parse(Cookies.get('Empresas')),
    };

    // Suponiendo que tienes otro componente para mostrar la empresa seleccionada
    return (
        <SelectCompany datos={datos} />
        
    );
};

export default withAuth(selectcompany);