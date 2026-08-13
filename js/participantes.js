
import {
    collection,
    getDocs,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { db } from "./firebase.js";

// ==========================================
// ELEMENTOS
// ==========================================

const listaParticipantes =
    document.getElementById("listaParticipantes");

const contadorParticipantes =
    document.getElementById("contadorParticipantes");

// ==========================================
// CORREIO DA SAPACREW
// ==========================================

const formRecado =
    document.getElementById("formRecado");

const destinatariaRecado =
    document.getElementById("destinatariaRecado");

const mensagemRecado =
    document.getElementById("mensagemRecado");

const contadorMensagemRecado =
    document.getElementById(
        "contadorMensagemRecado"
    );

const nomeRemetenteBox =
    document.getElementById(
        "nomeRemetenteBox"
    );

const nomeRemetente =
    document.getElementById(
        "nomeRemetente"
    );

const botaoEnviarRecado =
    document.getElementById(
        "botaoEnviarRecado"
    );

const textoBotaoRecado =
    document.getElementById(
        "textoBotaoRecado"
    );

const mensagemErroRecado =
    document.getElementById(
        "mensagemErroRecado"
    );

const mensagemSucessoRecado =
    document.getElementById(
        "mensagemSucessoRecado"
    );


// ==========================================
// PROTEÇÃO CONTRA HTML INJETADO
// ==========================================

function escaparHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent =
        texto;

    return div.innerHTML;
}

// ==========================================
// CONTADOR DO RECADO
// ==========================================

mensagemRecado.addEventListener("input", () => {

    contadorMensagemRecado.textContent =
        mensagemRecado.value.length;

});

// ==========================================
// IDENTIFICAÇÃO DO REMETENTE
// ==========================================

const opcoesIdentificacao =
    document.querySelectorAll(
        'input[name="identificacaoRecado"]'
    );

opcoesIdentificacao.forEach(opcao => {

    opcao.addEventListener("change", () => {

        if (
            opcao.value === "identificada" &&
            opcao.checked
        ) {

            nomeRemetenteBox.hidden =
                false;

        }

        else if (
            opcao.value === "anonimo" &&
            opcao.checked
        ) {

            nomeRemetenteBox.hidden =
                true;

            nomeRemetente.value = "";

        }

    });

});

let participantes = [];
let recados = [];

// ==========================================
// CARREGAR RECADOS
// ==========================================

async function carregarRecados() {

    try {

        const referencia =
            collection(db, "recados");

        const snapshot =
            await getDocs(referencia);

        recados = [];

        snapshot.forEach(documento => {

            recados.push({

                id: documento.id,

                ...documento.data()

            });

        });

        console.log(
            "Recados carregados:",
            recados
        );

    } catch (erro) {

        console.error(
            "Erro ao carregar recados:",
            erro
        );

    }

}

// ==========================================
// ABRIR RECADOS
// ==========================================

