"use strict";
let paginaAnterior = localStorage.setItem("paginaAnterior","conversaBase.html")
window.addEventListener("load" , principal);

let todas_converas = JSON.parse(localStorage.getItem("lista_conversas_que_existem"));
let arrayGruposApagados = JSON.parse(localStorage.getItem("lista_grupos_apagados"));
let arrayGrupos = JSON.parse(localStorage.getItem("lista_grupos"));

window.onbeforeunload = function(){localStorage.setItem("lista_conversas_que_existem", JSON.stringify(todas_converas))};
// VARIAVEIS GLOBAIS
let pagina = "";

// DECLARAÇÃO DE CONSTANTES
const MENSAGENS_LATERAIS = ".mensagens";
const NOME_PAGINA = "nomePagina";
const AREA_MENSAGENS = ".areaMensagens";
const AREA_PARTICIPANTES = ".areaParticipantes";
const BTN_ENVIO = "btnEnvio";
const MENSAGENS_LATERAIS_2 = "caixaMensagem";
const BTN_FICHEIRO = "btn2";

let nAtivo = 0;

let verificador = 0;

var k = 0;

function principal(){

    // Mete o texto pronto a escrever quando abre 
    $( "#inputMensagem" ).focus();

    // Diz que a primeira conversa selecionada é o lol-123
    localStorage.setItem("conversaSelecionada", "lol-123")  // está a ser usado?

    let atual = localStorage.getItem("Chamada");
    if (atual != "Ativa"){
        localStorage.setItem("guia_ficheiro", "Conversas");
    }

    pagina = localStorage.getItem("conversa_abre");
    carregamento(pagina);
    carregamentoConversasLateral();

    document.getElementById(BTN_ENVIO).addEventListener("click", function(){atualizaArrayLS();
                                                                            poeNoTopo(pagina);
                                                                            carregamentoConversasLateral();
                                                                            carregamento()});
    
    // Envia mensagem com o enter
    document.querySelector('#inputMensagem').addEventListener('keypress', function (e) {
        if (verificador == 1){
            if (e.key === 'Enter') {
                event.preventDefault();
                atualizaArrayLS();
                poeNoTopo(pagina);
                carregamentoConversasLateral();
                carregamento();
            }
        }else{
            if (e.key === 'Enter') {
                event.preventDefault();
            }
        }
    });

    document.getElementById(BTN_FICHEIRO) .addEventListener("click" , function(){enviaConversaParaFicheiro();});

    // if (event.keyCode === 13 ){
    //     console.log("deu")
    // }

    document.getElementById(BTN_ENVIO).disabled = true;
    document.getElementById(BTN_ENVIO).style.visibility = 'hidden';

    setInterval(verificaInput, 300);
}

// CARREGAMENTO DE COISAS NA PAGINA

function carregamento(){
    
    //limpar os campos para quando é recarregado
    document.getElementById(NOME_PAGINA).innerHTML = "";
    document.querySelector(AREA_MENSAGENS).innerHTML = "";
    document.querySelector(AREA_PARTICIPANTES).innerHTML = "";

    let infosConversa = infosConversaAtual(pagina);

    let nome = infosConversa[1];
    let participantes = infosConversa[2];
    let conversas = infosConversa[3];

    document.getElementById(NOME_PAGINA).innerHTML = nome;
        // Guarda o nome da conversa selecionada
        localStorage.setItem("conversaSelecionada", nome)

    for (let i = 0; i < conversas.length; i++){
        document.querySelector(AREA_MENSAGENS).innerHTML += conversas[i];
    }

    let tema = localStorage.getItem("tema");

    for (let i = 0; i < participantes.length; i++){

        if (tema == 'claro'){
            document.querySelector(AREA_PARTICIPANTES).innerHTML += '<div id="saiLista'+i+'"> <div id="contacto"> <li id= "avatar"><img src="img/'  + participantes[i][0] + '" class="avatar"></li>' + 
            '<li id = "nome">' + participantes[i][1] + '</li><li id ="retirar"> <img onclick="escondePart('+ i +')" class="fechar" src = "img/cross-small.png"> </li></div><div>';
        }else{
            document.querySelector(AREA_PARTICIPANTES).innerHTML += ' <div id="contacto"> <li id= "avatar"><img src="img/'  + participantes[i][0] + '" class="avatar"></li>' + 
            '<li id = "nome">' + participantes[i][1] + '</li><li id ="retirar"> <img onclick="escondePart()" class="fechar" src = "img/cross-smallbra.png"> </li></div>';
        }
    }

    $( "#inputMensagem" ).focus();

    //limpa a linha de input
    document.getElementById("inputMensagem").value = "";

    // ver a conversa o mais embaixo 
    let msg = document.getElementById('areaMensagens');
    msg.scrollTop = msg.scrollHeight;
}

