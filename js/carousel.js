const noticias = [

     {
        titulo:"TEM VETERANA DE VOLTA! 🚨",
        resumo: "Depois de um período longe dos holofotes, uma das veteranas mais conhecidas do grupo está oficialmente de volta. 👀💅",
        texto: "Jady retornou ao grupo! E para quem já conhece a figura, sabe que essa volta pode significar uma coisa: movimentação. 😂 <br><br> Com um histórico de participação bastante ativa, a presença de Jady promete trazer de volta conversas, fofocas, opiniões e, quem sabe, aquele velho caos que a gente conhece tão bem. 🍿 <br><br> 👀 A pergunta que fica é: o grupo está preparado para o retorno dessa veterana?",
        imagem:"img/noticias/jady.jpeg",
        categoria:"🚨 EXCLUSIVO",
        carrossel: true
        
    },

    {
        titulo:"E NÃO É QUE DEU NAMORO? 💍 ",
        resumo: "Depois de todo mundo já saber, só faltava uma coisa: oficializar. Bruna e Stefany <br>finalmente começaram oficialmente a namorar. 💘",
        texto: `
            <p>Depois de todo mundo já saber, só faltava uma coisa: oficializar.</p>

            <p>No dia 1º de agosto de 2026, Bruna e Stefany oficializaram o relacionamento e começaram oficialmente a namorar. 💘</p>

            <p>O que antes já era praticamente de conhecimento público agora ganhou status oficial: temos um casal.</p>
        `,
        imagem: "img/noticias/namoro.jpeg",
        categoria:"💘 ROMANCE",

        carrossel: true
       

    },   

    {
        titulo:"🚨 MAIS UM CASAL OFICIALIZADO ",
        resumo: "E parece que o amor resolveu dar as caras por aqui. 👀 Nathalia e Ellen também oficializaram o relacionamento e começaram oficialmente a namorar. 💘",
        texto: "E parece que o amor resolveu dar as caras por aqui. 👀 No dia 8 de agosto de 2026, Nathalia e Ellen também oficializaram o relacionamento e começaram oficialmente a namorar. 💘 O Sapanews confirma: temos mais um casal oficialmente formado.",
        imagem: "img/noticias/namoro1.jpeg",
        categoria:"💘 ROMANCE",
        carrossel: true
    },

    {
        titulo: "A TRETA QUE O SAPANEWS NÃO CONSEGUIU DESENTERRAR 👀",

        resumo: "O retorno de veteranas trouxe de volta uma pergunta que ninguém parece disposto a responder: o que aconteceu antes da saída?",

        texto: `
            <p>O retorno de veteranas ao SapaCrew trouxe de volta uma pergunta que ninguém parece disposto a responder: <strong>o que aconteceu antes da saída?</strong></p>
            <p>Durante a recepção, integrantes perguntaram diretamente se havia rolado briga, baixaria ou algum conflito com pessoas que deixaram o grupo.</p>
            <p>A resposta foi ainda mais suspeita.</p>
            <p>Jady confirmou que a história era grande e admitiu que a situação chegou perto de uma verdadeira confusão.</p>
            <p>Outras integrantes ainda deram a entender que o pouco revelado até então seria apenas a ponta do iceberg.</p>
            <p>Quando as novatas começaram a pressionar por detalhes, veio o clássico:</p>
            <p><strong>“Passado é passado.”</strong></p>
            <p>O SapaNews continuará aguardando novas provas, depoimentos e, se possível, algum print perdido no histórico.</p>
            <p>Até o fechamento desta matéria, ninguém confirmou oficialmente quem brigou com quem.</p>
        `,

        imagem: "img/noticias/treta.jpeg",
        categoria: "👀 TRETA",
        carrossel: false
    },

    {
        titulo:"SAIU, VOLTOU E FINALMENTE FALOU! 🚨 Nath revela motivo por trás de seu afastamento do grupo ",
        resumo: "Nath finalmente revelou o motivo por trás de seu afastamento do grupo após ser colocada contra a parede durante o famoso Jogo da Discórdia. 👀",
        texto: `
            <p>O que começou como uma brincadeira do famoso <strong>“jogo da discórdia”</strong> acabou ficando sério.</p>
            <p>Durante a rodada de perguntas, Nath foi colocada contra a parede e questionada sobre um assunto que até então parecia não ter explicação: <strong>por que ela havia saído do grupo e depois retornado?</strong></p>
            <p>A resposta inicialmente veio acompanhada de resistência.</p>
            <p>Mas, depois da pressão das integrantes, Nath finalmente revelou que havia ficado <strong>chateada com algumas coisas que aconteceram</strong>.</p>
            <p>Apesar disso, fez questão de deixar claro que não guarda ódio das meninas e que continua gostando delas.</p>
            <p>A situação ficou ainda mais misteriosa quando Ellen Desoti complementou a resposta falando em <strong>“falta de reciprocidade de algumas pessoas”</strong>.</p>
            <p>Foi o suficiente para o grupo pedir mais detalhes.</p>
            <p>Mas, mais uma vez, o SapaCrew entregou apenas a versão <strong>“semi completa”</strong> da fofoca.</p>
        `,

        imagem: "img/noticias/nath-treta.jpg",
        categoria:"👀 TRETA",
        carrossel: false
    },

    {
        titulo:"📢 Comunicado oficial",
        resumo: "Boss deixa o cargo e entrega o comando às novas ADMs",
        texto: `
            <p>Após meses de serviços prestados à nação, a Boss anunciou sua saída do Sapacrew, deixando oficialmente o grupo sob o comando das novas ADMs. 👑</p>
            <p>A transição de poder aconteceu e, aparentemente, não houve golpe, votação ou impeachment — apenas a Boss metendo o pé e deixando a responsabilidade nas mãos de quem ficou. KKKKKKK</p>
            <p>As novas administradoras assumem agora a missão de manter a ordem, controlar as fofocas, administrar os surtos e, principalmente, impedir que esse grupo vire uma terra sem lei. 🫡</p>
            
        `,

        imagem: "img/noticias/saida-boss.png",
        categoria:"👀 TRETA",
        carrossel: true
    }




];


// =========================================
// APENAS NOTÍCIAS DO CARROSSEL
// =========================================

const noticiasCarrossel = noticias.filter(
    noticia => noticia.carrossel !== false
);

let noticiaAtual = 0;

const imagem = document.getElementById("carousel-img");
const titulo = document.getElementById("carousel-title");
const texto = document.getElementById("carousel-text");
const categoria = document.getElementById("carousel-tag");

const dots = document.querySelectorAll(".dot");

function trocarNoticia(indice) {

    noticiaAtual = indice;

    imagem.src = noticiasCarrossel[indice].imagem;

    titulo.textContent = noticiasCarrossel[indice].titulo;

    texto.innerHTML = noticiasCarrossel[indice].resumo;

    categoria.textContent = noticiasCarrossel[indice].categoria;


    dots.forEach(dot => dot.classList.remove("active"));


    if (dots[indice]) {

        dots[indice].classList.add("active");

    }

}

dots.forEach((dot, indice) => {

    dot.addEventListener("click", () => {

        trocarNoticia(indice);

    });

});

setInterval(() => {

    noticiaAtual++;

    if (noticiaAtual >= noticiasCarrossel.length) {

        noticiaAtual = 0;

    }

    trocarNoticia(noticiaAtual);

}, 7000);

trocarNoticia(0);