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

const formulario = document.getElementById("cadastroForm");

const nomeInput = document.getElementById("nome");
const nascimentoInput = document.getElementById("nascimento");
const cidadeInput = document.getElementById("cidade");

const idadeCalculada = document.getElementById("idadeCalculada");
const signoCalculado = document.getElementById("signoCalculado");
const dadosNascimento = document.getElementById("dadosNascimento");

const statusRelacionamento =
    document.getElementById("statusRelacionamento");

const relacionamentoInternoBox =
    document.getElementById("relacionamentoInternoBox");

const parceiraBox =
    document.getElementById("parceiraBox");

const parceiraSelect =
    document.getElementById("parceiraId");

const parceiraNaoCadastradaBox =
    document.getElementById("parceiraNaoCadastradaBox");

const botaoFoto =
    document.getElementById("botaoFoto");

const fotoPreview =
    document.getElementById("fotoPreview");

const statusUploadFoto =
    document.getElementById("statusUploadFoto");

const parceiraNomeManual =
    document.getElementById("parceiraNomeManual");


const curiosidadeInput =
    document.getElementById("curiosidade");

const contadorCaracteres =
    document.getElementById("contadorCaracteres");

const botaoCadastro =
    document.getElementById("botaoCadastro");

const textoBotao =
    document.getElementById("textoBotao");

const mensagemErro =
    document.getElementById("mensagemErro");

const mensagemSucesso =
    document.getElementById("mensagemSucesso");


// ==========================================
// VARIÁVEIS
// ==========================================

let participantes = [];
let fotoUrl = null;


// ==========================================
// SIGNOS
// ==========================================

function descobrirSigno(data) {

    const dia = data.getDate();
    const mes = data.getMonth() + 1;

    if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) {
        return "♈ Áries";
    }

    if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) {
        return "♉ Touro";
    }

    if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) {
        return "♊ Gêmeos";
    }

    if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) {
        return "♋ Câncer";
    }

    if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) {
        return "♌ Leão";
    }

    if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) {
        return "♍ Virgem";
    }

    if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) {
        return "♎ Libra";
    }

    if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) {
        return "♏ Escorpião";
    }

    if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) {
        return "♐ Sagitário";
    }

    if ((mes === 12 && dia >= 22) || (mes === 1 && dia <= 19)) {
        return "♑ Capricórnio";
    }

    if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) {
        return "♒ Aquário";
    }

    return "♓ Peixes";
}


// ==========================================
// CALCULAR IDADE
// ==========================================

function calcularIdade(dataNascimento) {

    const hoje = new Date();

    let idade =
        hoje.getFullYear() -
        dataNascimento.getFullYear();

    const mesAtual = hoje.getMonth();
    const mesNascimento = dataNascimento.getMonth();

    const aniversarioAindaNaoChegou =
        mesAtual < mesNascimento ||
        (
            mesAtual === mesNascimento &&
            hoje.getDate() < dataNascimento.getDate()
        );

    if (aniversarioAindaNaoChegou) {
        idade--;
    }

    return idade;
}


// ==========================================
// DATA DE NASCIMENTO
// ==========================================

nascimentoInput.addEventListener("change", () => {

    if (!nascimentoInput.value) {

        dadosNascimento.hidden = true;

        return;
    }

    const [ano, mes, dia] =
        nascimentoInput.value.split("-").map(Number);

    const dataNascimento =
        new Date(ano, mes - 1, dia);

    const idade =
        calcularIdade(dataNascimento);

    const signo =
        descobrirSigno(dataNascimento);

    idadeCalculada.textContent =
        `🎂 ${idade} anos`;

    signoCalculado.textContent =
        signo;

    dadosNascimento.hidden = false;

});


// ==========================================
// STATUS DE RELACIONAMENTO
// ==========================================

function atualizarRelacionamento() {

    const status =
        statusRelacionamento.value;

    const precisaRelacionamentoInterno =
        status === "ficando" ||
        status === "namorando" ||
        status === "casada";


    if (precisaRelacionamentoInterno) {

        relacionamentoInternoBox.hidden = false;

    } else {

        relacionamentoInternoBox.hidden = true;

        parceiraBox.hidden = true;

        parceiraNaoCadastradaBox.hidden = true;


        // Limpa os radios
        document
            .querySelectorAll(
                'input[name="relacionamentoInterno"]'
            )
            .forEach(input => {
                input.checked = false;
            });

        // Limpa os campos
        parceiraSelect.value = "";

        parceiraNomeManual.value = "";

    }

}


// Detecta alteração do status
statusRelacionamento.addEventListener(
    "change",
    atualizarRelacionamento
);


// Garante que tudo comece escondido
atualizarRelacionamento();


// ==========================================
// SIM / NÃO — RELACIONAMENTO
// ==========================================

