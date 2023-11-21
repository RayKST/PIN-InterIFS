import express from "express";
import Team from "../models/Team.js"
import Tornaments from "../models/Tornament.js"
import Sport from '../models/Sport.js'
import TournamentBracket from "../models/TournamentBracket.js";
const Router = express.Router()
import {sequelize} from "../database/index.js"
import returnTeamInfoObject from '../scripts/getTeamInfoObject.js';
import tournamentInfoObject from '../scripts/tournamentInfoObject.js'


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

  const matches = await tournamentInfoObject(req.query.tournamentID)
  res.render("tournament", {matches: matches})
  // }
  // else{
  //   res.redirect('/login')
  // }
});

Router.get('/torneio', async(req, res) => {
  // if (req.session.logged){

  const matches = await tournamentInfoObject(req.query.tournamentID)
  res.render("tournament", {matches: matches})
  // }
  // else{
  //   res.redirect('/login')
  // }
});

Router.get('/torneio-admin', async(req, res) => {
  // if (req.session.logged){

  // const matches = await tournamentInfoObject(req.query.tournamentID)

  res.render("tournament-admin")
});

Router.get('/GetTornaments',async(req, res) => {
  const tournamentArray = await Tornaments.findAll({
    attributes: ['name', ['startTornament', 'title'], 'start'],
    raw: true,
  })

  res.json({data: tournamentArray})
})

export default Router;