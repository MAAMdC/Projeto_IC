"use strict";

window.addEventListener("load", principal);

/** Função que chama a função que cria os eventos para os botões da barra de navegação */
function principal(){ criaEventListeners(); }

const PARTILHA_ECRA = "partilha_ecra";
const FECHA_PARTILHA = "fechar";
const SELECAO_OPC1 = "opcao1";
const SELECAO_OPC2 = "opcao2";
const SELECAO_OPC3 = "opcao3";
const POPUP = "popup";




/** Função que cria os eventos para os botões */
function criaEventListeners(){

    document.getElementById(PARTILHA_ECRA).addEventListener("click", function(){abrePopUp()});  
    document.getElementById(FECHA_PARTILHA).addEventListener("click", function(){fechaPopUp()})

    document.getElementById(SELECAO_OPC1).addEventListener("click", function(){registaClick("botao1")});  
    document.getElementById(SELECAO_OPC2).addEventListener("click", function(){registaClick("botao2")});  
    document.getElementById(SELECAO_OPC3).addEventListener("click", function(){registaClick("botao3")});  

}

function abrePopUp(){

    document.getElementById(POPUP).style.display = "block";

}

function fechaPopUp(){

    document.getElementById(POPUP).style.display = "none";    

}


function registaClick(botao_clicado){


    if (botao_clicado == "botao1"){
        console.log("botao 1")
    }else if (botao_clicado == "botao2"){
        console.log("botao 2")
    }else{
        console.log("botao 3")
    }


}
