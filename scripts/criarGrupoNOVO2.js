"use strict";

window.addEventListener("load", principal);


// Variávies globais
let arrayContactos = JSON.parse(localStorage.getItem("lista_contactos"));
let conversasQueExistem = JSON.parse(localStorage.getItem("lista_conversas_que_existem"));
let arrayGrupos = JSON.parse(localStorage.getItem("lista_grupos"));
let arr_participantes_atuais = [];
let maximoAdicionar = arrayGrupos.length;
let lista_contactos_checked = [];
let lista_emails = [];
let imgMail;

let inputValNome = "";

let retirar = false;

let verificador = 0;

// Constantes
const CAIXA_CONTACTOS = "caixa_contactos";
const BTN_ENVIO = "btnEnvio";


function verificaDados(){

    obtemValorInput();

    if((arr_participantes_atuais.length >= 1) && (inputValNome != "")){

        document.getElementById("enviar").disabled = false;
        document.getElementById("enviar").style.backgroundColor = "#08b86d";
        document.getElementById("enviar").style.color = "white";

    }else{

        document.getElementById("enviar").disabled = true;
        document.getElementById("enviar").style.backgroundColor = "#eeeeee";
        document.getElementById("enviar").style.color = "black";

    }

}


// Função principal carregada onload
function principal (){

    //Mete o texto pronto a escrever quando abre 
    $( "#nomeGrupo" ).focus();

    foto()
    adicionaDiv();
    fechaPopUp("Eliminar");
    fechaPopUp("Criar");

    document.getElementById("enviar").disabled = true;
    document.getElementById("enviar").style.backgroundColor = "#eeeeee";
    document.getElementById("enviar").style.color = "black";

    setInterval(verificaDados , 300)
    document.getElementById("btnEnvio").disabled = true;
    document.getElementById("btnEnvio").style.backgroundColor = "#b6b6b6";

    document.getElementById("ok2").disabled = true;
    document.getElementById("ok2").style.backgroundColor = "#b6b6b6";
    document.getElementById("ok2").style.color = "black";


    setInterval(verificaInput, 300);

    // Não está a dar
    // Envia mensagem com o enter
    document.querySelector('#btnEnvio').addEventListener('keypress', function (e) {
        if (verificador == 1){
            if (e.key === 'Enter') {
                event.preventDefault();
                atualizaArray();   
            }
        }else{
            if (e.key === 'Enter') {
                event.preventDefault();
            }
        }
    });
    
}



function adicionaDiv(){

    let caixa = document.getElementById(CAIXA_CONTACTOS);

    for (let i = 0; i < arrayContactos.length; i++){

        caixa.innerHTML +=
            " <div id='contacto'> <li id= 'avatar'><img src='img/" + arrayContactos[i][0] + "' class='avatar'></li>" + 
                                  '<li id = "nome">' + arrayContactos[i][1] + '</li>' + '<li id="ic3"><input type="checkbox" id = "c' + String(i) +'" class="check" name = "checkbox" onclick = "atualizaArray();" value = ' + arrayContactos[i][2] + '></li>';                                     
    
    }

}

// Função que obtém os contactos selecionados
function obtemCheckBox(){

    let caixa = document.getElementsByName('checkbox');

    lista_contactos_checked = [];

    for (let i = 0; i < caixa.length; i++){

        if(caixa[i].checked){
            lista_contactos_checked.unshift([procuraNosContactos(caixa[i].value), procuraNosContactos_paraValue(caixa[i].value)]);
            // console.log(lista_contactos_checked);
        }
    }
}

// Funçao que obtém o email escrito 
function obtemEmail(){

    
    let inputValContacto = document.getElementById("email").value;

    document.getElementById("email").value = '';

    $("#mensagem_erro1").css({display: "none"});
    $("#mensagem_erro2").css({display: "none"});
    $("#mensagem_erro3").css({display: "none"});

    if (inputValContacto == ''){
        lista_emails = lista_emails;
        console.log("Tem de introduzir um e-mail") // POR NO CASO DE CLICAR SEM NADA ESCRITO 
    }else{

        if (validacaoEmail(inputValContacto) === false){
            if(inputValContacto.includes('@') == false && inputValContacto.includes('.com') == false){
                $("#mensagem_erro1").show("slow");
            } else if (inputValContacto.includes('.com') == false){
                $("#mensagem_erro3").show("slow");
            }else{
                $("#mensagem_erro2").show("slow");
            }

        }else{
            lista_emails.unshift([imgMail, inputValContacto]);

        }
    }
}

