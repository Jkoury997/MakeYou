const express = require('express');
const connectDB = require('./database/config/dbConfig');
const methodOverride = require('method-override');
const cors = require('cors');
const mainRouter = require('./routers/mainRouter');

require('dotenv').config();


const app = express();

app.use(express.json());

const corsOptions = {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: "*"  // Ajusta esto según tus necesidades de seguridad
};

app.use(cors(corsOptions));

// Override con un header HTTP (por ejemplo: X-HTTP-Method-Override)
app.use(methodOverride('X-HTTP-Method-Override'));

// O un override usando un parámetro de URL o de cuerpo
app.use(methodOverride('_method')); // Mira la documentación para más detalles

// Ahora puedes usar formularios HTML para enviar PUT/DELETE así:
// <form method="POST" action="/resource?_method=DELETE">



// Use the router for all routes that start with '/users'
app.use('/ircounter/api',mainRouter);


const PORT = process.env.PORT || 3000;

//la conexión a la base de datos para que el servidor solo se inicie si la conexión es exitosa
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Database connection failed, server not started:', err);
    process.exit(1); // Termina el proceso si la conexión a la base de datos falla.
  });