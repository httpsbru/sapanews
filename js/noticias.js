const containerNoticias = document.getElementById("noticias-container");

const filtros = document.querySelectorAll(".filtro");


// =========================================
// RENDERIZAR NOTÍCIAS
// =========================================

function renderizarNoticias(categoriaSelecionada = "todos") {

    containerNoticias.innerHTML = "";

    const noticiasFiltradas = noticias.filter(noticia => {

        if (categoriaSelecionada === "todos") {
            return true;
        }

        return noticia.categoria
            .toUpperCase()
            .includes(categoriaSelecionada);

    });


    if (noticiasFiltradas.length === 0) {

        containerNoticias.innerHTML = `
            <div class="nenhuma-noticia">

                <h2>👀 Nada por aqui...</h2>

                <p>
                    O SapaNews ainda não desenterrou nenhuma notícia
                    nessa categoria.
                </p>

            </div>
        `;

        return;

    }


    // =========================================
    // PRIMEIRA NOTÍCIA = DESTAQUE
    // =========================================

    const destaque = noticiasFiltradas[0];

    const destaqueHTML = document.createElement("article");

    destaqueHTML.className = "noticia-destaque";

    destaqueHTML.innerHTML = `

        <img
            class="noticia-destaque-imagem"
            src="${destaque.imagem}"
            alt="${destaque.titulo}"
        >

        <div class="noticia-destaque-conteudo">

            <span class="noticia-categoria">
                ${destaque.categoria}
            </span>

            <h2>
                ${destaque.titulo}
            </h2>

            <span class="noticia-data">
                ${destaque.data || ""}
            </span>

            <div class="noticia-texto">

                ${destaque.texto}

            </div>

        </div>

    `;

    containerNoticias.appendChild(destaqueHTML);


    // =========================================
    // RESTANTE DAS NOTÍCIAS
    // =========================================

    const restantes = noticiasFiltradas.slice(1);


    if (restantes.length > 0) {

        const separador = document.createElement("div");

        separador.className = "separador-noticias";

        separador.innerHTML = `
            <span>MAIS NOTÍCIAS</span>
        `;

        containerNoticias.appendChild(separador);


        const grid = document.createElement("div");

        grid.className = "noticias-secundarias";


        restantes.forEach(noticia => {

            const card = document.createElement("article");

            card.className = "noticia-card";

            card.innerHTML = `

                <img
                    src="${noticia.imagem}"
                    alt="${noticia.titulo}"
                >

                <div class="noticia-card-conteudo">

                    <span class="noticia-categoria">
                        ${noticia.categoria}
                    </span>

                    <h2>
                        ${noticia.titulo}
                    </h2>

                    <span class="noticia-data">
                        ${noticia.data || ""}
                    </span>

                    <div class="noticia-texto">

                        ${noticia.texto}

                    </div>

                </div>

            `;

            grid.appendChild(card);

        });


        containerNoticias.appendChild(grid);

    }

}


// =========================================
// FILTROS
// =========================================

filtros.forEach(filtro => {

    filtro.addEventListener("click", () => {

        filtros.forEach(item => {

            item.classList.remove("ativo");

        });


        filtro.classList.add("ativo");


        const categoria = filtro.dataset.categoria;

        renderizarNoticias(categoria);

    });

});


// =========================================
// INICIAR
// =========================================

renderizarNoticias();