function escondePart(num){
    // só esconde mas no vídeo continuam lá e no refresh tb
    $('#saiLista'+num).css('visibility', 'hidden');
}


// RECOLHE TODAS AS INFORMAÇÕES SOBRE A PAGINA ATUAL 
function infosConversaAtual(){

    for (let i = 0; i < todas_converas.length; i++){

        if (todas_converas[i][1] === pagina){
            return todas_converas[i];
        }

    }

}
// onclick="abrePopUp('Sair');"
// POE TUDO DE LADO
function carregamentoConversasLateral(){

    let arrayAdicionar = []

    // acrescentei um -1 para tirar a última que é fake
    // for (let i = 0; i < todas_converas.length-1; i++){
    //     if(i == 0){
    //         arrayAdicionar.push(
    //             // "<div class='caixaMensagem msg" + String(i+1) + "' onclick = 'substituiConversa(" + String(todas_converas[i][1]) + ");'> <div class='info'> <div class='texto'> <h3 classe='nome'>" + todas_converas[i][1] +"</h3> <p classe='ultimaMsg'>" + todas_converas[i][4] + "</p></div><div class='icone'><img src='img/" + todas_converas[i][0] + "'></div></div></div>"
    //             "<div class='caixaMensagem msg" + String(i+1) +" selected' value = '" + transformaTexto(todas_converas[i][1]) +"'> <div class='info'> <div class='texto'> <h3 classe='nome'>" + todas_converas[i][1] +"</h3> <p classe='ultimaMsg'>" + todas_converas[i][4] + "</p></div><div class='icone'><img src='img/" + todas_converas[i][0] + "'></div></div></div>"
    //             );
    //     }else{
    //         arrayAdicionar.push(
    //         // "<div class='caixaMensagem msg" + String(i+1) + "' onclick = 'substituiConversa(" + String(todas_converas[i][1]) + ");'> <div class='info'> <div class='texto'> <h3 classe='nome'>" + todas_converas[i][1] +"</h3> <p classe='ultimaMsg'>" + todas_converas[i][4] + "</p></div><div class='icone'><img src='img/" + todas_converas[i][0] + "'></div></div></div>"
    //             "<div class='caixaMensagem msg" + String(i+1) +"' value = '" + transformaTexto(todas_converas[i][1]) +"'> <div class='info'> <div class='texto'> <h3 classe='nome'>" + todas_converas[i][1] +"</h3> <p classe='ultimaMsg'>" + todas_converas[i][4] + "</p></div><div class='icone'><img src='img/" + todas_converas[i][0] + "'></div></div></div>"
    //         );
    //     }
    // }

    // Diz que indice procurar 
    // var k = 0;
    var array = todas_converas;
    
    var needle = localStorage.getItem("conversaSelecionada");
    console.log( localStorage.getItem("conversaSelecionada"))
    var result = getIndexOfK(array, needle);

    // Mete o selected na certa
    for (let i = 0; i < todas_converas.length-1; i++){
            if(i == result[0]){
                arrayAdicionar.push(
                    // "<div class='caixaMensagem msg" + String(i+1) + "' onclick = 'substituiConversa(" + String(todas_converas[i][1]) + ");'> <div class='info'> <div class='texto'> <h3 classe='nome'>" + todas_converas[i][1] +"</h3> <p classe='ultimaMsg'>" + todas_converas[i][4] + "</p></div><div class='icone'><img src='img/" + todas_converas[i][0] + "'></div></div></div>"
                    "<div class='caixaMensagem msg" + String(i+1) +" selected' value = '" + transformaTexto(todas_converas[i][1]) +"'> <div class='info'> <div class='texto'> <h3 classe='nome'>" + todas_converas[i][1] +"</h3> <p classe='ultimaMsg'>" + todas_converas[i][4] + "</p></div><div class='icone'><img src='img/" + todas_converas[i][0] + "'></div></div></div>"
                    );
            }else{
                arrayAdicionar.push(
                // "<div class='caixaMensagem msg" + String(i+1) + "' onclick = 'substituiConversa(" + String(todas_converas[i][1]) + ");'> <div class='info'> <div class='texto'> <h3 classe='nome'>" + todas_converas[i][1] +"</h3> <p classe='ultimaMsg'>" + todas_converas[i][4] + "</p></div><div class='icone'><img src='img/" + todas_converas[i][0] + "'></div></div></div>"
                    "<div class='caixaMensagem msg" + String(i+1) +"' value = '" + transformaTexto(todas_converas[i][1]) +"'> <div class='info'> <div class='texto'> <h3 classe='nome'>" + todas_converas[i][1] +"</h3> <p classe='ultimaMsg'>" + todas_converas[i][4] + "</p></div><div class='icone'><img src='img/" + todas_converas[i][0] + "'></div></div></div>"
                );
            }
        }
    // console.log(arrayAdicionar);
    document.querySelector(MENSAGENS_LATERAIS).innerHTML = "";
    for (let i = 0; i < arrayAdicionar.length; i++) {

        document.querySelector(MENSAGENS_LATERAIS).innerHTML += arrayAdicionar[i];
        // $(".mensagens").append(arrayAdicionar[i]);
    }

    let msg_lateral = document.getElementsByClassName(MENSAGENS_LATERAIS_2);
    // console.log(msg_lateral);
    for (let i = 0; i < msg_lateral.length; i++){
        // console.log(msg_lateral[i]);
        let valor = msg_lateral[i].getAttribute("value");
        // console.log(valor);
        msg_lateral[i].addEventListener("click", function(){substituiConversa(valor);});
    }

}

