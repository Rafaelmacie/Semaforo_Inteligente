// Evento geral, ocorre assim que a página é carregada
document.addEventListener("DOMContentLoaded", function () {

    // Variável que recebe o valor passado através do sessionStorage
    const nome = sessionStorage.getItem("usuario");

    // Variável que pega a tag span do HTML onde o nome do usuário será colocado
    const nomeUsuario = document.getElementById("nomeUsuario");

    // Verificando se essas variáveis não são nulas e redirecionando para a página inicial caso sejam
    if (nome && nomeUsuario) {
        nomeUsuario.textContent = nome;
    } else {
        window.location.href = "index.html";
    }

    // Variáveis que armazenam as luzes
    const luzVermelha = document.getElementById("luzVermelha");
    const luzAmarela = document.getElementById("luzAmarela");
    const luzVerde = document.getElementById("luzVerde");

    // Variável que armazena o botão
    const botaoTravessia = document.getElementById("botaoTravessia");

    // Variável que armazena o elemento do contador
    const contador = document.getElementById("contador");

    // Função para mostrar cada luz, de acordo com os valores passados pelo parâmetro
    function mostrarLuz(vermelho, amarelo, verde) {
        luzVermelha.style.display = vermelho ? "block" : "none";
        luzAmarela.style.display = amarelo ? "block" : "none";
        luzVerde.style.display = verde ? "block" : "none";
    }

    // Estado atual do semáforo (0 = vermelho, 1 = amarelo, 2 = verde)
    let estado = 0;

    // Tempo que cada luz permanece acesa (em segundos)
    let tempoPorFase = 5;
    let tempoAmarelo = 1;

    // Contador regressivo que será exibido na tela
    let segundosRestantes = tempoPorFase;

    // Função que atualiza a luz do semáforo conforme o estado atual
    function atualizarSemaforo() {
        if (estado === 0) {
            mostrarLuz(true, false, false); // vermelho
        } else if (estado === 1) {
            mostrarLuz(false, true, false); // amarelo
        } else {
            mostrarLuz(false, false, true); // verde
        }
    }

    // Função que atualiza o contador na tela a cada segundo
    function atualizarContador() {
        contador.textContent = segundosRestantes + "s"; // mostra contador
        segundosRestantes--;

        // Quando o tempo da fase atual acabar, muda para a próxima
        if (segundosRestantes < 0) {
            estado = (estado + 1) % 3; // próximo estado
            atualizarSemaforo();       // atualiza luz
            if(estado == 1){
                segundosRestantes = tempoAmarelo
            }else{
                segundosRestantes = tempoPorFase; // reinicia contador
            }
        }
    }

    // Inicializando semáforo e contador assim que a página carrega
    atualizarSemaforo();
    atualizarContador();

    // Atualiza o contador e o semáforo a cada segundo
    setInterval(atualizarContador, 1000);

    // Por enquanto apenas exibe um alert
    botaoTravessia.addEventListener("click", () => {
        alert("Travessia solicitada!"); // depois pode ativar travessia no ciclo
    });
});
