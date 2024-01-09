window.addEventListener("load", principal);

const BTN_GUARDAR = "guardar";
const BTN_OK = "btn_ok";
const BTN_FECHAR = "btn_fechar";
const FORM = "outros";
const USERNAME = "username";
const EDITAR_IMG = "editar_avatar";

const IMG1= "imagem1";
const IMG2= "imagem2";
const IMG3= "imagem3";
const IMG4= "imagem4";
const IMG5= "imagem5";
const IMG6= "imagem6";
const IMG7= "imagem7";
const IMG8= "imagem8";
const IMG9 = "imagem9";

let userAtual = JSON.parse(localStorage.getItem("userSidebar"));

let nomeUser = userAtual[0];
let formulario;
let imagemEscolhida = userAtual[1];

let clicado = 0;

let input = 0;
let img = 0;

let tema = localStorage.getItem("tema");

let arrayFotos;

function escolheArrayFotos(){
    if(tema == 'claro'){
        arrayFotos = [
            "Afonso.png",
            "alice.png",
            "avo.png",
            "Conguito.png",
            "diogo.png",
            "d.png",
            "carolina.png",
            "joana.png",
            "personal.png"
        ];
    }else { 
        arrayFotos = [
            "Afonso.png",
            "alice.png",
            "avo.png",
            "Conguito.png",
            "diogo.png",
            "d.png",
            "carolina.png",
            "joana.png",
            "personalbra.png"
        ];
        $('#imagem9').attr('src','img/personalbra.png');
    }
}

function principal(){ 

    //Mete o texto pronto a escrever quando abre 
    $( "#usernameinput" ).focus();

    escolheArrayFotos();
    // selecionado(9);
    
    formulario = document.forms[FORM];

    if (imagemEscolhida == "personalbra.png" || imagemEscolhida == "personal.png"){
        let tema = localStorage.getItem("tema");
        if (tema == "claro"){
            imagemEscolhida = "personal.png"
        }else{
            imagemEscolhida = "personalbra.png"
        }
    }

    // Inicializa a página com o popUp escondido
    document.querySelectorAll("#popupPerfil").forEach(a=>a.style.display = "none"); 

    document.getElementById("trocar").src = "img/" + imagemEscolhida;

    document.getElementById(BTN_GUARDAR).addEventListener("click", function(){guardaNome()});
    document.getElementById("nao").addEventListener("click", function(){cancela()});
    document.getElementById(EDITAR_IMG).addEventListener("click", function(){trocaInfos()});
    document.getElementById(BTN_OK).addEventListener("click", function(){fechaPopUp('Perfil')});
    document.getElementById(BTN_FECHAR).addEventListener("click", function(){fechaPopUp('Perfil')});

    document.getElementById(IMG1).addEventListener("click", function(){selecionado(1)});
    document.getElementById(IMG2).addEventListener("click", function(){selecionado(2)});
    document.getElementById(IMG3).addEventListener("click", function(){selecionado(3)});
    document.getElementById(IMG4).addEventListener("click", function(){selecionado(4)});
    document.getElementById(IMG5).addEventListener("click", function(){selecionado(5)});
    document.getElementById(IMG6).addEventListener("click", function(){selecionado(6)});
    document.getElementById(IMG7).addEventListener("click", function(){selecionado(7)});
    document.getElementById(IMG8).addEventListener("click", function(){selecionado(8)});
    document.getElementById(IMG9).addEventListener("click", function(){selecionado(9)});


    document.getElementById(BTN_GUARDAR).disabled = true;
    document.getElementById(BTN_GUARDAR).style.backgroundColor = "#eeeeee";
    document.getElementById(BTN_GUARDAR).style.color = "black";

    
    document.getElementById("nao").disabled = true;
    document.getElementById("nao").style.backgroundColor = "#eeeeee";
    document.getElementById("nao").style.color = "black";


    document.getElementById("nome_username").innerHTML = nomeUser;


    setInterval(obtemNome, 300);

    document.querySelector('#usernameinput').addEventListener('keypress', function (e) {
        if ( (input == 0 && img == 1) || (img == 1 && input == 1) || (input == 1  && img == 0) ){
            if (e.key === 'Enter') {
                // alert("deu")
                event.preventDefault();
                guardaNome()
            }
        }else{
            if (e.key === 'Enter') {
                event.preventDefault();
            }
        }
    });

}


