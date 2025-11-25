function verificar() {
    const texto = document.getElementById("texto").value;

    // Remove espaços e deixa tudo minúsculo
    const formatado = texto.toLowerCase().replace(/\s/g, "");

    const ehPalindromo = formatado === formatado.split("").reverse().join("");

    document.getElementById("resultado").innerText =
        ehPalindromo
            ? "É um palíndromo! 🎉"
            : "Não é um palíndromo. ❌";
}
