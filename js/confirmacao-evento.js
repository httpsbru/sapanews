import {
    collection,
    doc,
    setDoc,
    getDocs,
    getDoc,
    query,
    where,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    signInAnonymously
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    db,
    auth
} from "./firebase.js";


/* ======================================
   CONFIGURAÇÃO DO EVENTO
====================================== */

const eventoId = "halloween-2026";

const dataFimEvento =
    new Date("2026-10-12T00:00:00-03:00");


/* ======================================
   USUÁRIO ATUAL
====================================== */

let usuarioAtual = null;


/* ======================================
   ELEMENTOS DA PÁGINA
====================================== */

const modal =
    document.getElementById("modalConfirmacao");

const abrir =
    document.getElementById("abrirConfirmacao");

const fechar =
    document.getElementById("fecharConfirmacao");

const form =
    document.getElementById("formConfirmacao");

const nomeInput =
    document.getElementById("nomePresenca");

const contador =
    document.getElementById("contadorPresenca");

const mensagem =
    document.getElementById("mensagemConfirmacao");

const botaoEnviar =
    document.getElementById("botaoEnviar");

const acoesConfirmacao =
    document.getElementById("acoesConfirmacao");

const botaoAlterarNome =
    document.getElementById("botaoAlterarNome");

const botaoCancelarPresenca =
    document.getElementById("botaoCancelarPresenca");

const blocoConfirmacao =
    document.querySelector(".confirmacao-evento");

const blocoPosEvento =
    document.getElementById("posEvento");

const blocoGaleria =
    document.querySelector(".fotos-evento");

const listaConfirmadas =
    document.getElementById("listaConfirmadas");


/* ======================================
   REFERÊNCIA DAS CONFIRMAÇÕES
====================================== */

function obterColecaoConfirmacoes() {

    return collection(
        db,
        "eventos",
        eventoId,
        "confirmacoes"
    );

}


/* ======================================
   VERIFICAR SE O EVENTO JÁ ACONTECEU
====================================== */

function eventoJaAconteceu() {

    return new Date() >= dataFimEvento;

}


/* ======================================
   OBTER USUÁRIO ANÔNIMO
====================================== */

async function obterUsuario() {

    if (usuarioAtual) {

        return usuarioAtual;

    }

    const usuario =
        await signInAnonymously(auth);

    usuarioAtual =
        usuario.user;

    return usuarioAtual;

}


/* ======================================
   REFERÊNCIA DA CONFIRMAÇÃO DO USUÁRIO
====================================== */

async function obterReferenciaUsuario() {

    const usuario =
        await obterUsuario();

    return doc(
        db,
        "eventos",
        eventoId,
        "confirmacoes",
        usuario.uid
    );

}


/* ======================================
   ALTERAR ESTADO DA PÁGINA
====================================== */

function atualizarEstadoPagina() {

    const encerrado =
        eventoJaAconteceu();


    /* ANTES DO EVENTO */

    if (!encerrado) {

        if (blocoConfirmacao) {

            blocoConfirmacao.style.display =
                "block";

        }

        if (blocoPosEvento) {

            blocoPosEvento.style.display =
                "none";

        }

        if (blocoGaleria) {

            blocoGaleria.style.display =
                "none";

        }

        return;

    }


    /* DEPOIS DO EVENTO */

    if (blocoConfirmacao) {

        blocoConfirmacao.style.display =
            "none";

    }

    if (blocoPosEvento) {

        blocoPosEvento.style.display =
            "block";

    }

    if (blocoGaleria) {

        blocoGaleria.style.display =
            "block";

    }

}


/* ======================================
   RESETAR MODAL
====================================== */

function resetarModal() {

    nomeInput.disabled = false;

    nomeInput.value = "";

    mensagem.textContent = "";

    botaoEnviar.style.display =
        "block";

    acoesConfirmacao.style.display =
        "none";

}


/* ======================================
   MOSTRAR USUÁRIO JÁ CONFIRMADO
====================================== */

