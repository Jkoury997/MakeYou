import React from 'react';
import SidebarLinks from '../SidebarLinks';
import Cookies from 'js-cookie';

const Sidebar = ({ user }) => {

    const handleLogout = () => {
        // Borrar el token de autenticación almacenado
        Cookies.remove('Token'); // Asumiendo que estás usando js-cookie
        Cookies.remove('AccessKey');
    
        // Redirigir al usuario a la página de inicio de sesión
        // Esto dependerá de tu enrutador; aquí hay un ejemplo usando react-router
        window.location.href = '/login';
    };


    return (
        
        <div className="container-fluid">
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">{user.Nombre}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <SidebarLinks />
                <div className="navbar-nav p-2 offcanvas-footer">
                    <button className="btn btn-dark" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-left me-2"></i>Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
