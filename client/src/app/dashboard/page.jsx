
"use client"
import { DashboardComponent } from '@/components/DashboardComponent/dashboard-component';
import withAuth from '@/components/security/withAuth'; // Asegúrate de ajustar la ruta según sea necesario
import Cookies from 'js-cookie';


const Dashboard = () => {

    // Suponiendo que tienes otro componente para mostrar la empresa seleccionada
    return (
        <DashboardComponent></DashboardComponent>
        
    );
};

export default withAuth(Dashboard);