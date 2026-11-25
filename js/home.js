
// ======================================
// ROLÊS DA SAPACREW
// ======================================

const eventos = [


    {
        titulo: "Próximo rolê",
        data: "05 de dezembro de 2026",
        horario: "18h",
        endereco: "pendente",
        imagem: "#",
        descricao:
            "loading..."+

                "<br><br>Ainda estamos aguardando informações sobre esse rolê. Em breve teremos novidades!" +

                "<br><br>...",

        mapa:
            "#"
    },

    {
        titulo: "Próximo rolê",
        data: "12 de dezembro de 2026",
        horario: "18h",
        endereco: "Local ainda não definido",
        imagem: "#",
        descricao:
            "Ainda estamos aguardando informações sobre esse rolê. Em breve teremos novidades!",
        mapa:
            "#"
    },

    {
        titulo: "Próximo rolê",
        data: "19 de dezembro de 2026",
        horario: "18h",
        endereco: "Rua Souza Lima, 81 Barra Funda",
        imagem: "img/eventos/amigo-alcoolico/amigo-capa.png",
        descricao:
            "Dia 19 de dezembro temos encontro marcado no Bar Bandeira Bandeira para o nosso tão aguardado Amigo Alcoólico! 🎁"+
            "<br><br>Os nomes já foram sorteados, os destinos já estão traçados e agora só falta reunir as divas para uma noite de presentes, brindes, risadas e histórias que provavelmente não poderão ser contadas no dia seguinte. 😂"+
            "<br><br>Preparem os presentes e o espírito de confraternização, porque esse role promete",
        mapa:
            "https://maps.app.goo.gl/qrVQFFah4RP4RQH7A"
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