function mostrarConfirmacaoExistente(nome) {

    nomeInput.value =
        nome;

    nomeInput.disabled = true;

    botaoEnviar.style.display =
        "none";

    acoesConfirmacao.style.display =
        "flex";

    mensagem.textContent =
        "🎃 Você já está na lista!";


}


/* ======================================
   ABRIR MODAL
====================================== */

if (abrir) {

    abrir.addEventListener(
        "click",
        async () => {

            if (eventoJaAconteceu()) {

                return;

            }

            resetarModal();

            modal.classList.add("ativo");

            nomeInput.focus();


            try {

                const referencia =
                    await obterReferenciaUsuario();

                const documento =
                    await getDoc(referencia);


                if (documento.exists()) {

                    const dados =
                        documento.data();


                    if (
                        dados.resposta === "sim" &&
                        dados.nome
                    ) {

                        mostrarConfirmacaoExistente(
                            dados.nome
                        );

                    }

                }

            }

            catch (error) {

                console.error(
                    "Erro ao verificar confirmação:",
                    error
                );

            }

        }
    );

}


/* ======================================
   FECHAR MODAL
====================================== */

if (fechar) {

    fechar.addEventListener(
        "click",
        () => {

            modal.classList.remove("ativo");

        }
    );

}


if (modal) {

    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {

                modal.classList.remove("ativo");

            }

        }
    );

}


/* ======================================
   FECHAR COM ESC
====================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            if (
                modal &&
                modal.classList.contains("ativo")
            ) {

                modal.classList.remove("ativo");

            }

        }

    }
);


/* ======================================
   CARREGAR CONTADOR
====================================== */

async function carregarConfirmacoes() {

    try {

        const referencia =
            obterColecaoConfirmacoes();

        const consulta =
            query(
                referencia,
                where(
                    "resposta",
                    "==",
                    "sim"
                )
            );

        const resultado =
            await getDocs(consulta);


        if (contador) {

            contador.textContent =
                resultado.size;

        }

    }

    catch (error) {

        console.error(
            "Erro ao carregar confirmações:",
            error
        );

        if (contador) {

            contador.textContent =
                "—";

        }

    }

}


/* ======================================
   CARREGAR LISTA DE CONFIRMADAS
====================================== */

async function carregarListaConfirmadas() {

    if (!listaConfirmadas) {

        return;

    }


    try {

        listaConfirmadas.innerHTML =
            "<p>Carregando lista...</p>";


        const referencia =
            obterColecaoConfirmacoes();


        const consulta =
            query(
                referencia,
                where(
                    "resposta",
                    "==",
                    "sim"
                )
            );


        const resultado =
            await getDocs(consulta);


        listaConfirmadas.innerHTML =
            "";


        if (resultado.empty) {

            listaConfirmadas.innerHTML =
                "<p>Ninguém confirmou ainda. Seja a primeira! 🎃</p>";

            return;

        }


        resultado.forEach(
            (documento) => {

                const dados =
                    documento.data();


                if (!dados.nome) {

                    return;

                }


                const item =
                    document.createElement("div");

                item.className =
                    "pessoa-confirmada";


                const emoji =
                    document.createElement("span");

                emoji.textContent =
                    "🎃";


                const nome =
                    document.createElement("span");

                nome.textContent =
                    dados.nome;


                item.appendChild(emoji);

                item.appendChild(nome);


                listaConfirmadas.appendChild(
                    item
                );

            }
        );

    }

    catch (error) {

        console.error(
            "Erro ao carregar lista:",
            error
        );


        listaConfirmadas.innerHTML =
            "<p>Não foi possível carregar a lista.</p>";

    }

}


/* ======================================
   CONFIRMAR / ALTERAR NOME
====================================== */

