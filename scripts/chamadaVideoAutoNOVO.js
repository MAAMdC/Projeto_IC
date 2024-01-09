let nome = localStorage.getItem("conversaSelecionada");
let todas_conversas = JSON.parse(localStorage.getItem("lista_conversas_que_existem"));
let infosConversa = infosConversaAtual(nome);
const NOME_PAGINA = "nomeGrupo";
const BTN_ENVIO = "btnEnvio";
const AREA_MENSAGENS = ".areaMensagens";

let paginaAnterior = localStorage.setItem("paginaAnterior", "chamadaVideo.html")

let miniChat = [];

let verificador = 0;

let wasClicked = true;

window.onbeforeunload = function(){localStorage.setItem("miniChat", JSON.stringify(miniChat))};

let guia_ficheiro = localStorage.getItem("guia_ficheiro");
localStorage.setItem("Chamada", "Em chamada")

window.addEventListener("load" , principal);

function principal(){

    if (guia_ficheiro == "Conversas"){
        miniChat = [];
    }else{
        miniChat = JSON.parse(localStorage.getItem("miniChat"));
        if (miniChat == null){
            miniChat = [];
        }
        carregamentoMiniChat();
    }
    // console.log(miniChat);
    
    carregamento();

    document.getElementById("areaParticipantes").style.display = "none";

    localStorage.setItem("guia_ficheiro", "Chamada");

    document.getElementById(BTN_ENVIO).disabled = true;
    document.getElementById(BTN_ENVIO).style.backgroundColor = "#b6b6b6";

    document.querySelector('#inputMensagem').addEventListener('keypress', function (e) {
        if (verificador == 1){
            if (e.key === 'Enter') {
                event.preventDefault();
                atualizaMiniChat();
            }
        }else{
            if (e.key === 'Enter') {
                event.preventDefault();
            }
        }
    });


    setInterval(verificaInput, 300);

    // Mete a o scroll onde está a mensagem 
    let msg = document.getElementById('areaMensagens');
    msg.scrollTop = msg.scrollHeight;
}

function carregamento(){
    
    let participantes = infosConversa[2];
    let nParticipantes = participantes.length;

    if(nParticipantes == 1){
        document.getElementById("callWindow").classList.toggle("um");
    }else if (nParticipantes == 2){
        document.getElementById("callWindow").classList.toggle("dois");

    }else if (nParticipantes == 3){
        document.getElementById("callWindow").classList.toggle("tres");

    }else if (nParticipantes == 4){
        document.getElementById("callWindow").classList.toggle("quatro");
    }
    else{
        document.getElementById("callWindow").classList.toggle("mais");
    }
   
    
    // Mete o nome da conversa certa
    document.getElementById(NOME_PAGINA).innerHTML = nome.charAt(0).toUpperCase() + nome.substring(1);

    for (let i = 0; i < participantes.length; i++){
        document.querySelector('.areaParticipantes').innerHTML += ' <div id="contacto"> <li id= "avatar"><img src="img/'  + participantes[i][0] + '" class="avatar"></li>' + 
        '<li id = "nome">' + participantes[i][1] + '</li></div>';

        document.querySelector('.call').innerHTML += '<div class="frame"><h3 class="text ">' + participantes[i][1]  + '</h3><img class="callParticipant hide" src= "img/' + participantes[i][0] +'"alt="" ></div>'
    }
}

function mudaCorBotoesVideo(num){
    $('#bt'+num).toggleClass("btnColor");
    //document.getElementById("l"+num+"ico").src = "img/microphoneMute.png";
}


function obtemValorInput(){
    let inputVal = document.getElementById("inputMensagem").value;
    console.log(inputVal);
    document.getElementById("inputMensagem").value = "";

    return inputVal;

}

// ENVIA MENSAGEM
function enviaMensagem(){
    let dataAtual = new Date(); 
    let msg = obtemValorInput();
    let conteudo = "<div class='box darker'><h3>Eu</h3><p>"+ msg +
                    "</p><span class='time-left'>"+ dataAtual.getHours().toString() + ":"  + 
                    dataAtual.getMinutes().toString() + "h" + "</span></div>"


    
    document.querySelector(AREA_MENSAGENS).innerHTML += conteudo;

    return conteudo;
}


