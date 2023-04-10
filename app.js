const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('bem vindo a tela principal');
});

app.get('/login', (req, res) => {
    res.send('Tela de login');
});

app.get('/recuperar-senha', (req, res) => {
    res.send('Tela de recuperar senha');
});

app.get('/criar-usuario', (req, res) => {
    res.send('Tela de criar usuario');
});

app.listen(3000, () => {
  console.log('Server rodando na porta 3000 pae');
});