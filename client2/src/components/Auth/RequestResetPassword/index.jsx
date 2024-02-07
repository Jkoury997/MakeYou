// RequestResetPassword.jsx
import { useState } from 'react';
import authService from "../../../api/auth";
import Logo from "/image/logo-Marcela-Koury.svg";

function RequestResetPassword({ onResetRequested }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await authService.forgotPassword(email);
      setMessage(response.Mensaje);
      if (response.Estado) {
        onResetRequested();
      }
    } catch (error) {
      setMessage("Error al procesar la solicitud.");
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="text-center mt-3 mb-3">
                            <img src={Logo} alt="Logo" className="rounded-circle" style={{ width: '100px', height: '100px' }} />
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInputEmail" placeholder="Correo electrónico" value={email} onChange={handleEmailChange} />
                                    <label htmlFor="floatingInputEmail">Correo Electrónico</label>
                                </div>
                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary btn-pink mt-4 p-2" type="submit">Enviar Código</button>
                                </div>
                                {message && <div className="alert alert-info mt-2">{message}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default RequestResetPassword;
