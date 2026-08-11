
import {
    collection,
    getDocs
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

        const participantes = [];

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
        // CRIA OS CARDS
        // ======================================

        participantes.forEach(participante => {

const card =
    document.createElement("article");

card.className =
    "participante-card";


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

`;


listaParticipantes.appendChild(card);


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
// INICIA
// ==========================================

carregarParticipantes();

