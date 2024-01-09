let arrayContactos = JSON.parse(localStorage.getItem("lista_contactos"));
let conversasQueExistem = JSON.parse(localStorage.getItem("lista_conversas_que_existem"));
let paginaAnterior = localStorage.setItem("paginaAnterior","contactos.html")

window.addEventListener("load", principal);

const CAIXA_CONTACTOS = "caixa_contactos";

let verificador = 0;

function principal(){


    //Clica com o enter
    $(window).keydown(function(e) {
        switch (e.keyCode) {
          case 13: // enter
          e.preventDefault(); 
          if(verificador != 0){
            adicionaListaContactos();
          }
          return;
        }
    });

    adicionaDiv();

    document.getElementById("btnEnvio").disabled = true;
    // document.getElementById("btnEnvio").style.backgroundColor = "#b6b6b6";
    document.getElementById("btnEnvio").style.visibility = 'hidden';


    setInterval(verificaInput, 300);

    $( "#novo_contacto" ).focus()
}

function adicionaDiv(){

    let caixa = document.getElementById(CAIXA_CONTACTOS);

    caixa.innerHTML = "";

    for (let i = 0; i < arrayContactos.length; i++){

        caixa.innerHTML +=
            '<div id="contacto"> <li id="avatar'+ i +'" onclick="abrePopUp('+"'Imagem'"+')";><img src="img/'  + arrayContactos[i][0] + '" class="avatar"></li>' + 
            '<li id = "nome" onclick="verificaSeEstaNasConversas('+ i +');">' + arrayContactos[i][1] + '</li>' + '<li id="ic3"><img src="img/camera-de-videoazul.png" class="botoes" onclick="redirecionaChamada('+ i +');"></li>' +
            '<li id="ic1"><img src="img/comment-altazul.png" class="botoes" onclick="verificaSeEstaNasConversas('+ i +');"></li></div>' ;    
    }
}

function adicionaListaContactos(){

    if (verificador == 1){
        let contacto = ["personal.png",document.getElementById("novo_contacto").value , transformaTexto(document.getElementById("novo_contacto").value)]; //trocar a foto

        arrayContactos.unshift(contacto);
        arrayContactos = arrayContactos.sort(function(a,b){ 
            return a[1].toLowerCase() > b[1].toLowerCase() ? 1 : -1;
         });
    
        localStorage.setItem("lista_contactos", JSON.stringify(arrayContactos));
    
        adicionaDiv();
        abrePopUp('Criar');

        //limpa a linha de input
        document.getElementById("novo_contacto").value = "";

        //Mete o nome no popUp
        $('#nomeCont').text(' "'+ contacto[1]+'" ');
    }
    

}

function transformaTexto(string){

    let string_final = string.toLowerCase();
    string_final = string_final.replace(/\s/g, "_")
    return string_final;

}

function verificaSeEstaNasConversas(indice){

    let encontrado = false;

    for (let i = 0; i < conversasQueExistem.length; i++){
        if (arrayContactos[indice][2] === transformaTexto(conversasQueExistem[i][1])){
            encontrado = true;
        }
    }
    
    if (encontrado == true){
        localStorage.setItem("conversa_abre", arrayContactos[indice][1]);
        poeNoTopo(arrayContactos[indice][1])
        localStorage.setItem("lista_conversas_que_existem", JSON.stringify(conversasQueExistem));
        window.location = "conversaBase.html";
    }else{
        // console.log("entrou no else")
        conversasQueExistem.unshift([arrayContactos[indice][0], arrayContactos[indice][1], [[arrayContactos[indice][0], arrayContactos[indice][1]]], [], ""]);
        localStorage.setItem("lista_conversas_que_existem", JSON.stringify(conversasQueExistem));
        localStorage.setItem("conversa_abre", arrayContactos[indice][1]);
        window.location = "conversaBase.html";
    }

}

function poeNoTopo(elemento){
    let indice;
    for (let i = 0; i < conversasQueExistem.length; i++){
        if (elemento === conversasQueExistem[i][1]){
            indice = i;
        }
    }
    let vaiTopo = conversasQueExistem[indice];
    conversasQueExistem.splice(indice, 1);
    conversasQueExistem.unshift(vaiTopo);

}


function abrePopUp(nome){
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.display = "grid"); 
}

function fechaPopUp(nome){
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.display = "none"); 
}


function redirecionaChamada(indice){

    let atual = localStorage.getItem("Chamada");

    let pagRedireciona = arrayContactos[indice][1];

    if (atual != "Ativa"){

        localStorage.setItem("conversaSelecionada", pagRedireciona);

        let encontrado = false;

        for (let i = 0; i < conversasQueExistem.length; i++){
            if (arrayContactos[indice][2] === transformaTexto(conversasQueExistem[i][1])){
                encontrado = true;

            }
        }

        if (encontrado == true){
            localStorage.setItem("conversa_abre", arrayContactos[indice][1]);
            poeNoTopo(arrayContactos[indice][1])
            localStorage.setItem("lista_conversas_que_existem", JSON.stringify(conversasQueExistem));
            window.location = "paginaEspera.html";
        }else{
            // console.log("entrou no else")
            conversasQueExistem.unshift([arrayContactos[indice][0], arrayContactos[indice][1], [[arrayContactos[indice][0], arrayContactos[indice][1]]], [], ""]);
            localStorage.setItem("lista_conversas_que_existem", JSON.stringify(conversasQueExistem));
            localStorage.setItem("conversa_abre", arrayContactos[indice][1]);
            // window.location = "chamadaVideoAuto.html";
            window.location = "paginaEspera.html";
        }

        localStorage.setItem("guia_ficheiro", "Conversas");
    }else{
        let chamadaAtual = localStorage.getItem("chamadaAtiva");
        if (chamadaAtual == pagRedireciona){
            location.href="chamadaVideoAuto.html";
        }else{
            abrePopUp("DecorreChamada");
        }

    }
   
}

function verificaInput(){

    let input = document.getElementById("novo_contacto").value

    if(input.trim().length > 0){

        console.log("ATIVA");
        verificador = 1;
        document.getElementById("btnEnvio").disabled = false;
        // document.getElementById("btnEnvio").style.backgroundColor = "#378BA0";
        document.getElementById("btnEnvio").style.visibility = 'visible';
    }else{

        console.log("DESATIVA");
        verificador = 0;
        document.getElementById("btnEnvio").disabled = true;
        // document.getElementById("btnEnvio").style.backgroundColor = "#b6b6b6";
        document.getElementById("btnEnvio").style.visibility = 'hidden';
    }
}




let imgSelecionada;
let selecionado = 0;
let escolhida = 0;

//define o tema
// let tema = localStorage.getItem("tema"); 
let imgAvatar;


// window.addEventListener("load", principal);

// function principal(){
  
// }
function selecionaImagem(nome){

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
        imgSelecionada = "img/" + imgAvatar;
    }
    console.log(id)
    document.getElementById(id).src = imgSelecionada;

    console.log("esta é a img: "+imgSelecionada)
    console.log(document.getElementById(id))
    return imgSelecionada.slice(4);
}


 