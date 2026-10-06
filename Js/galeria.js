const imagens = document.querySelectorAll(".foto img");

const lightbox = document.getElementById("lightbox");

const imagemLightbox = document.getElementById("imagemLightbox");

const fechar = document.querySelector(".fechar");

const anterior = document.querySelector(".anterior");

const proxima = document.querySelector(".proxima");

let indiceAtual = 0;

function abrirImagem(indice){

    indiceAtual = indice;

    imagemLightbox.src = imagens[indice].src;

    lightbox.classList.add("ativo");

}

imagens.forEach((img, indice)=>{

    img.addEventListener("click",()=>{

        abrirImagem(indice);

    });

});

fechar.addEventListener("click",()=>{

    lightbox.classList.remove("ativo");

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("ativo");

    }

});

proxima.addEventListener("click",()=>{

    indiceAtual++;

    if(indiceAtual>=imagens.length){

        indiceAtual=0;

    }

    abrirImagem(indiceAtual);

});

anterior.addEventListener("click",()=>{

    indiceAtual--;

    if(indiceAtual<0){

        indiceAtual=imagens.length-1;

    }

    abrirImagem(indiceAtual);

});

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("ativo")) return;

    if(e.key==="ArrowRight"){

        proxima.click();

    }

    if(e.key==="ArrowLeft"){

        anterior.click();

    }

    if(e.key==="Escape"){

        lightbox.classList.remove("ativo");

    }

});