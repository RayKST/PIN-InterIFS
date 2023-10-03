// Imports
const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const { resolve } = require('path');
const sequelize = require('./src/database/index')
const getRoutes = require('./src/routes/getRoutes')
const postRoutes = require('./src/routes/postRoutes')

sequelize.authenticate().then(() => {
  console.log('Banco de dados conectado.');
}).catch((err) => {
  console.log('Erro ao conectar:', err);
});

const app = express();
app.use(session({
  secret: 'sua_chave_secreta',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static(__dirname + '/src'))
app.use(express.static('./src/static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', resolve('./src/templates'))
app.set('view engine', 'ejs')

app.use(getRoutes)
app.use(postRoutes)

app.listen(8080, () => {    
  console.log('Server rodando na porta 8080 pae');
});