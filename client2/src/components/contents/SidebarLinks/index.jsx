import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const SidebarLinks = () => {
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        // Verifica si la ruta actual es parte del menú "Estadísticas"
        if (location.pathname.startsWith("/dashboard/sales")) {
            setIsDropdownOpen(true);
        } else {
            setIsDropdownOpen(false);
        }
    }, [location]);

    return (
        <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                    <NavLink 
    to="/dashboard" 
    className={({ isActive }) => isActive ? "nav-link active " : "nav-link"}
>
    Inicio
</NavLink>
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
                            
                            >
                                Ventas
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

