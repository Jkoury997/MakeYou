const usersService = require('../services/usersService');

module.exports = {
    listUsers: async (req,res) => {
        try {
            const users = await usersService.getAllUsers();
    
            res.status(201).json({
            message: 'Usuario listados con éxito',
            users
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Obtener un usuario por ID
  getUserById: async (req, res) => {
    try {
      const user = await usersService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Obtener un usuario por Email
  getUserByEmail: async (req, res) => {
    try {
      const user = await usersService.getUserByEmail(req.params.email);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
   // Actualizar un usuario
   updateUser: async (req, res) => {
    try {
      const updatedUser = await usersService.update(req.params.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Eliminar (desactivar) un usuario
  deactivateUser: async (req, res) => {
    try {
      const user = await usersService.deactivate(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
      res.json({ message: 'Usuario desactivado correctamente.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // habilita (activa) un usuario
  activeUser: async (req, res) => {
    try {
      const user = await usersService.active(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
      res.json({ message: 'Usuario activado correctamente.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //Elimina el Usuario
  deleteUser: async (req,res) => {
    try{
        const user = await usersService.delete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
          }
        res.json({ message: 'Usuario eliminado correctamente.' });
    }catch (error) {
        res.status(500).json({ message: error.message });
      }
  }

    
};