// RECOLHE TODAS AS INFORMAÇÕES SOBRE A PAGINA ATUAL 
function infosConversaAtual(nome){

    for (let i = 0; i < todas_conversas.length; i++){
        // console.log(nome)
        if (todas_conversas[i][1] === nome){
            // console.log(todas_conversas[i])
            return todas_conversas[i];
        }
    }
}


function atualizaMiniChat(){

    miniChat.unshift(enviaMensagem());
    
    // Mete a o scroll onde está a mensagem 
    let msg = document.getElementById('areaMensagens');
    msg.scrollTop = msg.scrollHeight;

}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Troca janela ////////////////////////////////////////////////////////////////////////////////////
// MELHORAR OS NOMES
function trocaJanela(){
    escolhido()
    document.getElementById("areaMensagens").style.display = "block";
    document.getElementById("areaParticipantes").style.display = "none";
    document.getElementById("envioMensagem").style.visibility = "visible"; //ver pq não dá
}

function trocaJanelaDeVolta(){
    escolhido()
    document.getElementById("areaMensagens").style.display = "none";
    document.getElementById("areaParticipantes").style.display = "grid";
    document.getElementById("envioMensagem").style.visibility = "hidden";
}
////////////////////////////////////////////////////////////////////////////////////////////////////
// Aplica a linha azul ao texto selecionado 
function escolhido(){
    $( ".areaAtual" ).toggleClass( "current" );
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// MiniChat ////////////////////////////////////////////////////////////////////////////////////////
function abreMiniChat() {
    document.getElementById("miniChat").style.width = "420px";
    document.getElementById("callWindow").style.marginLeft = "420px";

    // Mete o texto pronto a escrever quando abre 
    $( "#inputMensagem" ).focus();
}

function fechaMiniChat() {
    document.getElementById("miniChat").style.width = "0";
    document.getElementById("callWindow").style.marginLeft = "0";
    document.getElementById("myOpenBtn").style.display = "inline-block";
}
////////////////////////////////////////////////////////////////////////////////////////////////////
// Legendas ////////////////////////////////////////////////////////////////////////////////////////
function mostraLegenda(n) {
    var popup = document.getElementById("l"+n);
    popup.classList.add("show");
}

function escondeLegenda(n) {
    var popup = document.getElementById("l"+n);
    popup.classList.remove("show");
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Darkmode ////////////////////////////////////////////////////////////////////////////////////////

let lista;
let tema = localStorage.getItem("tema")
function image(botao) {

    if(botao == 1){
        if(tema == 'claro'){
            lista = ["img/volumeMute.png", "img/volume.png"];
        }else{
            lista = ["img/volumeMutebra.png", "img/volumebra.png"];
        }
        
    }else if(botao == 2){
        if(tema == 'claro'){
            lista = ["img/microphoneMute.png", "img/microphone.png"];
        }else{
            lista = ["img/microphoneMutebra.png", "img/microphonebra.png"];
        }
    }else if(botao == 3){
        if(tema == 'claro'){
            lista = ["img/camera-de-videoMute.png", "img/camera-de-video.png"];
        }else{
            lista = ["img/camera-de-videoMutebra.png", "img/camera-de-videobra.png"];
        }
    } 

    if (!wasClicked) {
        wasClicked = false;
        return;
    }

    if ($('#l'+botao+'ico').attr("src") == lista[0]) {
        $('#l'+botao+'ico').attr("src", lista[1]);
    } else {
        $('#l'+botao+'ico').attr("src", lista[0]);
    }
};


function verificaInput(){

    let input = document.getElementById("inputMensagem").value;

    if(input.trim().length > 0){

        verificador = 1;
        document.getElementById(BTN_ENVIO).disabled = false;
        document.getElementById(BTN_ENVIO).style.backgroundColor = "#378BA0";
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

function carregamentoMiniChat(){

    if (miniChat != []){
        for (let i = 0; i < miniChat.length; i++){
            document.querySelector(AREA_MENSAGENS).innerHTML += miniChat[i];
        }
    }
        
    abreMiniChat();

}


// Chamada em background
function desligaChamada() {
    mudaCorBotoesVideo(4);
    localStorage.removeItem("chamadaAtiva");
    location.href = 'conversaBase.html';
    localStorage.setItem("paginaAtual", "conversaBase");
    localStorage.removeItem("partilhaEcra");
    localStorage.setItem("Chamada", "Nao ativa");
}

function minimizaChamada() {
    localStorage.setItem("paginaAtual", "conversaBase");
    location.href = 'conversaBase.html';
    localStorage.setItem("Chamada", "Ativa");

}