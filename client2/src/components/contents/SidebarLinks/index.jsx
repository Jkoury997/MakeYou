import { NavLink } from "react-router-dom";

const SidebarLinks = () => {
    return (
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/dashboard">
                    Home
                </NavLink>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Estadísticas
                </a>
                <ul className="dropdown-menu">
                    <li>
                        <NavLink className="dropdown-item" to="/analytics/sales">
                            Ventas
                        </NavLink>
                    </li>
                    {/* Agrega aquí otros enlaces del menú desplegable si los hay */}
                </ul>
            </li>
            {/* Agrega aquí otros enlaces de navegación si los hay */}
        </ul>
    );
};

export default SidebarLinks;