// Encontra o índice da página nas conversas
function getIndexOfK(arr, k) {
    for (var i = 0; i < arr.length; i++) {
      var index = arr[i].indexOf(k);
      if (index > -1) {
        return [i, index];
      }
    }
  }
  

 
//   console.log('The value #' + needle + ' is located at array[' + result[0] + '][' + result[1] + '].');


// <div class='caixaMensagem msg1'> <div class='info'> <div class='texto'> <h3 classe='nome'>LOL-123</h3> <p classe='ultimaMsg'>Olá</p> </div><div class='icone'><img src='img/lol.png'></div></div></div>,

// OBTEM VALOR DO INPUT 

function obtemValorInput(){

    let inputVal = document.getElementById("inputMensagem").value;
    // console.log(inputVal);

    //limpa a linha de input
    document.getElementById("inputMensagem").value = "";

    // // Mete a o scroll onde está a mensagem 
    // let msg = document.getElementById('areaMensagens');
    // msg.scrollTop = msg.scrollHeight;

    return inputVal;
}

// Vê se o input está vazio
function validaInput(){
    if (obtemValorInput() == ''){
        console.log("O input está vazio");
    }
}


// ENVIA MENSAGEM
function enviaMensagem(){

    // console.log("na função enviaMensagem")
    // console.log(todas_converas);

    let dataAtual = new Date(); 
    let msg = obtemValorInput();
    let conteudo = "<div class='box darker'><h3>Eu</h3><p>"+ msg +
                        "</p><span class='time-left'>"+ dataAtual.getHours().toString() + ":"  + 
                        dataAtual.getMinutes().toString() + "h" + "</span></div>"


    
    document.querySelector(AREA_MENSAGENS).innerHTML += conteudo;
    atualizaUltimaConversa(msg);

    // poeNoTopo(pagina);
    // carregamentoConversasLateral();

    return conteudo;


}

