// Imports
import express from 'express';
import session from 'express-session';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import { resolve }from 'path';
import {sequelize} from './src/database/index.js'
import getRoutes from './src/routes/getRoutes.js'
import postRoutes from './src/routes/postRoutes.js'
import path from 'path';
import {fileURLToPath} from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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