let themeC = document.getElementById("tema");
            
window.onload = function () {

    let atual = localStorage.getItem("Chamada");

    // Chamada em funcionamento no background
    let chamadaAtiva = localStorage.getItem("chamadaAtiva");
    let paginaAtual = localStorage.getItem("paginaAtual");
    if (atual == "Ativa"){
        if (chamadaAtiva != null  && paginaAtual != "chamadaVideoAuto" && paginaAtual != "paginaEspera"  && paginaAtual != "paginaReset") {
            let div = document.createElement("div");
            div.onclick = function(){location.href="chamadaVideoAuto.html";};
            div.classList.add("chamadaMinimizada");
    
            let img = document.createElement("img");
            let imgSrc = "./img/" + imgChat(chamadaAtiva);
            img.src = imgSrc;
            img.classList.add("imgChamadaMinimizada")
    
            let para = document.createElement("p");
            let nomeChamadaAtiva = document.createTextNode(localStorage.getItem("chamadaAtiva"));
            para.appendChild(nomeChamadaAtiva);
            para.classList.add("para");
    
            let botaoDesligar = document.createElement("input");
            botaoDesligar.type = "image";
            botaoDesligar.src = "./img/botao-desligar.png"
            botaoDesligar.onclick = function(){
                localStorage.removeItem("partilhaEcra");
                localStorage.removeItem("chamadaAtiva");
                location.reload();
                localStorage.setItem("Chamada", "Nao ativa")
            };
            botaoDesligar.classList.add("botaoDesligar");
    
            let botaoVolume = document.createElement("input");
            botaoVolume.setAttribute('id','btnVolume');
            botaoVolume.type = "image";
            botaoVolume.src = "./img/botao-volume.png";
            botaoVolume.onclick = function(){
                btnVolume.src = "./img/botao-volume-0.png";
                // se clicar outra vez, voltar a mudar a src
            };
            botaoVolume.classList.add("botaoVolume");
    
            div.appendChild(img);
            div.appendChild(para);
    
            let element = document.getElementById("container");
            element.appendChild(div);
            element.appendChild(botaoDesligar);
            element.appendChild(botaoVolume);
            console.log("chamada ativa");
    }
    
    }

    function imgChat(nomeChat) {
        let lista_conversas = JSON.parse(localStorage.getItem("lista_conversas_que_existem"));
        let imgSrc;
        for (let conversa in lista_conversas) {
            if (lista_conversas[conversa][1] == nomeChat) {
                imgSrc = lista_conversas[conversa][0];
            }
        }
        return imgSrc;
    }

    // User e nome clicáveis
    //document.getElementById("imagem_username").addEventListener("click", mudaPerfil());
    //document.getElementById("username").addEventListener("click", mudaPerfil());
  
    let tema = localStorage.getItem("tema");
    defineTema(tema)
    console.log("tema");

    function defineTema(tema) { 

        if(tema == 'claro'){
            themeC.setAttribute('href', 'styles/temaClaro.css'); 
            localStorage.setItem("tema", "claro")
        }else { 
            themeC.setAttribute('href', 'styles/temaEscuro.css'); 
            localStorage.setItem("tema", "escuro")

            //Mete as setas e as cruzes a branco
            $('#Back').attr('src', 'img/arrow-small-leftbra.png');
            $('.fechar').attr('src','img/cross-smallbra.png');
            $('#fechar').attr('src','img/cross-smallbra.png');


            //Mete os ícones do vídeo a branco
            $('#l1ico').attr('src','img/volumeMutebra.png');
            $('#l2ico').attr('src','img/microphoneMutebra.png');
            $('#l3ico').attr('src','img/camera-de-videoMutebra.png');
            $('#l4ico').attr('src','img/phone-slashbra.png');
            $('#l5ico').attr('src','img/comment-altbra.png');
            $('#l6ico').attr('src','img/screenbra.png');
            $('#l7ico').attr('src','img/sairbra.png');

            //Mete a imagem default a branco
            $('.iconGrupo').attr('src','img/personalbra.png');

        } 
        console.log(themeC);
    } 
}

  function mudaPerfil(){
      location.href = 'perfil.html'
  }

////////////////////////////////////////////////////////////////////////////////////////////////////
// PopUp ///////////////////////////////////////////////////////////////////////////////////////////
function abrePopUp(nome){
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.display = "grid"); 
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.visibility = "visible"); 
    document.querySelectorAll("#overlay").forEach(a=>a.style.visibility = "visible"); 
}

function fechaPopUp(nome){
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.display = "none"); 
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.visibility = "hidden"); 
    document.querySelectorAll("#overlay").forEach(a=>a.style.visibility = "hidden"); 
}

////////////////////////////////////////////////////////////////////////////////////////////////////
