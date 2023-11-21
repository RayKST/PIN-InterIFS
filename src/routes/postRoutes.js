import express from "express";
import Team from "../models/Team.js";
import User from "../models/User.js";
import Tornament from "../models/Tornament.js";
import TeamSports from "../models/TeamSport.js";
import TournamentBracket from "../models/TournamentBracket.js"
const Router = express.Router();
import {sequelize} from "../database/index.js";


Team.init(sequelize)
User.init(sequelize)
Tornament.init(sequelize)
TeamSports.init(sequelize)
TournamentBracket.init(sequelize)


Router.post('/', async(req, res) => {
    const tournamentBracket = await TournamentBracket.create({
        tournamentID: req.body.tournamentID,
        teamID: req.session.user.teamID, // to the controll to refresh the session
    });
    if (!tournamentBracket){
        return console.log("Não foi possível ingressar ao torneio");
    }else{
        // console.log(await TournamentBracket.findAll());
        console.log("Seu time ingressou ao torneio");
        return res.redirect("/");
    }
})

Router.post('/login', async(req, res) =>{
    const user = await User.findOne({
        where:{
            login: req.body.username,
            password: req.body.password
        }
    })
    if (!user){
        res.render('login', {message: 'Credenciais incorretas.'});
        console.log("Usuário incorreto.");
    }
    else{
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
        res.render('create-account', {message: 'Credenciais inválidas.'});
        return console.log("Credenciais inválidas.");
    }
    res.redirect('/login')
    console.log("Usuário criado: ", user.dataValues)
    }
)

Router.post('/criar-torneio', async(req, res) => {
    const tornament = await Tornament.create({
        name: req.body.name,
        description: req.body.description,
        numberOfTeams: req.body.teams,
        teamsTornament: req.body.teamsTornament == 'on' ? "1" : "0",
        startTornament: req.body.beginTornament,
        endTornament: req.body.endTornament
    })
    if(!tornament) {
        res.send("Credenciais inválidas")
        return console.log("Credenciais inválidas"); 
    }
    res.redirect('/')
    console.log("Torneio criado: ", tornament.dataValues)
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
    const user = await User.update({teamID: req.body.teamID}, {where:{
        id: req.session.user.id
    }});
    
    if (!user){
        return console.log("Não foi possível ingressar ao time");
    }else{
        console.log("Usuário ingressou ao time");
        return res.redirect("/times")
    }
})

Router.post('/criar-time', async(req, res) => {
    console.log(req.body)
    const team = await Team.create({
        name: req.body.name, 
        description: req.body.description, 
        numberOfMembers: req.body.members,
        creatorID: req.session.user.id,
    });
    if(!team) {
        res.send("Credenciais inválidas")
        return console.log("Credenciais inválidas"); 
    }
    
    const teamCreate = await TeamSports.create({
        sportID: req.body.selectedSport,
        teamID: team.dataValues.id
    });
    if(!teamCreate) {
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

export default Router;