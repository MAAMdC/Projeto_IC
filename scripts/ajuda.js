$(document).ready(function(){
  let tema = localStorage.getItem("tema");

  if( tema =='claro' ){
    document.querySelector(`#helpViewer1`).src = "img/angle-small-down.png";
    document.querySelector(`#helpViewer2`).src = "img/angle-small-down.png";
    document.querySelector(`#helpViewer3`).src = "img/angle-small-down.png";
    document.querySelector(`#helpViewer4`).src = "img/angle-small-down.png";
    document.querySelector(`#helpViewer5`).src = "img/angle-small-down.png";
    document.querySelector(`#helpViewer6`).src = "img/angle-small-down.png";
    document.querySelector(`#helpViewer7`).src = "img/angle-small-down.png";
  }else{
    document.querySelector(`#helpViewer1`).src = "img/angle-small-downbra.png";
    document.querySelector(`#helpViewer2`).src = "img/angle-small-downbra.png";
    document.querySelector(`#helpViewer3`).src = "img/angle-small-downbra.png";
    document.querySelector(`#helpViewer4`).src = "img/angle-small-downbra.png";
    document.querySelector(`#helpViewer5`).src = "img/angle-small-downbra.png";
    document.querySelector(`#helpViewer6`).src = "img/angle-small-downbra.png";
    document.querySelector(`#helpViewer7`).src = "img/angle-small-downbra.png";
  }


});

function toggleHelpSection(arg) {

  let dropdownContent = document.querySelector(`#dropdownContent${arg}`)
  let helpViewer = document.querySelector(`#helpViewer${arg}`)

  dropdownContent.classList.toggle("show");

  if (helpViewer.style.transform != "rotate(180deg)") {
      helpViewer.style.transform = "rotate(180deg)";
  }
  else {
      helpViewer.style.transform = "rotate(0deg)";
  }
      
}

