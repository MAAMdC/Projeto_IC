let userName;
let avatar;

"use strict";

// CONSTANTES = BOTÕES

const BOTAO_CONVERSAS = "btn_conversas";
const BOTAO_GRUPOS = "btn_grupos";
const BOTAO_LIXO = "btn_lixo";
const BOTAO_CONTACTOS = "btn_contactos";
const BOTAO_DEFINICOES = "btn_definicoes";
const BOTAO_MENU = "btn_menu";
const BOTAO_SAIR = "btn_sair";

const CONVERSAS = "conversaBase.html";
const GRUPOS = "grupos.html";
const LIXO = "lixo.html";
const CONTACTOS = "contactos.html";
const DEFINICOES = "definicoes.html";
const MENU = "index.html";
const SAIR = "paginaReset.html";

// function foto(){
//     if(tema == 'claro' && userSidebar[1] == 'personal.png'){
//         avatar = userSidebar[1];
//     }else if (tema != 'claro' && userSidebar[1] == 'personal.png'){ 
//         avatar = 'personalbra.png'
//     }else{
//         avatar = userSidebar[1];
//     }
// }

// Coloca o nome do user e o avatar de acordo com a info do local storage
window.addEventListener("load", function(){

    criaEventListeners();

    userSidebar = JSON.parse(localStorage.getItem("userSidebar"));
    // foto();
    // console.log(userName)
    userName = userSidebar[0];
    avatar = userSidebar[1];
    console.log(avatar)

    if (avatar == "personalbra.png" || avatar == "personal.png"){
        let tema = localStorage.getItem("tema");
        if (tema == "claro"){
            avatar = "personal.png"
        }else{
            avatar = "personalbra.png"
        }
    }
    
    document.getElementById("username").innerHTML = userName;
    document.getElementById("imagem_username").src="img/"+avatar;
});



function criaEventListeners(){

    document.getElementById(BOTAO_CONVERSAS).addEventListener("click", function(){window.location = CONVERSAS});
    document.getElementById(BOTAO_GRUPOS).addEventListener("click", function(){window.location = GRUPOS});
    document.getElementById(BOTAO_LIXO).addEventListener("click", function(){window.location = LIXO});
    document.getElementById(BOTAO_CONTACTOS).addEventListener("click", function(){window.location = CONTACTOS});
    document.getElementById(BOTAO_DEFINICOES).addEventListener("click", function(){window.location = DEFINICOES});
    document.getElementById(BOTAO_MENU).addEventListener("click", function(){window.location = MENU});
    // document.getElementById(BOTAO_SAIR).addEventListener("click", function(){window.location = SAIR});
    document.getElementById(BOTAO_SAIR).addEventListener("click", function(){abrePopUp('Sair')})

    document.getElementById("username").addEventListener("click", function(){location.href = "perfil.html"})
    document.getElementById("imagem_username").addEventListener("click", function(){location.href = "perfil.html"})


}


function foca(){
    document.getElementById("corpo").style.webkitFilter = "none";
    // filter: blur(8px);
    // -webkit-filter: blur(8px);
}

function desfoca(){
    document.getElementById("corpo").style.webkitFilter = "blur(3px)";
    // filter: blur(8px);
    // -webkit-filter: blur(8px);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// PopUp ///////////////////////////////////////////////////////////////////////////////////////////
function abrePopUp(nome){
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.display = "grid"); 
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.visibility = "visible"); 
}

function fechaPopUp(nome){
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.display = "none"); 
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.visibility = "hidden"); 
}
