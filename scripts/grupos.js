// Adicinar automaticamente a jantarada aos grupos quando for criada
let arrayGrupos = JSON.parse(localStorage.getItem("lista_grupos")).sort(function(a,b){ 
    return a[1].toLowerCase() > b[1].toLowerCase() ? 1 : -1;
 });;

let paginaAnterior = localStorage.setItem("paginaAnterior","grupos.html")
let conversasQueExistem = JSON.parse(localStorage.getItem("lista_conversas_que_existem"));

let encontrado = false;

window.addEventListener("load", principal);

const CAIXA_CONTACTOS = "caixa_contactos";


function principal(){

    adicionaDiv();

}


function adicionaDiv(){

    let caixa = document.getElementById(CAIXA_CONTACTOS);



    for (let i = 0; i < arrayGrupos.length; i++){

    caixa.innerHTML +=
            ' <div id="contacto"> <li id= "avatar"><img src="img/'  + arrayGrupos[i][0] + '" class="avatar"></li>' + 
                  '<li id = "nome" onclick="verificaSeEstaNasConversas('+ i +');" >' + arrayGrupos[i][1] + '</li>' + '<li id="ic3"><img src="img/camera-de-videoazul.png" class="botoes"  onclick="redirecionaChamada('+ i +');"></li>' +
                   '<li id="ic1"><img src="img/comment-altazul.png" class="botoes" onclick="verificaSeEstaNasConversas('+ i +');"></li></div>'  ;

// console.log('<li id= "avatar"><img src="img/ '  + lista_contactos[i][0] + '" class="avatar"></li>')
}

}

function verificaSeEstaNasConversas(indice){

    console.log(indice)
    console.log(arrayGrupos[indice])


    for (let i = 0; i < conversasQueExistem.length; i++){
        if (transformaTexto(arrayGrupos[indice][1]) === transformaTexto(conversasQueExistem[i][1])){
            // console.log(conversasQueExistem[i][1])
            encontrado = true;
            }
        }

    console.log(encontrado)
    if (encontrado == true){
        localStorage.setItem("conversa_abre", arrayGrupos[indice][1]);
        poeNoTopo(arrayGrupos[indice][1])
        localStorage.setItem("lista_conversas_que_existem", JSON.stringify(conversasQueExistem));
        window.location = "conversaBase.html";

    }
}


function transformaTexto(string){

    let string_final = string.toLowerCase();
    string_final = string_final.replace(/\s/g, "_")
    return string_final;


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


function redirecionaChamada(indice){


    let atual = localStorage.getItem("Chamada");

    let pagRedireciona = arrayGrupos[indice][1];

    if (atual != "Ativa"){

        for (let i = 0; i < conversasQueExistem.length; i++){
            if (transformaTexto(arrayGrupos[indice][1]) === transformaTexto(conversasQueExistem[i][1])){
                // console.log(conversasQueExistem[i][1])
                encontrado = true;
                }
            }

        console.log(encontrado)
        if (encontrado == true){
            localStorage.setItem("conversaSelecionada", pagRedireciona);
            localStorage.setItem("conversa_abre", arrayGrupos[indice][1]);
            poeNoTopo(arrayGrupos[indice][1])
            localStorage.setItem("lista_conversas_que_existem", JSON.stringify(conversasQueExistem));
            // window.location = "chamadaVideoAuto.html";
            window.location = "paginaEspera.html";

        }

        localStorage.setItem("guia_ficheiro", "Conversas");
    }else{
        let chamadaAtual = localStorage.getItem("chamadaAtiva");
        if (chamadaAtual == pagRedireciona){
            location.href="chamadaVideoAuto.html";
            localStorage.setItem("conversaSelecionada", chamadaAtual)
            localStorage.setItem("conversa_abre", chamadaAtual)

        }else{
            abrePopUp("DecorreChamada");
        }
    }
    

}