document
    .querySelectorAll(
        'input[name="relacionamentoInterno"]'
    )
    .forEach(input => {

        input.addEventListener("change", () => {

            // ------------------------------
            // SIM
            // ------------------------------

            if (
                input.value === "sim" &&
                input.checked
            ) {

                parceiraBox.hidden = false;

                parceiraNaoCadastradaBox.hidden = true;

                parceiraNomeManual.value = "";

                carregarParticipantes();

            }


            // ------------------------------
            // NÃO
            // ------------------------------

            if (
                input.value === "nao" &&
                input.checked
            ) {

                parceiraBox.hidden = true;

                parceiraNaoCadastradaBox.hidden = true;

                parceiraSelect.value = "";

                parceiraNomeManual.value = "";

            }

        });

    });


// ==========================================
// BUSCAR PARTICIPANTES DO FIREBASE
// ==========================================

async function carregarParticipantes() {

    try {

        parceiraSelect.innerHTML = `
            <option value="">
                Carregando integrantes...
            </option>
        `;

        const referencia =
            collection(db, "participantes");

        const snapshot =
            await getDocs(referencia);

        participantes = [];

        snapshot.forEach(documento => {

            participantes.push({
                id: documento.id,
                ...documento.data()
            });

        });

        // Ordena alfabeticamente
        participantes.sort((a, b) =>
            (a.nome || "").localeCompare(
                b.nome || "",
                "pt-BR"
            )
        );



        // Limpa a lista
        parceiraSelect.innerHTML = `
    <option value="">
        Selecione uma integrante...
    </option>

    <option value="nao-encontrei">
        Não encontrei minha parceira
    </option>
`;


        // Se ainda não houver ninguém
        if (participantes.length === 0) {

            parceiraSelect.innerHTML = `
                <option value="">
                    Ainda não há integrantes cadastradas
                </option>

                <option value="nao-encontrei">
                    Não encontrei minha parceira
                </option>
            `;

            return;
        }


        // Cria as opções
        participantes.forEach(participante => {

            const option =
                document.createElement("option");

            option.value =
                participante.id;

            option.textContent =
                participante.nome;

            parceiraSelect.appendChild(option);

        });

    } catch (erro) {

        console.error(
            "Erro ao carregar participantes:",
            erro
        );

        parceiraSelect.innerHTML = `
            <option value="">
                Não foi possível carregar a lista
            </option>
        `;

    }

}

// ==========================================
// PARCEIRA NÃO CADASTRADA
// ==========================================

parceiraSelect.addEventListener("change", () => {

    if (
        parceiraSelect.value === "nao-encontrei"
    ) {

        parceiraNaoCadastradaBox.hidden = false;

        parceiraNomeManual.focus();

    } else {

        parceiraNaoCadastradaBox.hidden = true;

        parceiraNomeManual.value = "";

    }

});

// ==========================================
// UPLOAD DA FOTO — CLOUDINARY
// ==========================================

const cloudinaryWidget =
    cloudinary.createUploadWidget(

        {
            cloudName: "ogzsvthz",

            uploadPreset: "sapacrew_fotos",

            sources: [
                "local",
                "camera"
            ],

            multiple: false,

            maxFileSize: 5000000,

            clientAllowedFormats: [
                "jpg",
                "jpeg",
                "png",
                "webp"
            ],

            cropping: true,

            croppingAspectRatio: 1,

            croppingShowDimensions: true,

            folder: "sapacrew",

            language: "pt",

            text: {
                pt: {
                    or: "ou",
                    menu: {
                        files: "Meus arquivos",
                        camera: "Câmera"
                    }
                }
            }

        },

        (error, result) => {

            if (error) {

                console.error(
                    "Erro no upload:",
                    error
                );

                statusUploadFoto.textContent =
                    "Não conseguimos enviar essa foto. 😭";

                statusUploadFoto.hidden =
                    false;

                return;
            }


            // ------------------------------
            // UPLOAD CONCLUÍDO
            // ------------------------------

            if (
                result &&
                result.event === "success"
            ) {

                fotoUrl =
                    result.info.secure_url;


                // Mostra preview

                fotoPreview.innerHTML = `

                    <img
                        src="${fotoUrl}"
                        alt="Foto escolhida"
                        class="foto-preview-imagem"
                    >

                `;


                statusUploadFoto.textContent =
                    "Foto enviada com sucesso! 💖";

                statusUploadFoto.hidden =
                    false;


                botaoFoto.textContent =
                    "🔄 Trocar foto";

            }

        }

    );


// Abre o widget

botaoFoto.addEventListener(
    "click",
    () => {

        cloudinaryWidget.open();

    }
);

// ==========================================
// CONTADOR DA CURIOSIDADE
// ==========================================

curiosidadeInput.addEventListener("input", () => {

    contadorCaracteres.textContent =
        curiosidadeInput.value.length;

});


// ==========================================
// MENSAGENS
// ==========================================

