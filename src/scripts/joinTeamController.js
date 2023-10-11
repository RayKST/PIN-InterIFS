// import User from '../models/User.js';
// import sequelize from '../database';
async function enterTeam (teamID, userID){
    // User.init(sequelize);
    // console.log(teamID)vou
    console.log(userID)
    console.log(teamID)
    // const user = await User.update({teamID: teamID}, {where:{
    //     id: userID // req.session.user.id
    // }});
    // if (user){
    //     console.log('Usuário atualizado');
    // } else{
    //     console.log("Erro ao alterar usuário")
    // }
};
const arrayButtons = document.getElementsByClassName("times")[0].getElementsByTagName("button")
for (var i = 0; i + 1 <= arrayButtons.length; i++){
    arrayButtons[i].addEventListener("click", enterTeam(arrayButtons[i].value, 2));
}

    document.addEventListener('DOMContentLoaded', function () {
    // Lógica do controlador
    console.log('Controlador JavaScript está funcionando!');
});