// ATUALIZA O ARRAY DA PAGINA 
function atualizaArrayConversa(){

    // console.log("Na função atualizaArrayConversa");
    // console.log(todas_converas);

    let infosConversa = infosConversaAtual(pagina);
    let conversas = infosConversa[3];

    conversas.push(enviaMensagem());

    infosConversa[3] = conversas;

    return infosConversa;

}

// ATUALIZA O ARRAY DO LOCAL STORAGE
function atualizaArrayLS(){

    // console.log("na função atualizaArrayLS")
    // console.log(todas_converas);
    // console.log(pagina)

    // console.log(todas_converas[0][3]);
    for (let i = 0; i < todas_converas.length; i++){

        if (todas_converas[i][1] === pagina){
            todas_converas[i] = atualizaArrayConversa();
        }
    }
    // console.log(todas_converas[0][3]);
    localStorage.setItem("lista_conversas_que_existem", JSON.stringify(todas_converas));

}


// SUBSTITUIR A CONVERSA ATUAL


function substituiConversa(novaConversa){

    // console.log(todas_converas)

    for (let i = 0; i < todas_converas.length; i++){
        if (transformaTexto(todas_converas[i][1]) === novaConversa){
            pagina = todas_converas[i][1];
        }
    }
    // console.log(elemento);
    localStorage.setItem("conversa_abre", pagina);
    carregamento();
    // poeNoTopo(pagina);
    carregamentoConversasLateral();
}

function transformaTexto(string){

    let string_final = string.toLowerCase();
    string_final = string_final.replace(/\s/g, "_")
    return string_final;
}

// ATUALIZA A ULTIMA CONVERSA
// tentar melhorar
function atualizaUltimaConversa(msg){
    // console.log(msg)
    let infosConversa = infosConversaAtual(pagina);
    infosConversa[4] = msg;
    // console.log(infosConversa)

}

// Envia para a LS a conversa para qual vai ser adicionada o ficheiro
function enviaConversaParaFicheiro(){

    localStorage.setItem("conversaFicheiro", pagina);

}

