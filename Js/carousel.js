const noticias = [
    {
        titulo: "💔 Oficializado! Lethicia pede término do trisal.",
        texto: "Segundo fontes extremamente confiáveis da redação da Sapacrew, Lethicia afirmou que não aguenta mais ser a marmita oficial do relacionamento.",
        imagem: "img/noticias/lethicia.jpeg",
        categoria: "🚨 EXCLUSIVO"
    },

    {
        titulo: "👠 Absurdo! Júlia Viana é obrigada a usar salto alto na empresa.",
        texto: "A redação recebeu denúncias de que a colaboradora precisará enfrentar a jornada de trabalho utilizando salto alto. Especialistas classificaram o caso como 'desumano'.",
        imagem: "img/noticias/julia.jpeg",
        categoria: "😱 ABSURDO"
    },

    {
        titulo: "❤️ Taís consegue finalmente sua aprovação para seu relacionamento de 1 mês.",
        texto: "Após um rigoroso período de avaliação da Sapacrew, o namoro foi oficialmente aprovado pelas integrantes do grupo.",
        imagem: "img/noticias/tais.jpg",
        categoria: "🎉 FELICIDADES",
        posicao: "center 15%"
    }
];

let noticiaAtual = 0;

const imagem = document.getElementById("carousel-img");
const titulo = document.getElementById("carousel-title");
const texto = document.getElementById("carousel-text");
const categoria = document.getElementById("carousel-tag");

const dots = document.querySelectorAll(".dot");

function trocarNoticia(indice){

    noticiaAtual = indice;

    imagem.src = noticias[indice].imagem;
    titulo.textContent = noticias[indice].titulo;
    texto.textContent = noticias[indice].texto;
    categoria.textContent = noticias[indice].categoria;

    dots.forEach(dot => dot.classList.remove("active"));

    dots[indice].classList.add("active");

}

dots.forEach((dot, indice)=>{

    dot.addEventListener("click", ()=>{

        trocarNoticia(indice);

    });

});

setInterval(()=>{

    noticiaAtual++;

    if(noticiaAtual >= noticias.length){

        noticiaAtual = 0;

    }

    trocarNoticia(noticiaAtual);

},5000);