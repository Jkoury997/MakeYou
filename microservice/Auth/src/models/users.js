const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  // Add name field
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
  },
  
  // Add surname field
  surname: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    trim: true,
    maxlength: [100, 'El apellido no puede exceder los 100 caracteres']
  },
  
  // Add document number field
  documentNumber: {
    type: Number,
    required: [true, 'El número de documento es obligatorio'],
    match: [/^\d+$/, 'El número de documento debe contener solo números'],
    unique: true,
    trim: true
  },
  username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    unique: true,
    trim: true,
    minlength: [5, 'El nombre de usuario debe tener al menos 5 caracteres'],
    maxlength: [50, 'El nombre de usuario no puede exceder los 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Por favor ingresa un correo electrónico válido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
  },
  roles: {
    type: [String],
    default: ['user'],
    enum: ['user', 'admin']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: 1
  }
});

// Middleware de Mongoose para hashear la contraseña antes de guardar el usuario
userSchema.pre('save', async function (next) {
  // Solo hashear la contraseña si se ha modificado o es nueva
  if (!this.isModified('password')) return next();

  // Generar un 'salt' y hashear la contraseña
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);