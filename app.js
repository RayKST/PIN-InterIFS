// Imports
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const { resolve } = require('path');


const db = new sqlite3.Database('sample.db', (err) => {
	if(err) {
		return console.log(err.message);
	}
	console.log("Connected to database!")
});

const app = express();
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', resolve('./templates'))
app.set('view engine', 'ejs')


// Route definition

app.get('/', (req, res) => {
  res.send('Tela principal')
});

app.get('/login', (req, res) => {
  res.render('login')
});

app.post('/login', (req, res) =>{
  db.all('select * from user', (err, rows) => {
    if (err){
      return err
    }
    else{
      rows.forEach((row) =>{
        if (row.login == req.body.username && row.password == req.body.password){
          res.redirect('/')
        } else{
          res.send('Credenciais incorretas')
        }
      })
    };
  })
})

app.get('/criar-usuario', (req, res) => {
  res.render('create-account')
});

app.post('/criar-usuario', (req, res) => {
  
  db.run('INSERT INTO user(login, password) VALUES(?, ?)', [req.body.username, req.body.password], (err) => {
  if(err) {
      res.send(err.message)
      return console.log(err.message); 
    }
    res.redirect('/login')
    console.log("Usuário criado")
  })
})

app.get('/recuperar-senha', (req, res) => {
  res.send('Tela de recuperar senha');
});


app.listen(3000, () => {    
  console.log('Server rodando na porta 3000 pae');
});