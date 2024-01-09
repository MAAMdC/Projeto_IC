let conversas = [
    "<div class='caixaMensagem msg1'> <div class='info'> <div class='texto'> <h3 classe='nome'>LOL-123</h3> <p classe='ultimaMsg'>Olá</p> </div><div class='icone'><img src='img/lol.png'></div></div></div>",
    "<div class='caixaMensagem msg2'> <div class='info'> <div class='texto'> <h3 classe='nome'>Carolina</h3> <p classe='ultimaMsg'>Cinema?</p> </div><div class='icone'><img src='img/carolina.png'></div></div></div>",
    "<div class='caixaMensagem msg3'> <div class='info'> <div class='texto'> <h3 classe='nome'>Avô</h3> <p classe='ultimaMsg'>Beijinhos</p> </div><div class='icone'><img src='img/avo.png'></div></div></div>",
    "<div class='caixaMensagem msg4'> <div class='info'> <div class='texto'> <h3 classe='nome'>Diogo Martins</h3> <p classe='ultimaMsg'>Vamos jogar?</p> </div><div class='icone'><img src='img/diogo.png'></div></div></div>",
    "<div class='caixaMensagem msg5'> <div class='info'> <div class='texto'> <h3 classe='nome'>Mãe</h3> <p classe='ultimaMsg'>💖</p></div><div class='icone'><img src='img/mae.png'></div></div></div>",
    "<div class='caixaMensagem msg6'> <div class='info'> <div class='texto'> <h3 classe='nome'>Turma Fixe</h3> <p classe='ultimaMsg'>Estudaram?</p> </div><div class='icone'><img src='img/fcul.png'></div></div></div>",
    "<div class='caixaMensagem msg7'> <div class='info'> <div class='texto'> <h3 classe='nome'>Francisco R.</h3> <p classe='ultimaMsg'>Temos de sair</p> </div><div class='icone'><img src='img/francisco.png'></div></div></div>",
    "<div class='caixaMensagem msg8'> <div class='info'> <div class='texto'> <h3 classe='nome'>Sara (Turma)</h3> <p classe='ultimaMsg'>Obrigada!</p> </div><div class='icone'><img src='img/sara.png'></div></div></div>",                        
    "<div class='caixaMensagem msg9'> <div class='info'> <div class='texto'> <h3 classe='nome'>Sunsets</h3> <p classe='ultimaMsg'>Onde é que é a festa?</p> </div><div class='icone'><img src='img/sunset.png'></div></div></div>",
    "<div class='caixaMensagem msg10'> <div class='info'> <div class='texto'> <h3 classe='nome'>Ricardo</h3> <p classe='ultimaMsg'>Onde?</p> </div><div class='icone'><img src='img/ricardo.png'></div></div></div>",
];

let lista_participantes_lol = [
    ["carolina.png","Carolina"], 
    ["francisco.png","Francisco R."],
    ["diogo.png","Diogo Martins"], 
    ["mafalda.png","Mafalda"], 
];

let lista_participantes_turma = [
    ["carolina.png","Carolina"], 
    ["francisco.png","Francisco R."],
    ["diogo.png","Diogo Martins"], 
    ["mafalda.png","Mafalda"], 
    ["sara.png", "Sara (Turma)"],
    //meter mais
];

let lista_participantes_sunset= [
    ["carolina.png","Carolina"], 
    ["francisco.png","Francisco R."],
    ["diogo.png","Diogo Martins"], 
    ["mafalda.png","Mafalda"], 
    ["sara.png", "Sara (Turma)"],
    //Trocar
];


let lista_conversas_lol = [
'<div class="box"> <img src="img/diogo.png" alt="Avatar"> <h3>Diogo Martins</h3><p>Grande jogo :D</p><span class="time-right">20 Out.</span> </div>',
'<div class="box"><img src="img/mafalda.png" alt="Avatar"><h3>Mafalda</h3><p>Parabéns a todos!</p><span class="time-right">20 Out.</span></div>',
];

// Ver as datas
let lista_conversas = [
    ["lol.png", "LOL-123", lista_participantes_lol, lista_conversas_lol, "Parabéns a todos!"], // A última coisa desta lista é a ultima mensagem que foi enviada
    ["carolina.png", "Carolina", [["carolina.png","Carolina"]], ['<div class="box"> <img src="img/carolina.png" alt="Avatar"> <h3>Carolina</h3><p>Vais à aula amanhã?</p><span class="time-right">20 Out.</span> </div>'], "Vais à aula amanhã?"], 
    ["avo.png", "Avô", [["avo.png","Avô"]], ['<div class="box darker"> <h3>Eu</h3><p>Beijinhos</p><span class="time-right">20 Out.</span> </div>','<div class="box"> <img src="img/avo.png" alt="Avatar"> <h3>Avô</h3><p>Beijinhos</p><span class="time-right">20 Out.</span> </div>'], "Beijinhos"], 
    ["diogo.png", "Diogo Martins", [["diogo.png","Diogo Martins"]], ['<div class="box"> <img src="img/diogo.png" alt="Avatar"> <h3>Diogo Martins</h3><p>Jogamos hoje?</p><span class="time-right">12 Nov.</span> </div>'], "Jogamos hoje?"], 
    ["mae.png", "Mãe", [["mae.png","Mãe"]], ['<div class="box darker"> <h3>Eu</h3><p>Até já</p><span class="time-right">15 Nov.</span> </div>','<div class="box"> <img src="img/mae.png" alt="Avatar"> <h3>Mãe</h3><p>💖</p><span class="time-right">15 Nov.</span></div>'], "💖"], 
    ["fcul.png", "Turma Fixe", lista_participantes_turma, ['<div class="box"> <img src="img/fred.png" alt="Avatar"> <h3>Fred</h3><p>Alguém tem apontamentos?</p><span class="time-right">12 Nov.</span> </div>'], "Alguém tem apontamentos?"],
    ["francisco.png", "Francisco R.", [["francisco.png","Francisco R."]], ['<div class="box"> <img src="img/francisco.png" alt="Avatar"> <h3>Francisco R.</h3><p>Temos de sair</p><span class="time-right">16 Nov.</span> </div>','<div class="box darker"> <h3>Eu</h3><p>Temos mesmo 😉</p><span class="time-right">16 Nov.</span> </div>'], "Temos mesmo 😉"], 
    ["sara.png", "Sara (Turma)", [["sara.png","Sara (Turma)"]], ['<div class="box"> <img src="img/sara.png" alt="Avatar"> <h3>Sara (Turma)</h3><p>Obrigada pela ajuda!</p><span class="time-right">12 Out.</span> </div>','<div class="box darker"> <h3>Eu</h3><p>De nada</p><span class="time-right">12 Out.</span> </div>'], "De nada"], 
    ["sunset.png", "Sunsets", lista_participantes_sunset, ['<div class="box darker"> <h3>Eu</h3><p>Onde é a festa?</p><span class="time-right">19 Out.</span> </div>'], "Onde é a festa?"], 
    ["ricardo.png", "Ricardo", [["ricardo.png","Ricardo"]], ['<div class="box darker"> <h3>Eu</h3><p>Vens jogar?</p><span class="time-right">19 Out.</span> </div>'], "Vens jogar?"], 
    ["", "chamadaVideoAuto", ['chamadaVideoAuto'], [], ""], 

];

