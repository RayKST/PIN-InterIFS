const express = require('express');
const ejs = require('ejs')
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('sample.db');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Tela principal')
});

app.get('/login', (req, res) => {
  ejs.renderFile('templates/login.ejs', (err, html) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else {
      res.send(html);
    }
  });
});

app.get('/recuperar-senha', (req, res) => {
    res.send('Tela de recuperar senha');
});

app.get('/criar-usuario', (req, res) => {
  ejs.renderFile('templates/create-account.ejs', (err, html) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else {
      res.send(html);
    }
  });
});

app.listen(3000, () => {    
  console.log('Server rodando na porta 3000 pae');
});