const botao = document.getElementById("menuMobile");

const menu = document.getElementById("menuLista");

if(botao){

    botao.addEventListener("click",()=>{

        menu.classList.toggle("ativo");

    });

}