function abrirRecados(
    participante,
    recadosDaParticipante
) {

    const modalExistente =
        document.getElementById("modalRecados");

    if (modalExistente) {

        modalExistente.remove();

    }


    const modal =
        document.createElement("div");

    modal.id =
        "modalRecados";

    modal.className =
        "modal-recados";


    let conteudoRecados = "";


    if (
        recadosDaParticipante.length === 0
    ) {

        conteudoRecados = `

            <div class="sem-recados-mensagem">

                <span>💌</span>

                <p>
                    Essa integrante ainda não recebeu
                    nenhum recadinho.
                </p>

            </div>

        `;

    } else {

        conteudoRecados =
            recadosDaParticipante
                .map(recado => {

                    const remetente =
                        recado.anonimo
                            ? "Anônimo"
                            : (
                                recado.remetenteNome ||
                                "Integrante"
                            );

                    return `

                        <article class="recado-card">

                            <p class="recado-mensagem">

                                ${escaparHTML(
                                    recado.mensagem ||
                                    ""
                                )}

                            </p>

                            <div class="recado-remetente">

                                — ${escaparHTML(remetente)}

                            </div>

                        </article>

                    `;

                })
                .join("");

    }


    modal.innerHTML = `

        <div class="modal-recados-conteudo">

            <button
                type="button"
                class="fechar-modal-recados"
                aria-label="Fechar"
            >
                ×
            </button>

            <div class="modal-recados-titulo">

                <span>💌</span>

                <div>

                    <h2>
                        Correio da Sapacrew
                    </h2>

                    <p>
                        Recados para
                        <strong>
                            ${escaparHTML(
                                participante.nome ||
                                "Integrante"
                            )}
                        </strong>
                    </p>

                </div>

            </div>

            <div class="lista-recados-modal">

                ${conteudoRecados}

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    const fechar =
        modal.querySelector(
            ".fechar-modal-recados"
        );


    fechar.addEventListener(
        "click",
        () => {

            modal.remove();

        }
    );


    modal.addEventListener(
        "click",
        evento => {

            if (
                evento.target === modal
            ) {

                modal.remove();

            }

        }
    );

}
// ==========================================
// CARREGAR PARTICIPANTES
// ==========================================

async function carregarParticipantes() {

    try {

        const referencia =
            collection(db, "participantes");

        const snapshot =
            await getDocs(referencia);


        // ======================================
        // LIMPA A LISTA
        // ======================================

        listaParticipantes.innerHTML = "";


        // ======================================
        // NENHUMA PARTICIPANTE
        // ======================================

        if (snapshot.empty) {

            listaParticipantes.innerHTML = `

                <div class="estado-participantes">

                    <span>👀</span>

                    <p>
                        Ainda não temos integrantes cadastradas.
                    </p>

                    <p>
                        A redação está esperando as protagonistas.
                        💅
                    </p>

                </div>

            `;

            contadorParticipantes.textContent =
                "0 integrantes";

            return;
        }


        // ======================================
        // CONTADOR
        // ======================================

        const quantidade =
            snapshot.size;

        contadorParticipantes.textContent =
            quantidade === 1
                ? "1 integrante"
                : `${quantidade} integrantes`;


        // ======================================
        // CONVERTE OS DOCUMENTOS
        // ======================================
        
        snapshot.forEach(documento => {

            participantes.push({

                id: documento.id,

                ...documento.data()

            });

        });


        // ======================================
        // ORDENA POR NOME
        // ======================================

        participantes.sort((a, b) => {

            return (a.nome || "").localeCompare(
                b.nome || "",
                "pt-BR"
            );

        });

        // ======================================
        // PREENCHE O CORREIO DA SAPACREW
        // ======================================

        destinatariaRecado.innerHTML = `
            <option value="">
                Escolha uma integrante...
            </option>
        `;

        participantes.forEach(participante => {

            const option =
                document.createElement("option");

            option.value =
                participante.id;

            option.textContent =
                participante.nome || "Sem nome";

            destinatariaRecado.appendChild(option);

        });


        // ======================================
        // CRIA OS CARDS
        // ======================================

        participantes.forEach(participante => {

            const card =
                document.createElement("article");

            card.className =
                "participante-card";

        // ======================================
        // RECADOS RECEBIDOS
        // ======================================

        const recadosDaParticipante =
            recados.filter(
                recado =>
                    recado.destinatariaId === participante.id
            );

        const quantidadeRecados =
            recadosDaParticipante.length;


        /* ======================================
               FOTO
         ====================================== */

        const foto = participante.fotoUrl
                ? `
        <img
            src="${escaparHTML(participante.fotoUrl)}"
            alt="Foto de ${escaparHTML(participante.nome || "integrante")}"
            class="participante-foto"
        >
      `
                : `
        <div class="participante-icone">
            💖
        </div>
      `;


        /* ======================================
           STATUS DE RELACIONAMENTO
        ====================================== */
        let relacionamentoTexto = "";

            const status = participante.statusRelacionamento;

            if (status === "solteira") {

                relacionamentoTexto = "💔 Solteira";

            }

            else if (status === "ficando") {

                if (participante.parceiraNome) {

                    relacionamentoTexto =
                        `💘 Ficando com ${escaparHTML(participante.parceiraNome)}`;

                } else {

                    relacionamentoTexto = "💘 Ficando";

                }

            }

            else if (status === "namorando") {

                if (participante.parceiraNome) {

                    relacionamentoTexto =
                        `💕 Namorando com ${escaparHTML(participante.parceiraNome)}`;

                } else {

                    relacionamentoTexto = "💕 Namorando";

                }

            }

            else if (status === "casada") {

                if (participante.parceiraNome) {

                    relacionamentoTexto =
                        `💍 Casada com ${escaparHTML(participante.parceiraNome)}`;

                } else {

                    relacionamentoTexto = "💍 Casada";

                }

            }

            else if (status === "abandonada") {

                relacionamentoTexto =
                    "🥲 Abandonada";

            }

            else if (status === "complicado") {

                relacionamentoTexto =
                    "🤡 É complicado";

            }

            // ======================================
            // BOTÃO DE RECADOS
            // ======================================

            const areaRecados =
                document.createElement("div");

            areaRecados.className =
                "area-recados";

            if (quantidadeRecados > 0) {

                areaRecados.innerHTML = `

                    <button
                        type="button"
                        class="botao-ver-recados"
                    >

                        💌 Ver recados

                        <span class="notificacao-recados">
                            ${quantidadeRecados}
                        </span>

                    </button>

                `;

            } else {

                areaRecados.innerHTML = `

                    <button
                        type="button"
                        class="botao-ver-recados sem-recados"
                    >

                        💌 Ver recados

                    </button>

                `;

            }
            /* ======================================
               CARD
            ====================================== */

            card.innerHTML = ` 

                <div class="participante-foto-container"> 
                    ${foto} 
                </div> 
    
                <h3> 
                    ${escaparHTML(
                        participante.nome || "Sem nome"
                    )} 
                </h3> 
                
                <div class="participante-info"> 
                    <span> 
                        🎂 ${participante.idade ?? "--"} anos 
                    </span> 
                    
                    <span> 
                        ${escaparHTML(
                            participante.signo ||
                            "Signo não informado"
                        )} 
                    </span> 
                    
                    <span> 
                        📍 ${escaparHTML(
                            participante.cidade ||
                            "Localidade não informada"
                        )} 
                    </span> 
                </div> 
    
                ${
                    relacionamentoTexto
                        ? ` 
                            <div class="participante-relacionamento"> 
                                ${relacionamentoTexto} 
                            </div> 
                        `
                        : ""
                } 
                
                <div class="participante-curiosidade"> 
                
                    <div class="curiosidade-titulo"> 
                        📝 CURIOSIDADE 
                    </div> 
                    
                    <p> 
                        ${escaparHTML(
                            participante.curiosidade ||
                            "Essa integrante ainda não revelou seus segredos. 👀"
                        )} 
                    </p> 
                    
                </div> 
            `;

            

            card.appendChild(areaRecados);
            const botaoVerRecados =
                areaRecados.querySelector(
                    ".botao-ver-recados"
                );

            botaoVerRecados.addEventListener(
                "click",
                () => {

                    abrirRecados(
                        participante,
                        recadosDaParticipante
                    );

                }
            );

            listaParticipantes.appendChild(card);



        });

    } catch (erro) {

        console.error(
            "Erro ao carregar participantes:",
            erro
        );


        listaParticipantes.innerHTML = `

            <div class="estado-participantes">

                <span>😭</span>

                <p>
                    A redação tropeçou nos próprios arquivos.
                </p>

                <p>
                    Não conseguimos carregar o Sapacrew agora.
                </p>

            </div>

        `;


        contadorParticipantes.textContent =
            "Erro ao carregar";

    }

}
// ==========================================
// MENSAGEM DE ERRO DO RECADO
// ==========================================

function mostrarErroRecado(mensagem) {

    mensagemErroRecado.textContent =
        mensagem;

    mensagemErroRecado.hidden =
        false;

    mensagemSucessoRecado.hidden =
        true;

}


// ==========================================
// ENVIAR RECADO
// ==========================================

formRecado.addEventListener(
    "submit",
    async (evento) => {

        evento.preventDefault();


        // ------------------------------
        // LIMPA MENSAGENS
        // ------------------------------

        mensagemErroRecado.hidden = true;
        mensagemSucessoRecado.hidden = true;


        // ------------------------------
        // PEGA OS DADOS
        // ------------------------------

        const destinatariaId =
            destinatariaRecado.value;

        const mensagem =
            mensagemRecado.value.trim();

        const identificacaoSelecionada =
            document.querySelector(
                'input[name="identificacaoRecado"]:checked'
            );

        const identificacao =
            identificacaoSelecionada
                ? identificacaoSelecionada.value
                : "anonimo";


        // ------------------------------
        // VALIDA DESTINATÁRIA
        // ------------------------------

        if (!destinatariaId) {

            mostrarErroRecado(
                "Escolha para quem você quer mandar o recado. 💌"
            );

            return;

        }


        // ------------------------------
        // VALIDA MENSAGEM
        // ------------------------------

        if (!mensagem) {

            mostrarErroRecado(
                "Não vale mandar um recado invisível. 👀"
            );

            return;

        }


        // ------------------------------
        // PROCURA A PARTICIPANTE
        // ------------------------------

        const destinataria =
            participantes.find(
                participante =>
                    participante.id === destinatariaId
            );


        // ------------------------------
        // NOME DA REMETENTE
        // ------------------------------

        let remetenteNome = null;

        if (
            identificacao === "identificada"
        ) {

            remetenteNome =
                nomeRemetente.value.trim();

            if (!remetenteNome) {

                mostrarErroRecado(
                    "Se você quer se identificar, conta seu nome pra gente. 👀"
                );

                nomeRemetente.focus();

                return;

            }

        }


        // ------------------------------
        // OBJETO DO RECADO
        // ------------------------------

        const novoRecado = {

            destinatariaId,

            destinatariaNome:
                destinataria
                    ? destinataria.nome
                    : "Integrante",

            mensagem,

            anonimo:
                identificacao === "anonimo",

            remetenteNome,

            criadoEm:
                serverTimestamp()

        };


        // ------------------------------
        // ENVIA PARA O FIREBASE
        // ------------------------------

        try {

            botaoEnviarRecado.disabled =
                true;

            textoBotaoRecado.textContent =
                "Enviando recado...";


            await addDoc(
                collection(db, "recados"),
                novoRecado
            );


            // --------------------------
            // SUCESSO
            // --------------------------

            formRecado.reset();

            nomeRemetenteBox.hidden = true;

            contadorMensagemRecado.textContent = "0";

            mensagemSucessoRecado.textContent =
                "💌 Recado entregue à central da Sapacrew!";

            mensagemSucessoRecado.hidden = false


        } catch (erro) {

            console.error(
                "Erro ao enviar recado:",
                erro
            );


            mostrarErroRecado(
                "A redação perdeu seu recado no caminho. Tente novamente. 😭"
            );

        } finally {

            botaoEnviarRecado.disabled =
                false;

            textoBotaoRecado.textContent =
                "💌 Enviar recado";

        }

    }
);

// ==========================================
// INICIA
// ==========================================

async function iniciarPagina() {

    await carregarRecados();

    await carregarParticipantes();

}

iniciarPagina();

