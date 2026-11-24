const noticias = [

    
    {
        titulo: "AMIGO ALCOÓLICO JÁ TEM NOMES SORTEADOS! 🍻🚨",
        resumo: "O sorteio aconteceu! No dia 19 de dezembro, a comunidade vai se reunir para uma troca de presentes regada a cachaça, expectativas e possíveis decepções. 😂",
        texto: "ATENÇÃO, COMUNIDADE! 🍻 O tão aguardado Amigo Secreto de Cachaça já começou a movimentar os bastidores! O sorteio dos nomes aconteceu ontem e agora cada participante já tem uma missão: descobrir o presente ideal para seu sorteado sem entregar absolutamente nada. 👀 <br><br> O encontro está marcado para o dia 19 de dezembro e promete reunir presentes, bebidas, risadas e aquele nível de organização duvidoso que já conhecemos. 😂 <br><br> 🤫 Os nomes estão definidos, os planos estão em andamento e a única regra é não estragar a surpresa! <br><br> 🍾 Agora queremos saber: quem vai acertar no presente e quem vai protagonizar a maior decepção da noite?",
        
        imagem: "img/noticias/amigoalcoolico.png",
        categoria: "🍻 GIRO SAPACREW",
        carrossel: true
    },


    {
        titulo:"SOLTEIRA E MAIS CAÓTICA! 🚨💅",
        resumo: "A adm Jéssica Nobre está oficialmente solteira! E parece que a nova fase vem acompanhada de ainda mais potencial para causar. 👀",
        texto: "ALERTA NA COMUNIDADE! 🚨 Jéssica Nobre está oficialmente solteira! A administradora agora integra o time das solteiras e, considerando seu histórico de caos, a comunidade já começa a se perguntar o que vem por aí. 😂 <br><br> Se antes já tínhamos motivos para ficar de olho, agora a situação promete ganhar novos capítulos. Mais liberdade, novas possibilidades e, quem sabe, histórias que vão render boas fofocas no grupo. 🍿 <br><br> 💅 Uma coisa é certa: o status mudou, mas o potencial de caos continua intacto! <br><br> 👀 A comunidade está preparada para essa nova versão da Jéssica?",
        
        imagem:"img/noticias/nobre.jpeg",
        categoria:"🚨 EXCLUSIVO",
        carrossel: true
        
    },
    
    
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