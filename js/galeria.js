
const imagens = document.querySelectorAll(".foto img");
const videos = document.querySelectorAll(".video-destaque video");

const lightbox = document.getElementById("lightbox");
const imagemLightbox = document.getElementById("imagemLightbox");
const videoLightbox = document.getElementById("videoLightbox");

const fechar = document.querySelector(".fechar");
const anterior = document.querySelector(".anterior");
const proxima = document.querySelector(".proxima");

// Junta fotos e vídeos na ordem em que aparecem na página
const itens = [...document.querySelectorAll(
    ".grid-fotos .foto img, .grid-fotos .video-destaque video"
)];

let indiceAtual = 0;

function abrirItem(indice) {
    indiceAtual = indice;

    const item = itens[indice];

    // Para qualquer vídeo que esteja tocando
    videoLightbox.pause();
    videoLightbox.removeAttribute("src");
    videoLightbox.load();

    if (item.tagName === "VIDEO") {
        imagemLightbox.style.display = "none";
        videoLightbox.style.display = "block";

        videoLightbox.src = item.currentSrc || item.src;
        videoLightbox.load();
        lightbox.classList.add("ativo");

        videoLightbox.play().catch(() => {});
    } else {
        videoLightbox.style.display = "none";
        imagemLightbox.style.display = "block";
        imagemLightbox.src = item.src;

        lightbox.classList.add("ativo");
    }
}


itens.forEach((item, indice) => {
    const clicavel = item.closest(".video-destaque") || item;

    clicavel.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        abrirItem(indice);
    });
});


function fecharLightbox() {
    videoLightbox.pause();
    videoLightbox.removeAttribute("src");
    videoLightbox.load();
    lightbox.classList.remove("ativo");
}

fechar.addEventListener("click", fecharLightbox);

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        fecharLightbox();
    }
});

proxima.addEventListener("click", () => {
    indiceAtual = (indiceAtual + 1) % itens.length;
    abrirItem(indiceAtual);
});

anterior.addEventListener("click", () => {
    indiceAtual = (indiceAtual - 1 + itens.length) % itens.length;
    abrirItem(indiceAtual);
});

document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("ativo")) return;

    if (e.key === "ArrowRight") proxima.click();
    if (e.key === "ArrowLeft") anterior.click();

    if (e.key === "Escape") fecharLightbox();
});
