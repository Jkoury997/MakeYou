import { useState } from 'react';
// Asegúrate de importar el logo y estilos necesarios
import logo from "/image/logo-Marcela-Koury.svg";

function ForgotPassword({ email, onEmailChange, onSubmit, message }) {


    return (
            <section className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="text-center mt-3 mb-3">
                                    <img src={logo} alt="Logo" className="rounded-circle" style={{ width: '100px', height: '100px' }} />
                                </div>
                                <div className="card-body">
                                <form onSubmit={onSubmit}>
            <div className="form-floating mb-3">
                <input 
                    type="email" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={onEmailChange}
                />
                <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="d-grid gap-2">
                <button className="btn btn-primary btn-pink mt-4 p-2" type="submit">Recuperar Contraseña</button>
            </div>
        </form>
                                    {message && (
                                        <div className="text-center mt-3">
                                            <div className="alert alert-success" role="alert">
                                                {message}
                                            </div>
                                        </div>
                                    )}
                                    <div className="text-center mt-3">
                                        <a href="/login">Volver al inicio de sesión</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
};

export default ForgotPassword;