// Função que atualiza os arrays
function atualizaArray(){


    if (retirar === false){
        obtemCheckBox();
        obtemEmail()
    
        arr_participantes_atuais = (lista_contactos_checked.concat(lista_emails));
    }
    
    arr_participantes_atuais = arr_participantes_atuais.sort(function(a,b){  // VER SE ISTO DÁ PARA ORGANIZAR MELHOR
        // console.log(a[1],b[1], a[1]>b[1]);

        return a[1].toLowerCase() > b[1].toLowerCase() ? 1 : -1;
     });
    // console.log(arr_participantes_atuais);

    let sitio_adicionar = document.getElementById("adicionados");
    sitio_adicionar.innerHTML = "";
    let tema = localStorage.getItem("tema"); 

    for (let i = 0; i < arr_participantes_atuais.length; i++){

        if (tema == 'claro'){
            sitio_adicionar.innerHTML += ' <div id="contacto"> <li id= "avatar"><img src="img/' + arr_participantes_atuais[i][0]  + '" class="avatar"></li>' + 
            '<li id = "nome">' + arr_participantes_atuais[i][1] + '</li> <li id ="retirar"> <img class="fechar" src = "img/cross-small.png" onclick="retiraContacto(' + String(i)+');"> </li></div>'  ;
        }else{
            sitio_adicionar.innerHTML += ' <div id="contacto"> <li id= "avatar"><img src="img/' + arr_participantes_atuais[i][0]  + '" class="avatar"></li>' + 
            '<li id = "nome">' + arr_participantes_atuais[i][1] + '</li> <li id ="retirar"> <img class="fechar" src = "img/cross-smallbra.png" onclick="retiraContacto(' + String(i)+');"> </li></div>'  ;
        
        }
    }

    retirar = false;
    // localStorage.setItem("participantesAtuais", JSON.stringify(arr_participantes_atuais));
    // localStorage.setItem("nomeNovaConversa", obtemValorInput());

}

// Função que atualiza o que está na localStorage

function enviaLS(){
    // console.log(trocaImagem());
    let img = trocaImagem();
    let nome = obtemValorInput();

    let conversaAdicionar = [img, nome, arr_participantes_atuais, [], ""];
    conversasQueExistem.unshift(conversaAdicionar);

    localStorage.setItem("lista_conversas_que_existem", JSON.stringify(conversasQueExistem));
    localStorage.setItem("conversa_abre", nome);

}

// Função que obtem o nome do novo grupo
function obtemValorInput(){

    // Seleciona o elemento de input e regista o seu valor 
    inputValNome = document.getElementById("nomeGrupo").value;
    // localStorage.setItem("nomeNovaConversa", inputValNome);

    // arrayGrupos.unshift(["personal.png" ,inputValNome]);
    arrayGrupos = semRepetidos(arrayGrupos, inputValNome);
    localStorage.setItem("lista_grupos", JSON.stringify(retiraVazio(arrayGrupos)));
    // localStorage.setItem("nomeNovaConversa",inputValNome);

    return inputValNome

}

// functio para redirecionar para a pagina principal das conversas METER NO EVENT LISTENER

function atualizaPagina(){

    location.href = "conversaBase.html";

}


// Auxiliares

function retiraVazio(lista){
    let resultado = [];

    for (let i=0; i < lista.length; i++){
        if (lista[i][1] !== ""){
            resultado.unshift(lista[i]);
        }
    }

    return resultado
}

function semRepetidos(lista, novoElem){
    let listaNomes = []
    // console.log(lista.length);
    // console.log(maximoAdicionar);
    for (let i = 0; i<lista.length; i++){
        listaNomes.unshift(lista[i][1]);
    }

    if(listaNomes.indexOf(novoElem) === -1){
        lista.unshift([trocaImagem(), novoElem]);
    }

    if (lista.length > maximoAdicionar + 1){
        lista.splice(1,1);
    }

    return lista

}

function validacaoEmail(email){
    let regex = /\S+@\S+\.\S+/;
    return regex.test(email);

}

function procuraNosContactos_paraValue(v){
    for(let i= 0; i < arrayContactos.length; i++){
        if(arrayContactos[i].indexOf(v) != -1){
            return arrayContactos[i][1]
        }
    }
}

function procuraNosContactos(nome){
    for(let i= 0; i < arrayContactos.length; i++){
        if(arrayContactos[i].indexOf(nome) != -1){
            return arrayContactos[i][0]
        }
    }

}





// PopUp ///////////////////////////////////////////////////////////////////////////////////////////
function abrePopUp(nome){
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.display = "grid"); 
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.visibility = "visible"); 

    if (nome === "Imagem"){
        console.log("entrou")
        document.getElementById("ok").disabled = true;
        document.getElementById("ok").style.backgroundColor = "#eeeeee";
        document.getElementById("ok").style.color = "black";
    }
}

function fechaPopUp(nome){
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.display = "none"); 
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.visibility = "hidden"); 
}

////////////////////////////////////////////////////////////////////////////////////////////////////
let imgSelecionada;
let selecionado = 0;
let escolhida = 0;

