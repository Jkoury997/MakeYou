import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const SidebarLinks = () => {
    const location = useLocation();
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        const basePath = location.pathname.split('/')[2]; // Ajusta el índice si es necesario
        setActiveDropdown(basePath);
    }, [location]);

    const toggleDropdown = (dropdownId) => {
        setActiveDropdown(prev => (prev === dropdownId ? null : dropdownId));
    };

    const handleCloseOffcanvas = () => {
        const closeButton = document.querySelector('#offcanvasNavbar .btn-close');
        closeButton?.click();
    };

    const isDropdownActive = (dropdownId) => activeDropdown === dropdownId;

    return (
        <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                {/* Inicio */}
                <li className="nav-item">
                    <NavLink to="/dashboard" 
                        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                        onClick={handleCloseOffcanvas}>
                        Inicio
                    </NavLink>
                </li>

                {/* Estadísticas */}
                <li className={`nav-item dropdown ${isDropdownActive('estadisticas') ? "show" : ""}`}>
                    <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown('estadisticas')}>
                        Estadísticas
                    </button>
                    <ul className={`dropdown-menu ${isDropdownActive('estadisticas') ? "show" : ""}`}>
                        <li>
                            <NavLink to="/dashboard/sales"
                                className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}
                                onClick={handleCloseOffcanvas}>
                                Ventas
                            </NavLink>
                        </li>
                        {/* Agrega aquí otros enlaces de menú desplegable si los necesitas */}
                    </ul>
                </li>

                {/* Logística */}
                <li className={`nav-item dropdown ${isDropdownActive('logistica') ? "show" : ""}`}>
                    <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown('logistica')}>
                        Logística
                    </button>
                    <ul className={`dropdown-menu ${isDropdownActive('logistica') ? "show" : ""}`}>
                        <li>
                            <NavLink to="/dashboard/logistics/storesend"
                                className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}
                                onClick={handleCloseOffcanvas}>
                                Preparación Tienda
                            </NavLink>
                        </li>
                        {/* Agrega aquí otros enlaces de menú desplegable si los necesitas */}
                    </ul>
                </li>

                {/* QR */}
                <li className={`nav-item dropdown ${isDropdownActive('qr') ? "show" : ""}`}>
                    <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown('qr')}>
                        QR
                    </button>
                    <ul className={`dropdown-menu ${isDropdownActive('qr') ? "show" : ""}`}>
                        <li>
                            <NavLink to="/dashboard/qr/list"
                                className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}
                                onClick={handleCloseOffcanvas}>
                                Listado
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/qr/create"
                                className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}
                                onClick={handleCloseOffcanvas}>
                                Nuevo QR
                            </NavLink>
                        </li>
                        {/* Agrega aquí otros enlaces de menú desplegable si los necesitas */}
                    </ul>
                </li>
                {/* Tiendas */}
                <li className={`nav-item dropdown ${isDropdownActive('stores') ? "show" : ""}`}>
                    <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown('stores')}>
                        Tiendas
                    </button>
                    <ul className={`dropdown-menu ${isDropdownActive('stores') ? "show" : ""}`}>
                        <li>
                            <NavLink to="/dashboard/stores/autorization"
                                className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}
                                onClick={handleCloseOffcanvas}>
                                Autorizaciones
                            </NavLink>
                        </li>
                        {/* Agrega aquí otros enlaces de menú desplegable si los necesitas */}
                    </ul>
                </li>
                {/* Supplier */}
                <li className={`nav-item dropdown ${isDropdownActive('supplier') ? "show" : ""}`}>
                    <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown('supplier')}>
                        Provedores
                    </button>
                    <ul className={`dropdown-menu ${isDropdownActive('supplier') ? "show" : ""}`}>
                        <li>
                            <NavLink to="/dashboard/supplier/debt"
                                className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}
                                onClick={handleCloseOffcanvas}>
                                Deuda
                            </NavLink>
                        </li>
                        {/* Agrega aquí otros enlaces de menú desplegable si los necesitas */}
                    </ul>
                </li>
                {/* Csutomer */}
                <li className={`nav-item dropdown ${isDropdownActive('customer') ? "show" : ""}`}>
                    <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown('customer')}>
                        Clientes
                    </button>
                    <ul className={`dropdown-menu ${isDropdownActive('customer') ? "show" : ""}`}>
                        <li>
                            <NavLink to="/dashboard/customer/debt"
                                className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}
                                onClick={handleCloseOffcanvas}>
                                Deuda
                            </NavLink>
                        </li>
                        {/* Agrega aquí otros enlaces de menú desplegable si los necesitas */}
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default SidebarLinks;
