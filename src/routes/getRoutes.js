const express = require("express");
const Team = require("../models/Team")
const Router = express.Router()
const sequelize = require("../database/index")

Team.init(sequelize)


Router.get('/', (req, res) => {
    if (req.session.logged){
      res.render('index')
    }
    else{
       res.send('É necessário fazer login para acessar o sistema!')
    }
  });
  
Router.get('/login', (req, res) => {
    res.render('login', {alert: false})
});

Router.get('/criar-usuario', (req, res) => {
  res.render('create-account')
});

Router.get('/recuperar-senha', (req, res) => {
  res.render("reset-password")
});

Router.get('/times', async (req, res) => {
    if (req.session.logged){
        const teams = await Team.findAll().then()
        res.render("teams", {teams})
    }
    else{
        res.send('É necessário fazer login para acessar o sistema!')}
});

Router.get('/criar-time', (req, res) => {
  if (req.session.logged){
    res.render("create-team")
  }
  else{
     res.send('É necessário fazer login para acessar o sistema!')
  }
});

Router.get('/perfil', (req, res) => {
  if (req.session.logged){
    const user = req.session.user
    res.render("profile", {user})
  }
  else{
     res.send('É necessário fazer login para acessar o sistema!')
  }
});

module.exports = Router;