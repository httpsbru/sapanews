
// ======================================
// ROLÊS DA SAPACREW
// ======================================

const eventos = [

    {
        titulo: "Halloween do Sapacrew",
        data: "10 e 11 de outubro de 2026",
        horario: "18h",
        endereco: "Av. Itanhaém, 294 - Jardim Pinheirinho",
        imagem: "img/eventos/halloween/halloween-capa.png",
        descricao:
            "<strong>Preparem as fantasias, porque nos dias 10 e 11 de outubro teremos mais um evento oficial do Sapacrew!</strong> 🎃🕸️"+
            "<br><br>Uma noite para reunir a nossa galera, colocar o papo em dia, dar boas risadas, render algumas fofocas e, quem sabe, criar conteúdo suficiente para virar manchete no SapaNews. 👀📰<br><br>"+
            "<strong>📌 INFORMAÇÕES IMPORTANTES</strong><br><br>" +
            "💰 <strong>Valor estimado:</strong> R$ 50,00 por pessoa<br>" +
            "🥩 <strong>Cada pessoa deverá levar:</strong> 1kg de carne ou algo para assar<br>" +
            "🥤 <strong>Bebida:</strong> cada pessoa deverá levar a bebida que for consumir<br>" +
            "🏠 <strong>Hospedagem:</strong> a casa ficará liberada até às 18h do domingo, dia 11<br>" +
            "💳 <strong>Pagamento:</strong> deverá ser efetuado até o dia <strong>02/10</strong>.<br><br>" +

            "🎃 Preparem as fantasias e bora fazer desse Halloween mais um rolê inesquecível do Sapacrew! 🕷️🖤",
        mapa:
            "https://maps.app.goo.gl/Abvg4gsmLd86xc3t7"
    },

    {
        titulo: "Próximo rolê",
        data: "17 de outubro de 2026",
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
        data: "24 de outubro de 2026",
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
// MODAL DOS ROLÊS
// ======================================
//
// O modal dos rolês está atualmente
// comentado no HTML da Home.
//
// Por isso, só executamos esse código
// se os elementos realmente existirem.
// ======================================

const modalEvento =
    document.getElementById("modalEvento");

const fecharModalEvento =
    document.getElementById("fecharModal");

const eventoImagem =
    document.getElementById("eventoImagem");

const eventoTitulo =
    document.getElementById("eventoTitulo");

const eventoData =
    document.getElementById("eventoData");

const eventoHorario =
    document.getElementById("eventoHorario");

const eventoEndereco =
    document.getElementById("eventoEndereco");

const eventoDescricao =
    document.getElementById("eventoDescricao");

const eventoMapa =
    document.getElementById("eventoMapa");


/*
    Só executa o código dos rolês
    se o modal existir na página.
*/

if (
    modalEvento &&
    fecharModalEvento &&
    eventoImagem &&
    eventoTitulo &&
    eventoData &&
    eventoHorario &&
    eventoEndereco &&
    eventoDescricao &&
    eventoMapa
) {

    const cardsEventos =
        document.querySelectorAll(".evento-card");


    cardsEventos.forEach(card => {

        card.addEventListener("click", () => {

            const numeroEvento =
                card.dataset.evento;

            const evento =
                eventos[numeroEvento];

            if (!evento) return;


            // Preenche informações

            eventoImagem.src =
                evento.imagem;

            eventoImagem.alt =
                evento.titulo;

            eventoTitulo.textContent =
                evento.titulo;

            eventoData.textContent =
                evento.data;

            eventoHorario.textContent =
                evento.horario;

            eventoEndereco.textContent =
                evento.endereco;

            eventoDescricao.innerHTML =
                evento.descricao;


            // Google Maps

            if (evento.mapa === "#") {

                eventoMapa.style.display =
                    "none";

            } else {

                eventoMapa.href =
                    evento.mapa;

                eventoMapa.style.display =
                    "inline-flex";

            }


            // Abre modal

            modalEvento.classList.add("ativo");

            document.body.classList.add(
                "modal-aberto"
            );

        });

    });


    // Fechar

    fecharModalEvento.addEventListener(
        "click",
        () => {

            modalEvento.classList.remove(
                "ativo"
            );

            document.body.classList.remove(
                "modal-aberto"
            );

        }
    );


    // Fechar clicando fora

    modalEvento.addEventListener(
        "click",
        event => {

            if (
                event.target === modalEvento
            ) {

                modalEvento.classList.remove(
                    "ativo"
                );

                document.body.classList.remove(
                    "modal-aberto"
                );

            }

        }
    );

}


// =========================================
// MODAL ANIVERSÁRIO LETHICIA
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const cardAniversario =
            document.getElementById(
                "aniversarioLethicia"
            );

        const modalAniversario =
            document.getElementById(
                "modalAniversario"
            );

        const fecharAniversario =
            document.getElementById(
                "fecharAniversario"
            );


        // =================================
        // VERIFICA SE O HTML EXISTE
        // =================================

        if (
            !cardAniversario ||
            !modalAniversario ||
            !fecharAniversario
        ) {

            console.warn(
                "Modal da Lethicia: algum elemento não foi encontrado."
            );

            return;

        }


        // =================================
        // MODO TESTE
        // =================================
        //
        // TRUE  = funciona agora
        // FALSE = só funciona a partir de 01/10
        //

        const MODO_TESTE = false;


        // =================================
        // DATA DE ATIVAÇÃO
        // =================================

        const hoje = new Date();

        const anoAtual =
            hoje.getFullYear();

        // Outubro = 9 no JavaScript

        const dataAniversario =
            new Date(
                anoAtual,
                9,
                1
            );


        // =================================
        // VERIFICA SE ESTÁ ATIVO
        // =================================

        const aniversarioAtivo =
            MODO_TESTE ||
            hoje >= dataAniversario;


        // =================================
        // ABRIR
        // =================================

        function abrirAniversario() {

            modalAniversario.classList.add(
                "ativo"
            );

            modalAniversario.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "modal-aniversario-aberto"
            );

        }


        // =================================
        // FECHAR
        // =================================

        function fecharAniversarioModal() {

            modalAniversario.classList.remove(
                "ativo"
            );

            modalAniversario.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "modal-aniversario-aberto"
            );

        }


        // =================================
        // CARD
        // =================================

        if (aniversarioAtivo) {

            cardAniversario.style.cursor =
                "pointer";

            cardAniversario.addEventListener(
                "click",
                abrirAniversario
            );

        }


        // =================================
        // BOTÃO FECHAR
        // =================================

        fecharAniversario.addEventListener(
            "click",
            fecharAniversarioModal
        );


        // =================================
        // CLICAR FORA
        // =================================

        modalAniversario.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    modalAniversario
                ) {

                    fecharAniversarioModal();

                }

            }
        );


        // =================================
        // ESC
        // =================================

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    modalAniversario.classList.contains(
                        "ativo"
                    )
                ) {

                    fecharAniversarioModal();

                }

            }
        );


        // =================================
        // LOG DE TESTE
        // =================================

        console.log(
            "🎂 Modal Lethicia carregado!",
            {
                modoTeste: MODO_TESTE,
                ativo: aniversarioAtivo
            }
        );

    }
);

