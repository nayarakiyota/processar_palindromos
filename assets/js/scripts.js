const input = document.getElementById("texto");
const mensagem = document.getElementById("mensagem");
const detalhes = document.getElementById("detalhes");

const spanOriginal = document.getElementById("original");
const spanProcessado = document.getElementById("processado");
const spanInvertido = document.getElementById("invertido");
const spanTamanho = document.getElementById("tamanho");

const btnLimpar = document.getElementById("btnLimpar");
const btnVerificar = document.getElementById("btnVerificar");

// --- Função para limpar acentos, espaços e caracteres especiais ---
function limparTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "");
}

// --- Detecta palíndromo ---
function ehPalindromo(texto) {
    const limpo = limparTexto(texto);
    const invertido = [...limpo].reverse().join("");
    return { limpo, invertido, resultado: limpo === invertido };
}

// --- Atualiza UI ---
function atualizarInterface(estado, limpo = "", invertido = "") {
    if (estado === "vazio") {
        input.classList.remove("ok", "erro");
        detalhes.classList.add("hidden");
        return;
    }

    if (estado === "ok") {
        mensagem.innerHTML = "É um palíndromo! 🎉";
        input.classList.add("ok");
        input.classList.remove("erro");
    } else {
        mensagem.innerHTML = "Não é um palíndromo. ❌";
        input.classList.add("erro");
        input.classList.remove("ok");
    }

    spanOriginal.innerText = input.value;
    spanProcessado.innerText = limpo;
    spanInvertido.innerText = invertido;
    spanTamanho.innerText = limpo.length;

    detalhes.classList.remove("hidden");
}

// --- Função principal (chamada somente no submit/Enter ou botão) ---
function verificar() {
    const texto = input.value.trim();

    if (!texto) {
        atualizarInterface("vazio");
        return;
    }

    const { limpo, invertido, resultado } = ehPalindromo(texto);

    const estado = resultado ? "ok" : "erro";
    atualizarInterface(estado, limpo, invertido);
}

// --- Evento: verificar ao apertar Enter ---
input.addEventListener("keyup", e => {
    if (e.key === "Enter") verificar();
});

// --- Evento: enquanto digita mostramos apenas estado neutro/preview (sem resultado) ---
input.addEventListener("input", () => {
    if (!input.value.trim()) {
        atualizarInterface("vazio");
        return;
    }
});

// --- Botão de limpar ---
btnLimpar.addEventListener("click", () => {
    input.value = "";
    input.focus();

    mensagem.innerText = "";
    input.classList.remove("ok", "erro");
    detalhes.classList.add("hidden");

    atualizarInterface("vazio");
});


// --- Botão de verificar ---
btnVerificar.addEventListener("click", verificar);

// inicializa estado
atualizarInterface("vazio");
