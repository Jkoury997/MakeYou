const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = {
      createUser : async ({name,  surname, documentNumber, username, email, password }) => {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('El usuario ya existe');
    }

    const documentNumberExists = await User.findOne({ documentNumber });
    if (documentNumberExists) {
      throw new Error('El número de documento ya está registrado');
    }


    // Crear un nuevo usuario
    const user = new User({ name, surname , documentNumber, username, email, password });
    await user.save();

    // No retornar la contraseña
    user.password = undefined;
    
    return user;
  },
  loginUser : async ({ email, password }) => {
    // Buscar al usuario por correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      // Si el usuario no existe, lanza un error
      throw new Error('El correo electrónico no está registrado.');
    }
  
    // Comparar la contraseña proporcionada con la contraseña hasheada almacenada
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // Si la contraseña no coincide, lanza un error
      throw new Error('Contraseña incorrecta.');
    }
  
    // El usuario existe y la contraseña coincide, procedemos a generar el token
    const payload = {
      userId: user._id,
      username: user.username,
      emial: user.email,
      roles: user.roles
    };
  
    // Crear el token JWT
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET, // Asegúrate de que JWT_SECRET esté definido en tu archivo .env
      { expiresIn: '1h' } // Configura la duración de la validez del token según tus necesidades
    );
  
    // Retornar el token
    return { token, userId: user._id, roles: user.roles, email: user.email, };
  }
}