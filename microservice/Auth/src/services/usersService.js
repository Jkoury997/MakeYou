
const User = require('../models/users');


module.exports = {
  getAllUsers: async () => {
    const users = await User.find().select('-password');
    return users;
  },
  // Traer Usuario por ID
  getUserById: async (userId) => {
    return await User.findById(userId).select('-password');
  },
  // Traer Usuario por Email
  getUserByEmail: async (userEmail) => {
    return await User.findOne({ email: userEmail }).select('-password');
  },
  // Actualizar un usuario
  update: async (userId, updateData) => {
    // Encuentra el usuario por ID y actualiza
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('Usuario no encontrado.');
    }

    // Si se proporcionó una nueva contraseña en updateData, Mongoose se encargará de hashearla debido al middleware 'pre save'.
    Object.assign(user, updateData);
    user.updatedAt = new Date(); // Actualizar la fecha de 'updatedAt'

    // Guardar el usuario actualizado
    await user.save();
    return user;
  },
  // desactiva usuario
  deactivate: async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado.');
    }
    user.active = 0; // Suponiendo que 'active' es un campo en tu esquema de usuario
    await user.save();
    return user; // Devuelve el usuario actualizado
  },
  // desactiva usuario
  active: async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado.');
    }
    user.active = 1; // Suponiendo que 'active' es un campo en tu esquema de usuario
    await user.save();
    return user; // Devuelve el usuario actualizado
  },
  // Eliminar un usuario
  delete: async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado.');
    }
    await User.findByIdAndDelete(userId);
    return { message: 'Usuario eliminado correctamente.' };
  },
}