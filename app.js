// Imports
const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const { resolve } = require('path');
const { exit } = require('process');
// const sequelize = require('./src/database/index')


const db = new sqlite3.Database('sample.db', (err) => {
  if(err) {
    return console.log(err.message);
 	}
	console.log("Connected to database!")
});

const app = express();
app.use(session({
  secret: 'sua_chave_secreta',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', resolve('./templates'))
app.set('view engine', 'ejs')


// sequelize.authenticate().then(() => {
//   console.log('Connection has been established successfully.');
// }).catch((err) => {
//   console.log('Unable to connect to the database:', err);
// });

// Route definition

app.get('/', (req, res) => {
  if (req.session.logged){
    res.render('index')
  }
  else{
     res.send('É necessário fazer login para acessar o sistema!')
  }
});

app.get('/login', (req, res) => {
  res.render('login', {alert: false})
});

app.post('/login', (req, res) =>{
  db.all(`select * from user where login = "${req.body.username}"`, (err, users) => {
    if (err){
      console.log(err.message)
    }
    else{
      users.forEach((user) =>{
        if (user.password == req.body.password){
          req.session.logged = true;
          req.session.user = user;
          console.log(req.session)
          return res.redirect('/')
        }
      })
        //res.render('login', {alert: true})
    }
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
  res.render("reset-password")
});

app.post('/recuperar-senha', (req, res) => {
  var query = 'UPDATE user SET password = ? WHERE login = ?'
  db.run(query, [req.body.password, req.body.username], (err) => {
    if(err) {
        res.send(err.message)
        return console.log(err.message); 
      }
      res.redirect('/login')
      console.log("Senha modificada")
    })
});

app.get('/times', (req, res) => {
  if (req.session.logged){
    db.all('select * from Time', (err, teams) => {
      if (err){
        return console.log(err.message)
      }
      else{
        res.render("teams", {teams})
      };
    })
  }
  else{
     res.send('É necessário fazer login para acessar o sistema!')
  }
});

app.get('/criar-time', (req, res) => {
  if (req.session.logged){
    res.render("create-team")
  }
  else{
     res.send('É necessário fazer login para acessar o sistema!')
  }
});

app.post('/criar-time', (req, res) => {
  db.run('INSERT INTO Time(Nome, Descricao, ParticipantesMaximos) VALUES(?, ?, ?)', [req.body.name, req.body.description, req.body.members], (err) => {
    if(err) {
        res.send(err.message)
        return console.log(err.message); 
      }
      res.redirect('/times')
      console.log("Time criado")
    })
});

app.get('/perfil', (req, res) => {
  if (req.session.logged){
    const user = req.session.user
    res.render("profile", {user})
  }
  else{
     res.send('É necessário fazer login para acessar o sistema!')
  }
});

app.post('/perfil', (req, res) => {
  var query = 'UPDATE user SET login = ?, password = ? WHERE login = ?'
  db.run(query, [req.body.name, req.body.password, req.session.user.login], (err) => {
    if(err) {
        res.send(err.message)
        return console.log(err.message); 
      }
      res.redirect('/')
      console.log("Usuário modificado")
    })
});

app.listen(3000, () => {    
  console.log('Server rodando na porta 3000 pae');
});