$(document).ready(function(){

    //Clica com o enter
    $(window).keydown(function(e) {
        switch (e.keyCode) {
          case 13: // enter
          e.preventDefault(); 
          location.href='index.html'
          return;
        }
      });

// Define o utilizador default e preferencias 
// localStorage.setItem("userName", "Anónimo"); 
// localStorage.setItem("avatar", "avataaars.png"); 
localStorage.setItem("tema", "claro"); 

localStorage.setItem("paginaAtual", "paginaReset"); 

localStorage.setItem("chamadaAtiva", "")

localStorage.setItem("userSidebar", JSON.stringify(["Anónimo", "personalazul2.png"]));

// Inicia a lista de contactos
let lista_contactos = [
    ["afonso.png","Afonso", transformaTexto("Afonso")], 
    ["alice.png","Alice", transformaTexto("Alice")], 
    ["avo.png","Avô", transformaTexto("Avô")],
    ["carolina.png", "Carolina", transformaTexto("Carolina")],
    ["conguito.png", "Conguito", transformaTexto("Conguito")],
    ["diogo.png","Diogo Martins", transformaTexto("Diogo Martins")], 
    ["francisco.png", "Francisco R." ,transformaTexto("Francisco R.")],
    ["fred.png","Fred", transformaTexto("Fred")],
    ["joana.png", "Joana Lopes", transformaTexto("Joana Lopes")],
    ["mae.png", "Mãe", transformaTexto("Mãe")], 
    ["mafalda.png","Mafalda", transformaTexto("Mafalda")],
    ["marco.png", "Marco Filipe", transformaTexto("Marco Filipe")],
    ["maria.png", "Maria Marques", transformaTexto("Maria Marques")],
    ["pai.png", "Pai", transformaTexto("Pai")],
    ["ricardo.png","Ricardo", transformaTexto("Ricardo")],
    ["sara.png", "Sara (Turma)", transformaTexto("Sara (Turma)")],
    ["tioManel.png","Tio Manel", transformaTexto("Tio Manel")]                   
];

// Inicia a lista de grupos
let lista_grupos = [ 
    ["lol.png","LOL-123"], 
    ["fcul.png","Turma Fixe"], 
    ["sunset.png","Sunsets"], 
];

let lista_participantes_IC = [
    ["conguito.png", "Conguito"], 
    ["tioManel.png","Carlos"],
    ["maria.png", "Maria Marques"],
    ["mafalda.png","Mafalda"]
];

let lista_grupos_apagados = [
    ["fcul.png" , "Trabalho IC", lista_participantes_IC,['<div class="box"><img src="img/carlos.png" alt="Avatar"><h3>Carlos</h3><p>Guardem bem este ficheiro!</p><span class="time-right">20 Out.</span></div>', 
                                                         '<div class="box file"><h3>Carlos</h3><img class="ficheiro" src="img/pdf.png"><p class="nomeFich">TrabalhoIc_final.pdf</p><span class="time-right">Agora</span></div></div></div>'], "TrabalhoIc_final.pdf"],
    // ["personal.png", "Grupo de teste", lista_participantes_turma, "", ""]
];

localStorage.setItem("nomeNovaConversa", ""); 
localStorage.setItem("lista_contactos", JSON.stringify(lista_contactos)); 
localStorage.setItem("lista_grupos", JSON.stringify(lista_grupos)); 
localStorage.setItem("lista_grupos_apagados" , JSON.stringify(lista_grupos_apagados));
localStorage.setItem("lista_conversas_que_existem" , JSON.stringify(lista_conversas));
localStorage.setItem("participantesAtuais", JSON.stringify(lista_participantes_lol));


localStorage.setItem("conversa_abre" , "LOL-123");

// Regista as conversas disponíveis atualmente
localStorage.setItem("conversas", conversas);
conversasAtuais = localStorage.getItem("conversas")
conversasFinal = conversasAtuais.split(",");

for (i = 0; i < conversasFinal.length; i++) {
    $(".mensagens").append(conversasFinal[i]);
    }
});

function transformaTexto(string){

    let string_final = string.toLowerCase();
    string_final = string_final.replace(/\s/g, "_")
    return string_final;
}


