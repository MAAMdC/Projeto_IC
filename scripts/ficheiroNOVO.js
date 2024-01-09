let selecionado1;
let selecionado2;
let selecionado3;
let selecionado4; 

let ficheiros_a_enviar = []
let dataAtual = new Date(); 

let miniChat = [];

let ficheiros = [["img/pdf.png", "ranking@13Set2021.pdf"],
                ["img/word.png", "PerguntasQuiz.docx"],
                ["img/pdf.png", "FolhaExercicios.pdf"],
                ["img/pdf.png", "Relatório.pdf"]]

let todas_converas = JSON.parse(localStorage.getItem("lista_conversas_que_existem"));
let conversa_a_alterar = localStorage.getItem("conversaFicheiro");
// console.log(conversa_a_alterar);

let info_ficheiros = localStorage.getItem("guia_ficheiro");


let conversas_miniChat = JSON.parse(localStorage.getItem("miniChat"))


$(document).ready(function(){
    // regista qual o ficheiro para dar append nas mensagens
    // função que regista o nome do ficheiro e a imagem selecionado e guarda num array de arrays na local storage (lembrando que quando se deseleciona o ficheiro ele sai o array)
    // EX: localStorage.setItem("ficheiroEnviado", [["img/pdf.png", "ranking@13Set2021.pdf"]]);
    selecionado1 = false;
    selecionado2 = false;
    selecionado3 = false;
    selecionado4 = false; 

    document.getElementById("enviar").style.backgroundColor = "lightgrey";  
    document.getElementById("enviar").style.color = "black";  
});

function escolhido(n){
    // Muda a cor 
    $( "."+n ).toggleClass( "escolhido" );

    if (selecionado1 == false && n == 1){
        selecionaFicheiro(n);
        selecionado1 = true;
    }else if (selecionado1 == true && n == 1){
        desselecionaFicheiro(n);
        selecionado1 = false;
    }else if (selecionado2 == false && n == 2){
        selecionaFicheiro(n);
        selecionado2 = true;
    }else if (selecionado2 == true && n == 2){
        desselecionaFicheiro(n);
        selecionado2 = false;
    }else if (selecionado3 == false && n == 3){
        selecionaFicheiro(n);
        selecionado3 = true;
    }else if (selecionado3 == true && n == 3){
        desselecionaFicheiro(n);
        selecionado3 = false;
    }else if (selecionado4 == false && n == 4){
        selecionaFicheiro(n);
        selecionado4 = true;
    }else if (selecionado4 == true && n == 4){
        desselecionaFicheiro(n);
        selecionado4 = false;
    }
}


function selecionaFicheiro(num){
    
    if(num == 1){
        ficheiros_a_enviar.push(ficheiros[0]);
    } else if (num == 2){
        ficheiros_a_enviar.push(ficheiros[1]);
    } else if (num == 3){
        ficheiros_a_enviar.push(ficheiros[2]);
    } else if (num == 4){
        ficheiros_a_enviar.push(ficheiros[3]);
    }


    console.log(ficheiros_a_enviar.length);
 
    if(ficheiros_a_enviar.length > 0){
        //Muda a cor da caixa selecionada 
        let tema = localStorage.getItem("tema");
        if(tema == 'claro'){
            document.getElementById("enviar").style.backgroundColor = "#08b86d";
        }else{
            document.getElementById("enviar").style.backgroundColor = "#0d9f61"; 
        }

        if (document.getElementById("enviar").style.backgroundColor != "lightgrey" ){
            console.log("cor diferente de cinzento")
            document.getElementById("enviar").style.color = "#eee";
        }
        
        $('#enviar').addClass('envia');
            
    }
    
}

