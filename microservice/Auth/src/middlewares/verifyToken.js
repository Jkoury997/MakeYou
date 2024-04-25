const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Obtener el encabezado de la solicitud
  const bearerHeader = req.header('Authorization');
  
  // Verificar si hay un encabezado de autorización y si tiene el formato correcto
  if (!bearerHeader || !bearerHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No hay token, autorización denegada' });
  }

  // Extraer el token del encabezado
  const token = bearerHeader.split(' ')[1];

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Añadir el usuario del payload del token a la solicitud
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expirado' });
    } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Token no válido' });
    } else {
        return res.status(401).json({ message: 'Error de autenticación' });
    }
  }
};

module.exports = authMiddleware;
