// ResetPassword.jsx
import { useState } from 'react';
import authService from "../../../api/auth";
import { validarContrasena } from '../../../utils/validatePassword';
import Logo from "/image/logo-Marcela-Koury.svg"; // Asegúrate de tener la ruta correcta al logo
import { useNavigate } from 'react-router-dom';


function ResetPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nuevaClave, setNuevaClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [message, setMessage] = useState('');
  const [requisitos, setRequisitos] = useState({
    minCaracteres: false,
    unaLetra: false,
    unNumero: false
});

const actualizarRequisitos = (contrasena) => {
    setRequisitos({
        minCaracteres: contrasena.length >= 6,
        unaLetra: /[a-zA-Z]/.test(contrasena),
        unNumero: /\d/.test(contrasena),
        noConsecutivos: !/(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mnop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(contrasena)
    });
};

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleCodigoChange = (e) => {
    let valor = e.target.value.toUpperCase().replace(/[^A-Z0-9]/gi, ''); // Remueve caracteres no alfanuméricos y convierte a mayúsculas
    if (valor.length > 4) {
      valor = valor.substring(0, 4) + '-' + valor.substring(4, 8); // Inserta un guion después de los 4 primeros caracteres
    }
    setCodigo(valor.substring(0, 9)); // Asegura que el código no exceda los 9 caracteres
  };

  const handleNuevaClaveChange = (e) => {
    const nuevaContrasena = e.target.value;
    setNuevaClave(nuevaContrasena);
    
    const { esValida, resultados } = validarContrasena(nuevaContrasena);
    setRequisitos(resultados);
};
  const handleConfirmarClaveChange = (e) => setConfirmarClave(e.target.value);

  const handleSubmit = async (e) => {
        e.preventDefault();
        const { esValida, mensajeError } = validarContrasena(nuevaClave);

        if (!esValida) {
            setMessage(mensajeError);
            return;
        }
        
        if (nuevaClave !== confirmarClave) {
            setMessage('Las contraseñas no coinciden.');
            return;
        }
        try {
            const response = await authService.resetPassword(email, codigo, nuevaClave);
            setMessage(response.Mensaje);
            if (response.Estado) {
                setTimeout(() => {
                    navigate('/login'); // Asegúrate de que la ruta '/login' sea la correcta en tu aplicación
                }, 1500);
            }

        } catch (error) {
            setMessage("Error al reconfigurar la contraseña.");
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
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="floatingInputEmail" 
                                        value={email} 
                                        onChange={handleEmailChange} 
                                        placeholder="Email"
                                    />
                                    <label htmlFor="floatingInputEmail">Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="floatingInputCodigo" 
                                    value={codigo} 
                                    onChange={handleCodigoChange} 
                                    placeholder="Código de Verificación"
                                    maxLength="9" // Esto asegura que el usuario no pueda ingresar más de 9 caracteres
                                    />
                                    <label htmlFor="floatingInputCodigo">Código de Verificación</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="floatingInputNuevaClave" 
                                        value={nuevaClave} 
                                        onChange={handleNuevaClaveChange} 
                                        placeholder="Nueva Contraseña"
                                    />
                                    <label htmlFor="floatingInputNuevaClave">Nueva Contraseña</label>
                                </div>
                                <div className=' mt-2 ms-2'>
                                        <ul className="list-unstyled">
                                            <li className={` ${requisitos.minCaracteres ? 'text-success' : 'text-danger'}`}>
                                                <i className={`bi ${requisitos.minCaracteres ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i> Al menos 6 caracteres
                                            </li>
                                            <li className={` ${requisitos.unaLetra ? 'text-success' : 'text-danger'}`}>
                                                <i className={`bi ${requisitos.unaLetra ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i> Al menos una letra
                                            </li>
                                            <li className={` ${requisitos.unNumero ? 'text-success' : 'text-danger'}`}>
                                                <i className={`bi ${requisitos.unNumero ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i> Al menos un número
                                            </li>
                                        </ul>
                                    </div>
                                <div className="form-floating mb-3">
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="floatingInputConfirmarClave" 
                                        value={confirmarClave} 
                                        onChange={handleConfirmarClaveChange} 
                                        placeholder="Confirmar Nueva Contraseña"
                                    />
                                    <label htmlFor="floatingInputConfirmarClave">Confirmar Nueva Contraseña</label>
                                </div>
                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary btn-pink mt-4 p-2" type="submit">Cambiar Contraseña</button>
                                </div>
                                {message && <div className={`alert mt-3 ${message.startsWith("Error") ? "alert-danger" : "alert-success"}`} role="alert">{message}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default ResetPassword;
