import React from 'react';
import SidebarLinks from '../SidebarLinks';

const Sidebar = ({ user }) => {
    return (
        
        <div className="container-fluid">
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">{user.Nombre}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <SidebarLinks />
            </div>
        </div>
    );
};

export default Sidebar;
