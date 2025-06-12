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

    // Parágrafo para exibir mensagens de travessia
    const mensagemTravessia = document.getElementById("mensagemTravessia");

    // Função para mostrar cada luz, de acordo com os valores passados pelo parâmetro
    function mostrarLuz(vermelho, amarelo, verde) {
        luzVermelha.style.display = vermelho ? "block" : "none";
        luzAmarela.style.display = amarelo ? "block" : "none";
        luzVerde.style.display = verde ? "block" : "none";
    }

    // Estado atual do semáforo (0 = verde, 1 = amarelo, 2 = vermelho)
    let estado = 0;

    // Tempo padrão para cada fase (em segundos)
    const TEMPO_PADRAO = 5;
    const TEMPO_AMARELO = 2;
    let tempoVerde = TEMPO_PADRAO;
    let segundosRestantes = tempoVerde;

    // Flag para detectar travessia solicitada
    let travessiaSolicitada = false;

    // Função que atualiza a luz do semáforo conforme o estado atual
    function atualizarSemaforo() {
        // Remove qualquer mensagem anterior
        mensagemTravessia.textContent = "";

        if (estado === 0) {
            mostrarLuz(false, false, true); // verde
        } else if (estado === 1) {
            mostrarLuz(false, true, false); // amarelo
        } else {
            mostrarLuz(true, false, false); // vermelho
        }
    }

    // Função que atualiza o contador na tela a cada segundo
    function atualizarContador() {
        contador.textContent = segundosRestantes + "s";
        segundosRestantes--;

        // Quando o tempo da fase atual acabar, muda para a próxima
        if (segundosRestantes < 0) {
            estado = (estado + 1) % 3;

            // Redefine tempos conforme o novo estado
            if (estado === 0) {
                tempoVerde = TEMPO_PADRAO; // reseta tempo do verde
                segundosRestantes = tempoVerde;
            } else if (estado === 1) {
                segundosRestantes = TEMPO_AMARELO;
            } else {
                segundosRestantes = TEMPO_PADRAO;
            }

            travessiaSolicitada = false; // reseta a travessia
            atualizarSemaforo();         // atualiza a luz
        }
    }

    // Inicializa semáforo e contador ao carregar a página
    atualizarSemaforo();
    atualizarContador();

    // Atualiza o contador e o semáforo a cada segundo
    setInterval(atualizarContador, 1000);

    // Evento de clique no botão de travessia
    botaoTravessia.addEventListener("click", () => {
        if (estado === 0) {
            // Semáforo verde
            if (!travessiaSolicitada) {
                mensagemTravessia.style.color = "blue";
                mensagemTravessia.textContent = "Travessia solicitada, aguarde o sinal ficar vermelho";
                segundosRestantes = Math.min(segundosRestantes, 2); // reduz o tempo se for maior que 2
                travessiaSolicitada = true;
            }
        } else if (estado === 1) {
            // Semáforo amarelo
            mensagemTravessia.style.color = "orange";
            mensagemTravessia.textContent = "Aguarde só mais um pouco";
        } else {
            // Semáforo vermelho
            mensagemTravessia.style.color = "green";
            mensagemTravessia.textContent = "Você já pode atravessar";
        }
    });
});