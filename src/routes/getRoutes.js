const express = require("express");
const Team = require("../models/Team")
const Tornaments = require("../models/Tornament")
const Sport = require('../models/Sport')
const Router = express.Router()
const sequelize = require("../database/index")

Team.init(sequelize)
Tornaments.init(sequelize)
Sport.init(sequelize)

Router.get('/', async(req, res) => {
    if (req.session.logged){
      const tornaments = await Tornaments.findAll()
      res.render('index', {tornaments})
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
    // if (req.session.logged){
        const teams = await Team.findAll().then()
        const userData = req.session.user
        res.render("teams", {teams: teams, userData: userData})
    // }
    // else{
        // res.send('É necessário fazer login para acessar o sistema!')}
});

Router.get('/criar-time', async(req, res) => {
  if (req.session.logged){
    const sports = await Sport.findAll()
    res.render("create-team", {sports})
  }
  else{
     res.send('É necessário fazer login para acessar o sistema!')
  }
});

Router.get('/criar-torneio', (req, res) => {
  if (req.session.logged){
    res.render("create-tornament")
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