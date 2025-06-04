// Evento geral, ocorre assim que a página é carregada
document.addEventListener("DOMContentLoaded", function () {

    // Variável que recebe o valor passado através do sessionStorage
    const nome = sessionStorage.getItem("usuario");

    // Variável que pega a tag spam do html onde o nome do usuário será colocado
    const nomeUsuario = document.getElementById("nomeUsuario");

    // Verificando se essas variáveis não são nulas e redirecionando para a página inicial caso sejam
    if (nome && nomeUsuario) {
        nomeUsuario.textContent = nome;
    }else{
        window.location.href = "index.html"
    }

    // Variáveis que armazenam as luzes
    const luzVermelha = document.getElementById("luzVermelha");
    const luzAmarela = document.getElementById("luzAmarela");
    const luzVerde = document.getElementById("luzVerde");

    // Variável que armazena o botão
    const botaoTravessia = document.getElementById("botaoTravessia");

    // Função para mostrar cada luz, de acordo com os valores passados pelo parâmetro
    function mostrarLuz(vermelho, amarelo, verde) {
        luzVermelha.style.display = vermelho ? "block" : "none";
        luzAmarela.style.display = amarelo ? "block" : "none";
        luzVerde.style.display = verde ? "block" : "none";
    }

    let estado = 0;

    // Função que altera o estado do semáforo com o tempo
    setInterval(() => {
        if (estado === 0) {
        mostrarLuz(true, false, false); // vermelho
        } else if (estado === 1) {
        mostrarLuz(false, true, false); // amarelo
        } else {
        mostrarLuz(false, false, true); // verde
        }

        estado = (estado + 1) % 3;
    }, 3000);

    // Por enquanto apenas exibe um alert
    botaoTravessia.addEventListener("click", () => {
        alert("Travessia solicitada!"); // depois pode ativar travessia no ciclo
    });
});