function desselecionaFicheiro(num){
    
    if(num == 1){
        ficheiros_a_enviar.splice(ficheiros_a_enviar.indexOf(ficheiros[0]), 1);
    } else if (num == 2){
        ficheiros_a_enviar.splice(ficheiros_a_enviar.indexOf(ficheiros[1]), 1);
    } else if (num == 3){
        ficheiros_a_enviar.splice(ficheiros_a_enviar.indexOf(ficheiros[2]), 1);
    } else if (num == 4){
        ficheiros_a_enviar.splice(ficheiros_a_enviar.indexOf(ficheiros[3]), 1);
    }

    console.log(ficheiros_a_enviar.length);
    if(ficheiros_a_enviar == 0){
        //Muda a cor do botão
        document.getElementById("enviar").style.backgroundColor = "lightgrey";    
        document.getElementById("enviar").style.color = "black";
        $('#enviar').removeClass('envia');
    }

}


function enviaFicheiro(){
    let alterar = infosConversaAtual()[3];
    let ultimaMsg = "";

    let conteudo = "";

    for (let i = 0; i < ficheiros_a_enviar.length; i++){

        conteudo += "<div class='box darker'><h3>Eu</h3><img class='ficheiro' src=" + ficheiros_a_enviar[i][0] +"><p>" + ficheiros_a_enviar[i][1] +"</p><span class='time-left'>"+ 
                    dataAtual.getHours().toString() + ":"  + dataAtual.getMinutes().toString() + "h" + "</span></div>";
        
        ultimaMsg = ficheiros_a_enviar[i][1];
            
    }

    alterar.push(conteudo);

    let indice = indiceAdicionar();

    todas_converas[indice][3] = alterar;
    todas_converas[indice][4] = ultimaMsg;
    atualizaLS();

    // location.href = "conversaBase.html";
    // window.location = paginaAnterior;
    redireciona();

}

function indiceAdicionar(){
    let result = 0;
    for (let i = 0; i < todas_converas.length; i++){
        if(todas_converas[i][1] == conversa_a_alterar){
            return i;
        }
    }

}

function atualizaLS(){
    poeNoTopo(conversa_a_alterar);
    localStorage.setItem("lista_conversas_que_existem", JSON.stringify(todas_converas))
}

function verificaCondicao(){
    const div = document.querySelector('#enviar');
    if(div.classList.contains("envia")){
        // console.log("está a dar");
        if (info_ficheiros == "Conversas"){
            enviaFicheiro();
        }

        if(info_ficheiros == "Chamada"){
            enviaFicheiroMiniChat();
        }

        
    }else{
        abrePopUp('Envio')
    }
}



function infosConversaAtual(){

    for (let i = 0; i < todas_converas.length; i++){

        if (todas_converas[i][1] === conversa_a_alterar){
            return todas_converas[i];
        }

    }
}

function redireciona(){

    if (info_ficheiros == "Conversas"){
        location.href="ConversaBase.html";
    }
    if(info_ficheiros == "Chamada"){
        location.href="chamadaVideoAuto.html"
    }
}

// Meter no comum
////////////////////////////////////////////////////////////////////////////////////////////////////
// PopUp ///////////////////////////////////////////////////////////////////////////////////////////
function abrePopUp(nome){
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.display = "grid"); 
}

function fechaPopUp(nome){
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.display = "none"); 
}

////////////////////////////////////////////////////////////////////////////////////////////////////

function poeNoTopo(elemento){

    let indice;
    for (let i = 0; i < todas_converas.length; i++){
        if (elemento === todas_converas[i][1]){
            indice = i;
        }
    }

    let vaiTopo = todas_converas[indice];
    todas_converas.splice(indice, 1);
    todas_converas.unshift(vaiTopo);

}

function enviaFicheiroMiniChat(){

    let conteudo = "";

    for (let i = 0; i < ficheiros_a_enviar.length; i++){

        conteudo += "<div class='box darker'><h3>Eu</h3><img class='ficheiro' src=" + ficheiros_a_enviar[i][0] +"><p>" + ficheiros_a_enviar[i][1] +"</p><span class='time-left'>"+ 
                    dataAtual.getHours().toString() + ":"  + dataAtual.getMinutes().toString() + "h" + "</span></div>";
    }
    console.log(conteudo);
    conversas_miniChat.push(conteudo);

    localStorage.setItem("miniChat", JSON.stringify(conversas_miniChat));

    redireciona();
}