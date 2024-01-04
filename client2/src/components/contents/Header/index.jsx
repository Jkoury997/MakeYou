import { NavLink } from 'react-router-dom';
import Logo from '/image/logo-Marcela-Koury.svg';
import Sidebar from '../Sidebar';

const Header = ({ user }) => {
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
                    <Sidebar user={user} />
                </div>
            </nav>
        </header>
    );
};

export default Header;