function mostrarErro(mensagem) {

    mensagemErro.textContent = mensagem;

    mensagemErro.hidden = false;

    mensagemSucesso.hidden = true;

    mensagemErro.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


function mostrarSucesso(mensagem) {

    mensagemSucesso.textContent = mensagem;

    mensagemSucesso.hidden = false;

    mensagemErro.hidden = true;

    mensagemSucesso.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


// ==========================================
// ENVIAR CADASTRO
// ==========================================

formulario.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    mensagemErro.hidden = true;
    mensagemSucesso.hidden = true;


    // --------------------------------------
    // DADOS BÁSICOS
    // --------------------------------------

    const nome =
        nomeInput.value.trim();

    const nascimento =
        nascimentoInput.value;

    const cidade =
        cidadeInput.value.trim();

    const status =
        statusRelacionamento.value;

    const curiosidade =
        curiosidadeInput.value.trim();


    // --------------------------------------
    // VALIDAÇÕES
    // --------------------------------------

    if (!nome || !nascimento || !cidade || !status || !curiosidade) {

        mostrarErro(
            "Preencha todos os campos obrigatórios antes de enviar. 👀"
        );

        return;
    }


    // --------------------------------------
    // DATA
    // --------------------------------------

    const [ano, mes, dia] =
        nascimento.split("-").map(Number);

    const dataNascimento =
        new Date(ano, mes - 1, dia);

    const idade =
        calcularIdade(dataNascimento);

    const signo =
        descobrirSigno(dataNascimento);


    // --------------------------------------
    // VALIDA IDADE
    // --------------------------------------

    if (idade < 0 || idade > 120) {

        mostrarErro(
            "Essa data de nascimento parece estranha. Dá uma conferida. 👀"
        );

        return;
    }


    // --------------------------------------
    // RELACIONAMENTO
    // --------------------------------------

    let relacionamentoInterno = false;

    let parceiraId = null;

    let parceiraNome = null;


    if (
        status === "ficando" ||
        status === "namorando" ||
        status === "casada"
    ) {

        const opcaoSelecionada =
            document.querySelector(
                'input[name="relacionamentoInterno"]:checked'
            );


        // ------------------------------
        // NÃO INFORMOU SIM/NÃO
        // ------------------------------

        if (!opcaoSelecionada) {

            mostrarErro(
                "Conta pra gente se é alguém do Sapacrew. 💘"
            );

            return;
        }


        relacionamentoInterno =
            opcaoSelecionada.value === "sim";


        // ------------------------------
        // É ALGUÉM DA SAPACREW
        // ------------------------------

        if (relacionamentoInterno) {

            if (!parceiraSelect.value) {

                mostrarErro(
                    "Escolha com quem você está. 👀"
                );

                return;
            }


            // ------------------------------
            // PARCEIRA JÁ CADASTRADA
            // ------------------------------

            if (
                parceiraSelect.value !== "nao-encontrei"
            ) {

                parceiraId =
                    parceiraSelect.value;


                const participanteSelecionada =
                    participantes.find(
                        participante =>
                            participante.id === parceiraId
                    );


                if (participanteSelecionada) {

                    parceiraNome =
                        participanteSelecionada.nome;

                }

            }


            // ------------------------------
            // PARCEIRA AINDA NÃO CADASTRADA
            // ------------------------------

            else {

                const nomeManual =
                    parceiraNomeManual.value.trim();


                if (!nomeManual) {

                    mostrarErro(
                        "Digite o nome da sua parceira. 💕"
                    );

                    parceiraNomeManual.focus();

                    return;
                }


                parceiraNome =
                    nomeManual;

            }

        }

    }


    // --------------------------------------
    // OBJETO DO CADASTRO
    // --------------------------------------

    const novoParticipante = {

        nome,

        nascimento,

        cidade,

        statusRelacionamento: status,

        relacionamentoInterno,

        parceiraId,

        parceiraNome,

        idade,

        signo,

        curiosidade,

        fotoUrl,

        criadoEm: serverTimestamp()

    };


    // --------------------------------------
    // ENVIA PARA O FIREBASE
    // --------------------------------------

    try {

        botaoCadastro.disabled = true;

        textoBotao.textContent =
            "⏳ Salvando cadastro...";


        await addDoc(
            collection(db, "participantes"),
            novoParticipante
        );


        mostrarSucesso(
            `Cadastro realizado com sucesso! 💖 Bem-vinda ào Sapacrew, ${nome}!`
        );


        // Limpa formulário
        formulario.reset();

        dadosNascimento.hidden = true;

        relacionamentoInternoBox.hidden = true;

        parceiraBox.hidden = true;

        parceiraNaoCadastradaBox.hidden = true;

        parceiraNomeManual.value = "";

        contadorCaracteres.textContent = "0";


        // Volta botão
        textoBotao.textContent =
            "💖 Cadastro realizado!";


    } catch (erro) {

        console.error(
            "Erro ao salvar cadastro:",
            erro
        );


        mostrarErro(
            "Não conseguimos salvar seu cadastro agora. Tenta novamente em alguns segundos. 😭"
        );


        textoBotao.textContent =
            "💖 Entrar para o Sapacrew";

    } finally {

        botaoCadastro.disabled = false;

    }

});