if (form) {

    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            if (eventoJaAconteceu()) {

                mensagem.textContent =
                    "As confirmações para esse evento já foram encerradas.";

                return;

            }


            const nome =
                nomeInput.value.trim();


            if (nome.length < 2) {

                mensagem.textContent =
                    "Digite seu nome para continuar.";

                nomeInput.focus();

                return;

            }


            try {

                botaoEnviar.disabled =
                    true;

                botaoEnviar.textContent =
                    "CONFIRMANDO...";


                const referencia =
                    await obterReferenciaUsuario();


                const documento =
                    await getDoc(referencia);


                const dadosExistentes =
                    documento.exists()
                        ? documento.data()
                        : null;


                await setDoc(
                    referencia,
                    {

                        nome: nome,

                        resposta: "sim",

                        criadoEm:
                            dadosExistentes?.criadoEm
                                || serverTimestamp(),

                        atualizadoEm:
                            serverTimestamp()

                    },
                    {
                        merge: true
                    }
                );


                mensagem.textContent =
                    dadosExistentes?.resposta === "nao"
                        ? "🎃 Presença confirmada novamente!"
                        : dadosExistentes
                            ? "🎃 Nome alterado com sucesso!"
                            : "🎃 Presença confirmada! Te esperamos lá!";


                await carregarConfirmacoes();

                await carregarListaConfirmadas();


                nomeInput.disabled =
                    true;

                botaoEnviar.style.display =
                    "none";

                acoesConfirmacao.style.display =
                    "flex";


                setTimeout(
                    () => {

                        modal.classList.remove(
                            "ativo"
                        );

                        resetarModal();

                    },
                    3000
                );

            }

            catch (error) {

                console.error(
                    "Erro ao confirmar presença:",
                    error
                );


                mensagem.textContent =
                    "Não foi possível confirmar agora. Tente novamente.";

            }

            finally {

                botaoEnviar.disabled =
                    false;

                botaoEnviar.textContent =
                    "🎃 CONFIRMAR PRESENÇA";

            }

        }
    );

}


/* ======================================
   ALTERAR NOME
====================================== */

if (botaoAlterarNome) {

    botaoAlterarNome.addEventListener(
        "click",
        () => {

            nomeInput.disabled =
                false;

            nomeInput.focus();

            botaoEnviar.style.display =
                "block";

            acoesConfirmacao.style.display =
                "none";

            mensagem.textContent =
                "✏️ Altere seu nome e salve.";

        }
    );

}


/* ======================================
   CANCELAR PRESENÇA
====================================== */

if (botaoCancelarPresenca) {

    botaoCancelarPresenca.addEventListener(
        "click",
        async () => {

            const confirmar =
                confirm(
                    "Tem certeza que deseja cancelar sua presença?"
                );


            if (!confirmar) {

                return;

            }


            try {

                botaoCancelarPresenca.disabled =
                    true;

                botaoCancelarPresenca.textContent =
                    "CANCELANDO...";


                const referencia =
                    await obterReferenciaUsuario();


                await setDoc(
                    referencia,
                    {

                        resposta: "nao",

                        atualizadoEm:
                            serverTimestamp()

                    },
                    {
                        merge: true
                    }
                );


                mensagem.textContent =
                    "Sua presença foi cancelada. 😢";


                await carregarConfirmacoes();

                await carregarListaConfirmadas();


                nomeInput.value = "";

                nomeInput.disabled =
                    false;

                botaoEnviar.style.display =
                    "block";

                acoesConfirmacao.style.display =
                    "none";


            }

            catch (error) {

                console.error(
                    "Erro ao cancelar presença:",
                    error
                );


                mensagem.textContent =
                    "Não foi possível cancelar agora. Tente novamente.";

            }

            finally {

                botaoCancelarPresenca.disabled =
                    false;

                botaoCancelarPresenca.textContent =
                    "❌ CANCELAR PRESENÇA";

            }

        }
    );

}


/* ======================================
   INICIALIZAÇÃO
====================================== */

atualizarEstadoPagina();

carregarConfirmacoes();

carregarListaConfirmadas();