// funcao auxiliar
function poeNoTopo(elemento){

    // console.log("ANTES DE SER POSTO NO TOPO");
    // console.log(todas_converas);

    let indice;
    for (let i = 0; i < todas_converas.length; i++){
        if (elemento === todas_converas[i][1]){
            indice = i;
        }
    }
    // console.log(indice);
    let vaiTopo = todas_converas[indice];
    // console.log("Antes do corte")
    // console.log(todas_converas)
    todas_converas.splice(indice, 1);
    // console.log("Depois do corte")
    // console.log(todas_converas)
    todas_converas.unshift(vaiTopo);
    // console.log("Antes da adição")
    // console.log(todas_converas)
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// DropDown /////////////////////////////////////////////////////////////////////////////////////////
function abreDropDown(){
    document.getElementsByClassName("dropdown-content")[0].style.display = "block";
}

function fechaDropDown(){
    document.getElementsByClassName("dropdown-content")[0].style.display = "none";
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

////////////////////////////////////////////////////////////////////////////////////////////////////
// TrocaParaVideo
function trocaParaVideo(){
    //Inicializa o chat 
    // localStorage.setItem("mensagensPagina_chamadaVideo","")
    localStorage.setItem("chamadaAtiva", localStorage.getItem("conversa_abre"));
    location.href='paginaEspera.html';
  
}

// Ver se pode ser comum
////////////////////////////////////////////////////////////////////////////////////////////////////
// Troca janela ////////////////////////////////////////////////////////////////////////////////////
// MELHORAR OS NOMES
function trocaJanela(){
    document.getElementById("areaMensagens").style.visibility = "hidden"; 
    document.getElementById("areaParticipantes").style.visibility = "visible";
    document.getElementById("envioMensagem").style.visibility = "hidden"; 
    document.getElementById("participantes").innerHTML = "Ver conversa";

    document.getElementById( "participantes" ).removeAttribute( "onclick", "javascript: trocaJanela();" );
    document.getElementById( "participantes" ).setAttribute( "onClick", "javascript: trocaJanelaDeVolta();" );
}

function trocaJanelaDeVolta(){
    document.getElementById("areaMensagens").style.visibility = "visible"; 
    document.getElementById("areaParticipantes").style.visibility = "hidden";
    document.getElementById("envioMensagem").style.visibility = "visible";
    document.getElementById("participantes").innerHTML = "Ver participantes";

    document.getElementById( "participantes" ).removeAttribute( "onClick", "javascript: trocaJanelaDeVolta();");
    document.getElementById( "participantes" ).setAttribute( "onclick", "javascript: trocaJanela();");
}
////////////////////////////////////////////////////////////////////////////////////////////////////

function eliminaConversa(){

    let indiceApagar;
    let conversaApagar = [];

    for (let i = 0; i < todas_converas.length; i++){
        if (todas_converas[i][1] == pagina){
            indiceApagar = i;
            conversaApagar = todas_converas[i];
        }
    }

    todas_converas.splice(indiceApagar, 1);
    localStorage.setItem("lista_conversas_que_existem", JSON.stringify(todas_converas));

    for (let i = 0; i < arrayGrupos.length ; i++){
        if (arrayGrupos[i][1] == pagina){
            arrayGrupos.splice(i, 1);
            localStorage.setItem("lista_grupos", JSON.stringify(arrayGrupos));
        }
    }

    arrayGruposApagados.unshift(conversaApagar);
    localStorage.setItem("lista_grupos_apagados", JSON.stringify(arrayGruposApagados));

    pagina = todas_converas[0][1];
    localStorage.setItem("conversa_abre", pagina);
    localStorage.setItem("conversaSelecionada", pagina);

    // carregamento();
    // carregamentoConversasLateral();
    location.href = "conversaBase.html";

}

let tempo = 5;

function decrementa(){
   if (tempo > 0){
        tempo--;
        console.log(tempo);
   }

   $('#seconds-counter').text(tempo + ' segundos');
}


function tempoEspera(param){
    let temporizador;

    if(param == 'comeca'){
        temporizador = setInterval(decrementa, 1000);

    }else if(param == 'cancela'){
        clearInterval(temporizador);
    }
    

    if(tempo==0){
        clearInterval(temporizador);
        location.href="chamadaVideoAuto.html";
    }
}

function verificaInput(){

        let input = document.getElementById("inputMensagem").value

    if(input.trim().length > 0){

        verificador = 1;
        document.getElementById(BTN_ENVIO).disabled = false;
        // document.getElementById(BTN_ENVIO).style.backgroundColor = "#378BA0";
        document.getElementById(BTN_ENVIO).style.visibility = 'visible';
        $( "#clip" ).removeClass( "clipMove" );
    }else{

        verificador = 0;
        document.getElementById(BTN_ENVIO).disabled = true;
        // document.getElementById(BTN_ENVIO).style.backgroundColor = "#b6b6b6";
        document.getElementById(BTN_ENVIO).style.visibility = 'hidden';
        $( "#clip" ).addClass( "clipMove" );
    }

}

function redireciona(){

    let atual = localStorage.getItem("Chamada");
    let chamadaAtiva = localStorage.getItem("chamadaAtiva");
    let conversaSelecionada = localStorage.getItem("conversaSelecionada");


    if (atual == "Ativa"){
        if (chamadaAtiva == conversaSelecionada){
            location.href='chamadaVideoAuto.html';
        }else{
            abrePopUp("DecorreChamada");
        }
    }else{
        location.href='paginaEspera.html';
    }
}