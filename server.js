const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Configurar os cabeçalhos para permitir CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://liteweb.officeadv.com.br:4001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization, X-XSRF-TOKEN');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.post('/login', (req, res) => {
  const { token } = req.cookies; // Obtém o cookie chamado 'token' enviado pelo Manager

  // Verifica se o cookie existe e contém um token criptografado
  if (token) {
    console.log('Token criptografado:', token);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Cookie inválido ou não encontrado.' });
  }
});

app.listen(3000, () => {
  console.log('Lite API está rodando na porta 3000.');
});