// ======================================
// ROLÊS DA SAPACREW
// ======================================

const eventos = [

    {
        titulo: "Fakku Bar",

        data: "29 de agosto de 2026",

        horario: "18h",

        endereco: "R. Dr. Cesário Mota Júnior, 629 - Vila Buarque",

        imagem: "img/roles/FAKKU-BAR.png",

        descricao:
            "Mais um rolê do Sapacrew! 🍺 Preparem-se para uma noite de conversa, fofoca e provavelmente algum acontecimento que vai parar no SapaNews.",

        mapa:
            "https://maps.app.goo.gl/vp2PRxLcq7nrtCcY7"
    },

    {
        titulo: "Próximo rolê",

        data: "05 de setembro de 2026",

        horario: "18h",

        endereco: "Local ainda não definido",

        imagem: "img/roles/pendente.jpg",

        descricao:
            "O próximo rolê ainda está sendo definido. Assim que tivermos local e mais informações, a redação atualiza tudo por aqui. 👀",

        mapa:
            "#"
    },

    {
        titulo: "Próximo rolê",

        data: "11 de setembro de 2026",

        horario: "19h",

        endereco: "Local ainda não definido",

        imagem: "img/roles/pendente.jpg",

        descricao:
            "Ainda estamos aguardando informações sobre esse rolê. Em breve teremos novidades!",

        mapa:
            "#"
    }

];


// ======================================
// ELEMENTOS DO MODAL
// ======================================

const modalEvento = document.getElementById("modalEvento");

const fecharModal = document.getElementById("fecharModal");

const eventoImagem = document.getElementById("eventoImagem");

const eventoTitulo = document.getElementById("eventoTitulo");

const eventoData = document.getElementById("eventoData");

const eventoHorario = document.getElementById("eventoHorario");

const eventoEndereco = document.getElementById("eventoEndereco");

const eventoDescricao = document.getElementById("eventoDescricao");

const eventoMapa = document.getElementById("eventoMapa");


// ======================================
// ABRIR MODAL
// ======================================

const cardsEventos = document.querySelectorAll(".evento-card");

cardsEventos.forEach(card => {

    card.addEventListener("click", () => {

        const numeroEvento = card.dataset.evento;

        const evento = eventos[numeroEvento];

        if (!evento) return;


        // Preenche as informações

        eventoImagem.src = evento.imagem;

        eventoImagem.alt = evento.titulo;

        eventoTitulo.textContent = evento.titulo;

        eventoData.textContent = evento.data;

        eventoHorario.textContent = evento.horario;

        eventoEndereco.textContent = evento.endereco;

        eventoDescricao.textContent = evento.descricao;


        // Google Maps

        if (evento.mapa === "#") {

            eventoMapa.style.display = "none";

        } else {

            eventoMapa.href = evento.mapa;

            eventoMapa.style.display = "inline-flex";

        }


        // Abre o modal

        modalEvento.classList.add("ativo");

        document.body.classList.add("modal-aberto");

    });

});


// ======================================
// FECHAR MODAL
// ======================================

fecharModal.addEventListener("click", fecharEvento);


function fecharEvento() {

    modalEvento.classList.remove("ativo");

    document.body.classList.remove("modal-aberto");

}


// ======================================
// FECHAR CLICANDO FORA
// ======================================

modalEvento.addEventListener("click", (event) => {

    if (event.target === modalEvento) {

        fecharEvento();

    }

});


// ======================================
// FECHAR COM ESC
// ======================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        fecharEvento();

    }

});