// Retirar depois
function selecionaImagem(nome){
    // console.log(selecionado)
    // // document.getElementById("imgSelect").style.backgroundColor = "grey"; 
    // selecionado = 1
    // if (selecionado == 1){
    //     document.getElementsByClassName(nome)[0].classList.toggle("imgSelect");
    //     imgSelecionada = document.getElementsByClassName(nome)[0].getAttribute('src');
    // }

    // console.log(escolhida)
    if (escolhida != 1){
        $("#imgSelecta").removeClass("imgSelect");
        $("#imgSelectb").removeClass("imgSelect");
        $("#imgSelectc").removeClass("imgSelect");
        $("#imgSelectd").removeClass("imgSelect");
        $("#imgSelecte").removeClass("imgSelect");
        $("#imgSelectf").removeClass("imgSelect");
        $("#imgSelectg").removeClass("imgSelect");
        $("#imgSelecth").removeClass("imgSelect");
        $("#imgSelecti").removeClass("imgSelect");

        $("#imgSelect"+nome).toggleClass("imgSelect");
        imgSelecionada = document.getElementById("imgSelect"+nome).getAttribute('src');
        console.log(document.getElementById("imgSelect"+nome).getAttribute('src'))
        escolhida = 1


    }else if (escolhida == 1){

        escolhida = 0;

        $("#imgSelecta").removeClass("imgSelect");
        $("#imgSelectb").removeClass("imgSelect");
        $("#imgSelectc").removeClass("imgSelect");
        $("#imgSelectd").removeClass("imgSelect");
        $("#imgSelecte").removeClass("imgSelect");
        $("#imgSelectf").removeClass("imgSelect");
        $("#imgSelectg").removeClass("imgSelect");
        $("#imgSelecth").removeClass("imgSelect");
        $("#imgSelecti").removeClass("imgSelect");

        $("#imgSelect"+nome).toggleClass("imgSelect");
        imgSelecionada = document.getElementById("imgSelect"+nome).getAttribute('src');
        console.log(document.getElementById("imgSelect"+nome).getAttribute('src'))
        
    }
   
    document.getElementById("ok2").disabled = false;
    document.getElementById("ok2").style.backgroundColor = "#378BA0";
    document.getElementById("ok2").style.color = "white";

}

function trocaImagem(){
    selecionado = 1
    if (imgSelecionada == undefined){
        imgSelecionada = "img/" + imgMail;
    }
    document.getElementById("iconGrupo").src = imgSelecionada;
    return imgSelecionada.slice(4);
}


function retiraContacto(indice){
   
    let retiraCheckBox;

    console.log(indice, arr_participantes_atuais[indice]);

    for (let i = 0; i <lista_emails.length ; i++){
        if (arr_participantes_atuais[indice][1] == lista_emails[i][1]){
            lista_emails.splice(i, 1);
        }
    }

    for (let i = 0; i < lista_contactos_checked.length ; i++){
        if (arr_participantes_atuais[indice][1] == lista_contactos_checked[i][1]){
            lista_contactos_checked.splice(i, 1);
            console.log("entrou");
        }
    }

    console.log(lista_contactos_checked)

    for (let i = 0; i < arrayContactos.length; i++){
        let compara = document.getElementById("c" + String(i)).getAttribute("value");
        console.log(compara, transformaTexto(arr_participantes_atuais[indice][1]));
        if(compara == transformaTexto(arr_participantes_atuais[indice][1])){
            retiraCheckBox = i;
        }
    }
    console.log(retiraCheckBox);
    $("#c" + retiraCheckBox).prop('checked', false);

    arr_participantes_atuais.splice(indice, 1);
    retirar = true;
    atualizaArray();
}


function foto(){
    let tema = localStorage.getItem("tema"); 

    if(tema == 'claro'){
        imgMail =  "personal.png";
    }else { 
        imgMail =  "personalbra.png";
    }
}

function transformaTexto(string){

    let string_final = string.toLowerCase();
    string_final = string_final.replace(/\s/g, "_")
    return string_final;
}

function verificaInput(){

    let input = document.getElementById("email").value

    if(input.trim().length > 0){

        verificador = 1;
        document.getElementById("btnEnvio").disabled = false;
        document.getElementById("btnEnvio").style.backgroundColor = "#378BA0";
        document.getElementById(BTN_ENVIO).style.visibility = 'visible';
        $( "#clip" ).removeClass( "clipMove" );
    }else{

        verificador = 0;
        document.getElementById("btnEnvio").disabled = true;
        // document.getElementById("btnEnvio").style.backgroundColor = "#b6b6b6";
        document.getElementById(BTN_ENVIO).style.visibility = 'hidden';
        $( "#clip" ).addClass( "clipMove" );
    }

}

function desativaBotaoImagem(){

    document.getElementById("ok2").disabled = true;
    document.getElementById("ok2").style.backgroundColor = "#b6b6b6";
    document.getElementById("ok2").style.color = "black";
}


function textoPop(){
    $('#nomeDoGrupo').text(' "'+inputValNome+'" ');
}

function cancelaImagem(){
    let tema = localStorage.getItem("tema"); 

    if(tema == 'claro'){
        imgSelecionada = "personal.png";
    }else { 
        imgSelecionada =  "personalbra.png";
    }

    selecionado = 0;
    
}