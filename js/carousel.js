const noticias = [

     {
        titulo:"TEM VETERANA DE VOLTA! 🚨",
        texto:"Depois de um período longe dos holofotes, uma das veteranas mais conhecidas do grupo está oficialmente de volta. 👀💅 <br><br> Jady retornou ao grupo! E para quem já conhece a figura, sabe que essa volta pode significar uma coisa: movimentação. 😂 <br><br> Com um histórico de participação bastante ativa, a presença de Jady promete trazer de volta conversas, fofocas, opiniões e, quem sabe, aquele velho caos que a gente conhece tão bem. 🍿 <br><br> 👀 A pergunta que fica é: o grupo está preparado para o retorno dessa veterana?",
        imagem:"img/noticias/jady.jpeg",
        categoria:"🚨 EXCLUSIVO"
    },

    {
        titulo:"E NÃO É QUE DEU NAMORO? 💍 ",
        texto: "Depois de todo mundo já saber, só faltava uma coisa: oficializar. No dia 1º de agosto de 2026, Bruna e Stefany oficializaram o relacionamento e começaram oficialmente a namorar. 💘 O que antes já era praticamente de conhecimento público agora ganhou status oficial: temos um casal.",
        imagem: "img/noticias/namoro.jpeg",
        categoria:""
    },   

    {
        titulo:"🚨 MAIS UM CASAL OFICIALIZADO ",
        texto: "E parece que o amor resolveu dar as caras por aqui. 👀 No dia 8 de agosto de 2026, Nathalia e Ellen também oficializaram o relacionamento e começaram oficialmente a namorar. 💘 O Sapanews confirma: temos mais um casal oficialmente formado.",
        imagem: "img/noticias/namoro1.jpeg",
        categoria:""
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