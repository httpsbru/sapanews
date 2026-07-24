const noticias = [
    {
        titulo:"✈️ Delegação carioca desembarca em São Paulo.",
        texto: "Milly chega para alguns dias em São Paulo. A redação confirma movimentação intensa, expectativa para os rolês e aumento de risadas por metro quadrado.",
        imagem: "img/noticias/milly.jpg",
        categoria:"✈️ EDIÇÃO ESPECIAL"
    },   

    {
        titulo:"🔥 PLANTÃO: Integrante informa fuga de parceira amorosa.",
        texto: `
        <p>Na manhã desta sexta-feira (24), a redação recebeu a informação de que Lumara dos Santos estaria preparando uma fuga.</p>

        <p>Segundo a denúncia, o motivo teria sido um incêndio iniciado nas partes baixas do corpo da envolvida.</p>

        <p>Testemunhas afirmam que foi utilizada a técnica conhecida como "Beyblade humana" na tentativa de conter as chamas.</p>

        <p>Até o fechamento desta edição, a redação seguia acompanhando o caso.</p>
        `,        
        imagem:"img/noticias/incendio.jpeg",
        categoria:"🚨 PLANTÃO"
    },

    {
        titulo:"🍷 EXCLUSIVO: Exigência de vinho provoca crise diplomática entre Juliana e Lethícia.",
        texto:"Fontes da redação revelam que Juliana condicionou um encontro à presença de uma garrafa de vinho. O detalhe é que o pedido foi feito em um horário pouco favorável para a missão, levantando suspeitas de que a exigência teria sido uma estratégia para inviabilizar a visita. A investigação segue em andamento.",
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

}, 5000);

trocarNoticia(0);