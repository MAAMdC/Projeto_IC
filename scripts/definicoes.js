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
    // let idPaginas = ["paginaConta", "paginaLayout", "paginaLixo", "paginaTamanhoLetra", "paginaTema", "paginaVolumeSom"];
    let idPaginas = ["paginaLixo", "paginaLayout", "paginaTamanhoLetra", "paginaTema"];
    let paginas = []
    for (i = 0; i < idPaginas.length; i++) {
        paginas.push(document.getElementById(idPaginas[i]));
    }
    return paginas
}

let theme = document.getElementById("tema"); 

window.onload = function () {
    let tema = localStorage.getItem("tema");
    defineTema(tema);

    let paginaDefinicao = document.getElementById("paginaDefinicao");
    paginas = guardaPaginas();
    paginaDefinicao.innerHTML = "";
    paginaDefinicao.appendChild(paginas[0]);
}

function criaPagina(nomePagina) {
    let paginaDefinicao = document.getElementById("paginaDefinicao");
    let botoes = document.getElementsByClassName("botaoDefinicao");
    let definicao = document.getElementById("definicao");
    for (i = 0; i < botoes.length; i++) {
        if (botoes[i].classList[1] == "selecionado") {
            botoes[i].classList.remove("selecionado");
        }
        if (botoes[i].innerHTML == nomePagina && botoes[i].classList.length == 1) {
            botoes[i].classList.add("selecionado");
            definicao.innerHTML = botoes[i].innerHTML;
            paginaDefinicao.innerHTML = "";
            paginaDefinicao.appendChild(paginas[i]);
        }
    }
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


function defineTema(tema) { 

    if(tema == 'claro'){
        themeC.setAttribute('href', 'styles/temaClaro.css'); 
        localStorage.setItem("tema", "claro")

        $('#lightMode').prop("checked", "checked")
        $('#darkMode').prop("checked", "")
        // $('#darkMode').setAttribute("checked", "checked");
    }else { 
        themeC.setAttribute('href', 'styles/temaEscuro.css'); 
        localStorage.setItem("tema", "escuro")

        $('#darkMode').prop("checked", "checked")
        $('#lightMode').prop("checked", "")
    } 
    console.log(themeC);
} 


// function defineTema() {
//     let tema = document.querySelector('input[name="formEscolheTema"]:checked').value;
//     console.log(tema)

//     if(tema == 'claro'){
//         theme.setAttribute('href', 'styles/temaClaro.css'); 
//         localStorage.setItem("tema", "claro")
//     }else { 
//         theme.setAttribute('href', 'styles/temaEscuro.css'); 
//         localStorage.setItem("tema", "escuro")
//     }
// } 


