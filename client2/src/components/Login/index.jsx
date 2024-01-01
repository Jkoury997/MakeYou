import "./style.css";
import Logo from "/image/logo-Marcela-Koury.svg";

export default function Login({email, password, onSubmit }) {
    return (
        <section className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="text-center mt-3 mb-3">
                            <img 
                                src={Logo} 
                                alt="Logo" 
                                className="rounded-circle" 
                                style={{ width: '100px', height: '100px' }} 
                            /> 
                        </div>
                        <div className="card-body">
                        <form onSubmit={onSubmit}>
                                    <div className="form-floating mb-3">
                                        <input type="email" name="email" className="form-control" id="floatingInput" onChange={email} placeholder="name@example.com" />
                                        <label htmlFor="floatingInput">Email</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="password" name="password" className="form-control" id="floatingPassword" onChange={password} placeholder="Password" />
                                        <label htmlFor="floatingPassword">Contraseña</label>
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-primary btn-pink mt-4 p-2" type="submit">Iniciar sesión</button>
                                    </div>
                                </form>
                        <div className="text-center mt-3">
                            </div>
                            <div className="text-center mt-3">
                                <a href="/forgotPassword">¿Olvidaste tu contraseña?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    );
}