function selecionado(num){

    // console.log("ENTROU NO SELECIONADO");

    document.getElementById("trocar").src = "img/" + arrayFotos[num -1]; 

    imagemEscolhida = arrayFotos[num -1];

    img = 1;

    ativaBotao();

}

function obtemNome(){
    // console.log(imagem)
    input = 0;

    let novo = formulario.elements[USERNAME].value;

    if (novo == '' || novo.trim().length == 0){
        nomeUser = nomeUser;
        input = 0;
    }else{
        input = 1;
        nomeUser = novo;
    }

    ativaBotao();

}


function guardaNome(){

    obtemNome();
    // nomeUser = formulario.elements[USERNAME].value;

    // if (nomeUser == ''){
    //     nomeUser = nomeUser;
    // }


    console.log(imagemEscolhida);
    let array = [nomeUser, imagemEscolhida];

    localStorage.setItem("userSidebar", JSON.stringify(array));

    document.getElementById("username").innerHTML = nomeUser;
    document.getElementById("imagem_username").src= "img/" + imagemEscolhida;

    // abrePopUp('Perfil');


    // Reset das coisas
    input = 0;
    img = 0;

    document.getElementById(BTN_GUARDAR).disabled = true;
    document.getElementById(BTN_GUARDAR).style.backgroundColor = "#eeeeee";
    document.getElementById(BTN_GUARDAR).style.color = "black";

    formulario.elements[USERNAME].value = "";

    document.getElementById("nome_username").innerHTML = nomeUser;

}

function trocaInfos(){


    if (clicado === 0){
        document.getElementById("outros").style.display = "none";
        document.getElementById("avatares").style.display = "grid";
        clicado = 1;
        document.getElementById(EDITAR_IMG).innerText = "Voltar"
    } else{
        document.getElementById("outros").style.display = "block";
        document.getElementById("avatares").style.display = "none";
        clicado = 0;
        document.getElementById(EDITAR_IMG).innerText = "Editar"
        $( "#usernameinput" ).focus();
    }



}


function ativaBotao(){
    // console.log(input, img)
    if ( (input == 0 && img == 1) || (img == 1 && input == 1) || (input == 1  && img == 0) ){

        document.getElementById(BTN_GUARDAR).disabled = false;
        document.getElementById(BTN_GUARDAR).style.color = "white";

        document.getElementById("nao").disabled = false;
        document.getElementById("nao").style.color = "white";

        if(tema == 'claro'){
            document.getElementById(BTN_GUARDAR).style.backgroundColor = "#08b86d"; 
            document.getElementById("nao").style.backgroundColor = "#fa3a3ade"; 
        }else{
            document.getElementById(BTN_GUARDAR).style.backgroundColor = "#0d9f61";
            document.getElementById("nao").style.backgroundColor = "#fa3a3ade"; 
        }

    }else{
        document.getElementById(BTN_GUARDAR).disabled = true;
        document.getElementById(BTN_GUARDAR).style.backgroundColor = "#eeeeee";
        document.getElementById(BTN_GUARDAR).style.color = "black";

        document.getElementById("nao").disabled = true;
        document.getElementById("nao").style.backgroundColor = "#eeeeee";
        document.getElementById("nao").style.color = "black";

    }

}

function cancela(){

    nomeUser = JSON.parse(localStorage.getItem("userSidebar"))[0];
    imagemEscolhida = JSON.parse(localStorage.getItem("userSidebar"))[1];

    document.getElementById("trocar").src = "img/" + imagemEscolhida;
    document.getElementById("nome_username").innerHTML = nomeUser;

    // document.getElementById("trocar").src = "img/personalazul2.png";
    // document.getElementById("nome_username").innerHTML = "Anónimo";

    
    formulario.elements[USERNAME].value = "";

}




////////////////////////////////////////////////////////////////////////////////////////////////////
// PopUp ///////////////////////////////////////////////////////////////////////////////////////////
function abrePopUp(nome){
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.display = "grid"); 
}

function fechaPopUp(nome){
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.display = "none"); 
}
