import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const SidebarLinks = () => {
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        setIsDropdownOpen(location.pathname.startsWith("/dashboard"));
    }, [location]);

    const handleCloseOffcanvas = () => {
        const closeButton = document.querySelector('#offcanvasNavbar .btn-close');
        if (closeButton) {
            closeButton.click();
        }
    };

    return (
        <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                    <NavLink to="/dashboard" 
                    className={({ isActive }) => isActive ? "nav-link active " : "nav-link"}
                    onClick={handleCloseOffcanvas}>Inicio</NavLink>
                    
                </li>
                <li className={`nav-item dropdown ${isDropdownOpen ? "show" : ""}`}>
                    <a className="nav-link dropdown-toggle" href="#" role="button" 
                    data-bs-toggle="dropdown" aria-expanded={isDropdownOpen}>
                        Estadísticas
                    </a>
                    <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                        <li>
                            <NavLink 
                                to="/dashboard/sales"
                                className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}
                                onClick={handleCloseOffcanvas}
                            >
                                Ventas
                            </NavLink>
                        </li>
                        {/* ... otros enlaces del menú desplegable ... */}
                    </ul>
                </li>
                <li className={`nav-item dropdown ${isDropdownOpen ? "show" : ""}`}>
                    <a className="nav-link dropdown-toggle" href="#" role="button" 
                    data-bs-toggle="dropdown" aria-expanded={isDropdownOpen}>
                        Logistica
                    </a>
                    <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                        <li>
                            <NavLink 
                            to="/dashboard/logistics/storesend"
                            className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}
                            onClick={handleCloseOffcanvas}
                            >
                                Peparacion Tienda
                            </NavLink>
                        </li>
                        {/* ... otros enlaces del menú desplegable ... */}
                    </ul>
                </li>
                <li className={`nav-item dropdown ${isDropdownOpen ? "show" : ""}`}>
                    <a className="nav-link dropdown-toggle" href="#" role="button" 
                    data-bs-toggle="dropdown" aria-expanded={isDropdownOpen}>
                        Qr
                    </a>
                    <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                        <li>
                            <NavLink 
                            to="/dashboard/qr/list"
                            className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}
                            onClick={handleCloseOffcanvas}
                            >
                                Listado
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                            to="/dashboard/qr/create"
                            className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"}
                            onClick={handleCloseOffcanvas}
                            >
                                Nuevo Qr
                            </NavLink>
                        </li>
                        {/* ... otros enlaces del menú desplegable ... */}
                    </ul>
                </li>
                {/* ... más enlaces de navegación ... */}
            </ul>
        </div>

    );
};

export default SidebarLinks;

