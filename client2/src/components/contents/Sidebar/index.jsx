import Logo from '/image/logo-Marcela-Koury.svg'; // Asegúrate de importar correctamente la imagen
import { NavLink } from 'react-router-dom';
import SidebarLinks from '../SidebarLinks';
const Sidebar = ({ user }) => {
    return (
        <header>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/dashboard">
                        <img src={Logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                        {user.Empresa}
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">{user.Nombre}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            
                                <SidebarLinks></SidebarLinks>
                            
                            <form className="d-flex mt-3" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Sidebar;
