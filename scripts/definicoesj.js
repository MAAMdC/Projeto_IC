function pesquisa() {
    let minhaPesquisa = document.getElementById("barraPesquisa");
    let filtro = minhaPesquisa.value.toUpperCase();
    let ul = document.getElementById("definicoes");
    let li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        let button = li[i].getElementsByTagName("button")[0];
        if (button.innerHTML.toUpperCase().indexOf(filtro) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

let paginas = []

function guardaPaginas() {
    let idPaginas = ["paginaLayout", "paginaTamanhoLetra", "paginaTema", "paginaVolumeSom"];
    let pags = []
    for (i = 0; i < idPaginas.length; i++) {
        pags.push(document.getElementById(idPaginas[i]));
    }
    return pags
}

let themeD = document.getElementById("tema"); 

// window.onload = function () {principal()};

setTimeout(principal, 500);


function principal(){
    console.log("PRINCIPAL")
    let tema = localStorage.getItem("tema");
    console.log("este é o tema: " + tema)
    // defineTema(tema); // SE COMENTARES ISSO +- FUNCIONA


    let paginaDefinicao = document.getElementById("paginaDefinicao");
    paginas = guardaPaginas();
    console.log(paginas)
    paginaDefinicao.innerHTML = "";
    paginaDefinicao.appendChild(paginas[0]);
}

function criaPagina(nomePagina) {
    let paginaDefinicao = document.getElementById("paginaDefinicao");
    let botoes = document.getElementsByClassName("botaoDefinicao");
    let definicao = document.getElementById("definicao");
    for (let i = 0; i < botoes.length; i++) {
        if (botoes[i].classList[1] == "selecionado") {
            botoes[i].classList.remove("selecionado");
        }
        if (botoes[i].innerHTML == nomePagina && botoes[i].classList.length == 1) {
            botoes[i].classList.add("selecionado");
            definicao.innerHTML = botoes[i].innerHTML;
            paginaDefinicao.innerHTML = "";
            console.log(paginas)
            paginaDefinicao.appendChild(paginas[i]);
        }
    }
}

function selecionaLayout(nomeLayout) {
    let layouts = document.getElementsByClassName("layoutLabel");
    for (let i = 0; i < layouts.length; i++) {
        if (layouts[i].classList[1] == "layoutSelecionado") {
            layouts[i].classList.remove("layoutSelecionado");
        }
    }
    let layoutSelecioando = document.getElementById(nomeLayout);
    layoutSelecioando.classList.add("layoutSelecionado");
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Legendas ////////////////////////////////////////////////////////////////////////////////////////
function mostraLegenda(n) {
    var popup = document.getElementById("l" + n);
    popup.classList.add("show");
}

function escondeLegenda(n) {
    var popup = document.getElementById("l" + n);
    popup.classList.remove("show");
}


function defineTema() {
    let tema = document.querySelector('input[name="formEscolheTema"]:checked').value;
    console.log(tema)

    if(tema == 'claro'){
        themeD.setAttribute('href', 'styles/temaClaro.css'); 
        localStorage.setItem("tema", "claro")
    }else { 
        themeD.setAttribute('href', 'styles/temaEscuro.css'); 
        localStorage.setItem("tema", "escuro")
    }
} 


