const express = require("express");
const Team = require("../models/Team");
const User = require("../models/User")
const Router = express.Router()
const sequelize = require("../database/index");

Team.init(sequelize)
User.init(sequelize)


Router.post('/login', async(req, res) =>{
    const user = await User.findOne({
        where:{
            login: req.body.username,
            password: req.body.password
        }
    })
    if (!user){
        res.render('login', {alert: true});
        console.log("Usuário incorreto.");
    }
    else{
        console.log(user)
        req.session.logged = true;
        req.session.user = user.dataValues;
        res.redirect('/');
        return console.log("Autenticado");
    }
  }
)

Router.post('/criar-usuario', async(req, res) => {
    const user = await User.create({
        login: req.body.username,
        password: req.body.password
    })
    if(!user) {
        res.send("Credenciais inválidas")
        return console.log("Credenciais inválidas"); 
    }
    res.redirect('/login')
    console.log("Usuário criado: ", user.dataValues)
    }
)

Router.post('/recuperar-senha', async(req, res) => {
    const user = await User.update({password: req.body.password}, {where:{
        login: req.body.username
    }})
    // do the right handle for this update.
    if(!user) {
        res.send("Usuário não encontrado")
        return console.log("Usuário não encontrado"); 
      }
      res.redirect('/login')
      console.log("Senha modificada: ")
});

Router.post('/times', async(req, res) => {
    // await update({teamID: teamID}, {where:{
    //     id: userID // req.session.user.id
    // }});
})

Router.post('/criar-time', async(req, res) => {
    const team = await Team.create({
        name: req.body.name, 
        description: req.body.description, 
        numberOfMembers: req.body.members,
    });
    if(!team) {
        res.send("Credenciais inválidas")
        return console.log("Credenciais inválidas"); 
      }
      res.redirect('/times')
      console.log("Time criado")
});

Router.post('/perfil', async(req, res) => {
    const user = await User.update({login: req.bodyname, password: req.body.password}, {where:{
        login: req.session.user.login
    }})
    // do the right handle for this update.
    if(!user) {
        res.send("Credenciais inválidas")
        return console.log("Credenciais inválidas"); 
    }
    res.redirect('/')
    console.log("Usuário modificado")
});

module.exports = Router;