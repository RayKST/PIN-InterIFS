const express = require("express");
const Team = require("../models/Team")
const Tornaments = require("../models/Tornament")
const Sport = require('../models/Sport')
const TournamentBracket = require("../models/TournamentBracket");
const Router = express.Router()
const sequelize = require("../database/index")
const returnTeamInfoObject = require('../scripts/getTeamInfoObject');
const tournamentInfoObject = require('../scripts/tournamentInfoObject')

Team.init(sequelize)
Tornaments.init(sequelize)
Sport.init(sequelize)
TournamentBracket.init(sequelize)

Router.get('/', async(req, res) => {
    if (req.session.logged){
      const tornaments = await Tornaments.findAll()
      res.render('index', {tornaments})
    }
    else{
      res.redirect('/login')
    }
  });
  
Router.get('/login', (req, res) => {
    res.render('login', {message:false})
});

Router.get('/criar-usuario', (req, res) => {
  res.render('create-account', {message:false})
});

Router.get('/recuperar-senha', (req, res) => {
  res.render("reset-password")
});

Router.get('/times', async (req, res) => {
    // if (req.session.logged){
        const {teams, Infos} = await returnTeamInfoObject()
        res.render("teams", {teams: teams, teamsInfo: Infos})
    // }
    // else{
        // res.redirect('/login')
});

Router.get('/criar-time', async(req, res) => {
  if (req.session.logged){
    const sports = await Sport.findAll()
    res.render("create-team", {sports})
  }
  else{
    res.redirect('/login')
  }
});

Router.get('/criar-torneio', (req, res) => {
  if (req.session.logged){
    res.render("create-tornament")
  }
  else{
    res.redirect('/login')
  }
});

Router.get('/perfil', (req, res) => {
  if (req.session.logged){
    const user = req.session.user
    res.render("profile", {user})
  }
  else{
    res.redirect('/login')
  }
});

Router.get('/torneio', async(req, res) => {
  // if (req.session.logged){
  const tournamentInfoObject = await tournamentInfoObject(req.query.tournamentID)
  res.send(Data)
  // }
  // else{
  //   res.redirect('/login')
  // }
});
module.exports = Router;