// Adicinar automaticamente a jantarada aos grupos quando for criada
let arrayGruposApagados = JSON.parse(localStorage.getItem("lista_grupos_apagados"));
let arrayConversasQueExistem = JSON.parse(localStorage.getItem("lista_conversas_que_existem"));
let arrayGruposQueExistem = JSON.parse(localStorage.getItem("lista_grupos"));
let arrayContactos = JSON.parse(localStorage.getItem("lista_contactos"));

let arrayGruposSelecionados = [];
let quantosAtivos = 0;

window.addEventListener("load", principal);

const CAIXA_CONTACTOS = "caixa_contactos";
const BTN_GRUPO_APAGADO = "contacto";
const BTN_OK = "ok";

// let button = document.getElementById(BTN_OK);
let select = false;

function principal(){

    adicionaDiv();
    // criaEventListeners();
    document.getElementById(BTN_OK).disabled = true;
    document.getElementById(BTN_OK).style.backgroundColor = "#eeeeee";
    document.getElementById(BTN_OK).style.color = "black";

    for (let i = 0; i < arrayGruposApagados.length; i++){
        arrayGruposSelecionados.push([arrayGruposApagados[i],0]);
    }

    // document.getElementById("nao").addEventListener("click", function(){apagaTudo()})
}


function adicionaDiv(){

let caixa = document.getElementById(CAIXA_CONTACTOS);



    for (let i = 0; i < arrayGruposApagados.length; i++){

        caixa.innerHTML +=
            ' <div id="contacto' + String(i) +'" class = contacto onclick = "selecionado(' + String(i) +');" value = "' + transformaTexto(arrayGruposApagados[i][1]) + '" > <li id= "avatar"><img src="img/'  + arrayGruposApagados[i][0] + '" class="avatar"></li>' + 
                  '<li id = "nome">' + arrayGruposApagados[i][1] + '</li>' + '<li id="ic3"></li></div>'  ;

}

}

// ficheiros_a_enviar.splice(ficheiros_a_enviar.indexOf(ficheiros[0]), 1);
function atualizaConversa (){

    // retirar o grupo do array de grupos apagados
    // let grupo = arrayGruposApagados.shift();

    // // adicionar o grupo ao array de conversas existentes
    // arrayConversasQueExistem.unshift(grupo);

    // // adicionar o grupo ao array de grupos existentes
    // arrayGruposQueExistem.unshift([grupo[0], grupo[1]]);

    let contacto = false;

    for (let i = 0; i < arrayGruposSelecionados.length; i++){

        if (arrayGruposSelecionados[i][1] == 1){
            arrayGruposApagados.splice(arrayGruposApagados.indexOf(arrayGruposSelecionados[i][0]), 1);
            arrayConversasQueExistem.unshift(arrayGruposSelecionados[i][0]);
            contacto = verificaContacto(arrayGruposSelecionados[i][0][1]);
            
            if (contacto == false){
                arrayGruposQueExistem.unshift(arrayGruposSelecionados[i][0].slice(0,2));
            }

        }
        contacto = false;

    }



    // mandar tudo de volta à LS e fazer redirecionamento
    localStorage.setItem("lista_grupos_apagados", JSON.stringify(arrayGruposApagados));
    localStorage.setItem("lista_conversas_que_existem" , JSON.stringify(arrayConversasQueExistem));
    localStorage.setItem("lista_grupos", JSON.stringify(arrayGruposQueExistem));
    localStorage.setItem("conversa_abre", arrayGruposSelecionados[0][0][1]);

    location.href = 'conversaBase.html';
}


function transformaTexto(string){

    let string_final = string.toLowerCase();
    string_final = string_final.replace(/\s/g, "_")
    return string_final;

}



////////////////////////////////////////////////////////////////////////////////////////////////////
// PopUp ///////////////////////////////////////////////////////////////////////////////////////////
function abrePopUp(nome){
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.display = "grid"); 
}

function fechaPopUp(nome){
    document.querySelectorAll("#popup" + nome).forEach(a=>a.style.display = "none"); 
}

////////////////////////////////////////////////////////////////////////////////////////////////////

// function selecionado_a(num){
//     console.log(arrayGruposSelecionados);
//     console.log(select)

//     if(arrayGruposSelecionados.length === 0){
//         select = false;
//     }else{
//         select = true;
//     }

//     if (select === false){

//         document.getElementById("contacto" + num).style.backgroundColor = "#378BA0";
//         let valor = document.getElementById("contacto" + num).getAttribute('value');

//         if (arrayGruposSelecionados.indexOf(valor) == -1){
//             arrayGruposSelecionados.unshift(valor);
//         }


//         document.getElementById(BTN_OK).disabled = false;
//         document.getElementById(BTN_OK).style.backgroundColor = "#378BA0";


//     }else{
//         document.getElementById("contacto" + num).style.backgroundColor = "#eeeeee";

        
//         document.getElementById(BTN_OK).disabled = true;
//         document.getElementById(BTN_OK).style.backgroundColor = "#eeeeee";
//         document.getElementById(BTN_OK).style.color = "black";


//     }


// }

function selecionado(num){


    let valor = document.getElementById("contacto" + num).getAttribute('value');
    // console.log(valor);

    for (let i = 0; i < arrayGruposSelecionados.length; i++){
        if(transformaTexto(arrayGruposSelecionados[i][0][1]) === valor){
            if (arrayGruposSelecionados[i][1] == 0){
                arrayGruposSelecionados[i][1] = 1;
                quantosAtivos++;
            }else{
                arrayGruposSelecionados[i][1] = 0;
                quantosAtivos--;
            }
        }
    }
    let tema = localStorage.getItem("tema");
    for (let i = 0; i < arrayGruposSelecionados.length; i++){
        console.log(arrayGruposSelecionados[i][1]);
        if(arrayGruposSelecionados[i][1] == 0){
            // let tema = localStorage.getItem("tema");

            if(tema == 'claro'){
                document.getElementById("contacto" + i).style.backgroundColor = "#eeeeee";
                console.log("aqui1")
            }else{
                document.getElementById("contacto" + i).style.backgroundColor = "#424242";
                console.log("aqui2")
            }
            // document.getElementById("contacto" + i).style.backgroundColor = "#eeeeee";
        }else{
            document.getElementById("contacto" + i).style.backgroundColor = "#378BA0";
            document.getElementById(BTN_OK).style.color = "#eee";
        }
    }

    if (quantosAtivos == 0){
        document.getElementById(BTN_OK).disabled = true;
        document.getElementById(BTN_OK).style.backgroundColor = "#eeeeee";
        document.getElementById(BTN_OK).style.color = "black";
    }else{
        document.getElementById(BTN_OK).disabled = false;
        document.getElementById(BTN_OK).style.backgroundColor = "rgb(8, 184, 109)";
    }
    // console.log(arrayGruposSelecionados);
}



// function criaEventListeners(){

    // document.getElementById(BTN_GRUPO_APAGADO).addEventListener("click", function(){selecionado()});  
    // document.getElementById(BTN_GRUPOS).addEventListener("click", function(){window.location = GRUPOS});

//  }

function verificaContacto(nome){

    let contacto = false;
    for (let i = 0; i < arrayContactos.length; i++){
        if(nome == arrayContactos[i][1]){
            contacto = true;
        }
    }
    return contacto;

}

function apagaTudo(){

    arrayGruposApagados = [];
    localStorage.setItem("lista_grupos_apagados", JSON.stringify(arrayGruposApagados));

    location.href ="lixo.html"

}