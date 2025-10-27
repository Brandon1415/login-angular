const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET_KEY = 'tu-clave-secreta-123';

app.use(cors());
app.use(express.json());

// Usuario de prueba
const users = [
  {
    id: 1,
    email: 'test@example.com',
    password: '123456',
    name: 'Usuario de Prueba'
  }
];

// Endpoint de login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Generar token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET_KEY,
    { expiresIn: '24h' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});