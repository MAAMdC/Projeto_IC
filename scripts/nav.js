"use strict";

window.addEventListener("load", principal);


let userSidebar = JSON.parse(localStorage.getItem("userSidebar"));

// CONSTANTES

// Botões 

const BTN_CONVERSAS = "ic1";
const BTN_GRUPOS = "ic2";
const BTN_LIXO = "ic3";
const BTN_CONTACTOS = "ic4";
const BTN_AJUDA = "ic5";
const BTN_PERFIL = "ic6";
const BTN_DEFINICOES = "ic7";
const BTN_SAIR = "ic8";

// Páginas

const CONVERSAS = "conversaBase.html";
const GRUPOS = "grupos.html";
const LIXO = "lixo.html";
const CONTACTOS = "contactos.html";
const AJUDA = "ajuda.html";
const PERFIL = "perfil.html";
const DEFINICOES = "definicoes.html";

let avatar; 


/** Função que chama a função que cria os eventos para os botões da barra de navegação */
function principal(){ 
   
   criaEventListeners(); 

   avatar = userSidebar[1];

   if (avatar == "personalbra.png" || avatar == "personal.png"){
      let tema = localStorage.getItem("tema");
      if (tema == "claro"){
          avatar = "personal.png"
      }else{
          avatar = "personalbra.png"
      }
  }

   document.getElementById("imagem_username").src="img/"+avatar;

}


/** Função que cria os eventos para os botões */
 function criaEventListeners(){

    document.getElementById(BTN_CONVERSAS).addEventListener("click", function(){window.location = CONVERSAS});  
    document.getElementById(BTN_GRUPOS).addEventListener("click", function(){window.location = GRUPOS});
    document.getElementById(BTN_CONTACTOS).addEventListener("click", function(){window.location = LIXO});
    document.getElementById(BTN_LIXO).addEventListener("click", function(){window.location = CONTACTOS});
    document.getElementById(BTN_AJUDA).addEventListener("click", function(){window.location = AJUDA});
    document.getElementById(BTN_PERFIL).addEventListener("click", function(){window.location = PERFIL});
    document.getElementById(BTN_DEFINICOES).addEventListener("click", function(){window.location = DEFINICOES});
    document.getElementById(BTN_SAIR).addEventListener("click", function(){abrePopUp('Sair');});
 }