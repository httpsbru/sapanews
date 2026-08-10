const noticias = [
    {
        titulo:"E NÃO É QUE DEU NAMORO? 💍 ",
        texto: "Depois de todo mundo já saber, só faltava uma coisa: oficializar. No dia 1º de agosto de 2026, Bruna e Stefany oficializaram o relacionamento e começaram oficialmente a namorar. 💘 O que antes já era praticamente de conhecimento público agora ganhou status oficial: temos um casal.",
        imagem: "img/noticias/namoro.jpeg",
        categoria:""
    },   

    {
        titulo:"🚨 MAIS UM CASAL OFICIALIZADO ",
        texto: "Depois da famosa tour do vinho, parece que a história entre Lethícia e Juliana ganhou novos capítulos. As duas estão ficando e, ao que tudo indica, o envolvimento está ficando cada vez mais sério. 💕 Entre encontros, conversas e muito carinho, o que era apenas uma aproximação agora já tem nome: paixão. O Sapanews deseja que venha aí mais um casal para a nossa lista. 👀🍷",
        imagem: "img/noticias/namoro1.jpeg",
        categoria:""
    },

    {
        titulo:"🍷 TOUR DO VINHO TEM NOVOS DESDOBRAMENTOS",
        texto:"Depois dos acontecimentos da famosa tour do vinho, Lethícia e Juliana passaram de protagonistas de uma fofoca para duas sapas apaixonadas. 👀 As duas estão ficando e, segundo fontes, o sentimento já bateu forte. O que começou com vinho terminou em romance. Nunca subestimem o poder de uma taça. 🍷💘",
        imagem:"img/noticias/vinho.png",
        categoria:"🚨 EXCLUSIVO"
    },


];

let noticiaAtual = 0;

const imagem = document.getElementById("carousel-img");
const titulo = document.getElementById("carousel-title");
const texto = document.getElementById("carousel-text");
const categoria = document.getElementById("carousel-tag");

const dots = document.querySelectorAll(".dot");

function trocarNoticia(indice) {

    noticiaAtual = indice;

    imagem.src = noticias[indice].imagem;
    titulo.textContent = noticias[indice].titulo;
    texto.innerHTML = noticias[indice].texto;
    categoria.textContent = noticias[indice].categoria;

    dots.forEach(dot => dot.classList.remove("active"));

    dots[indice].classList.add("active");

}

dots.forEach((dot, indice) => {

    dot.addEventListener("click", () => {

        trocarNoticia(indice);

    });

});

setInterval(() => {

    noticiaAtual++;

    if (noticiaAtual >= noticias.length) {

        noticiaAtual = 0;

    }

    trocarNoticia(noticiaAtual);

}, 7000);

trocarNoticia(0);