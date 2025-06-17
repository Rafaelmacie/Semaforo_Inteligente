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
        window.location.href = "../index.html";
    }

    // Variáveis que armazenam as luzes
    const luzVermelha = document.getElementById("luzVermelha");
    const luzAmarela = document.getElementById("luzAmarela");
    const luzVerde = document.getElementById("luzVerde");

    // Variável que armazena o botão
    const botaoTravessia = document.getElementById("botaoTravessia");

    // Variáveis dos elementos de mensagens
    const contador = document.getElementById("contador");
    const mensagemTravessia = document.getElementById("mensagemTravessia");
    const estadoCarros = document.getElementById("estadoCarros");

    // Função para mostrar cada luz, de acordo com os valores passados pelo parâmetro
    function mostrarLuz(vermelho, amarelo, verde) {
        luzVermelha.style.display = vermelho ? "block" : "none";
        luzAmarela.style.display = amarelo ? "block" : "none";
        luzVerde.style.display = verde ? "block" : "none";
    }

    // Estado atual do semáforo (0 = verde, 1 = amarelo, 2 = vermelho)
    let estado = 0;

    // Tempo que cada luz permanece acesa (em segundos)
    let tempoVerde = 5;
    let tempoAmarelo = 2;
    let tempoVermelho = 5;

    // Contador regressivo
    let segundosRestantes = tempoVerde;

    // Flag para detectar se travessia foi solicitada
    let travessiaSolicitada = false;

    // Atualiza a luz do semáforo com base no estado atual
    function atualizarSemaforo() {
        if (estado === 0) {
            mostrarLuz(false, false, true); // verde
            estadoCarros.textContent = "Carros em movimento";
        } else if (estado === 1) {
            mostrarLuz(false, true, false); // amarelo
            estadoCarros.textContent = "Carros em movimento";
        } else {
            mostrarLuz(true, false, false); // vermelho
            estadoCarros.textContent = "Carros parados";
        }
    }

    // Atualiza o contador e troca de estado quando necessário
    function atualizarContador() {
        contador.textContent = segundosRestantes + "s";
        segundosRestantes--;

        // Quando o tempo da fase acabar
        if (segundosRestantes < 0) {
            // Muda o estado do semáforo
            estado = (estado + 1) % 3;
            atualizarSemaforo();

            // Remove a mensagem de travessia ao trocar de luz
            mensagemTravessia.textContent = "";

            // Define novo tempo para a próxima fase
            if (estado === 0) { // verde
                segundosRestantes = tempoVerde;
            } else if (estado === 1) { // amarelo
                segundosRestantes = tempoAmarelo;
            } else if (estado === 2) { // vermelho
                segundosRestantes = tempoVermelho;
                // Após o vermelho, reinicia a flag de travessia
                travessiaSolicitada = false;
            }
        }
    }

    // Inicializa semáforo e contador
    atualizarSemaforo();
    atualizarContador();
    setInterval(atualizarContador, 1000);

    // Evento de clique no botão de travessia
    botaoTravessia.addEventListener("click", () => {
        if (estado === 0) { // verde
            if (!travessiaSolicitada) {
                mensagemTravessia.style.color = "blue";
                mensagemTravessia.textContent = "Travessia solicitada, aguarde o sinal ficar vermelho";
                travessiaSolicitada = true;
                if (segundosRestantes > 2) {
                    segundosRestantes = 2; // reduz tempo do verde
                }
            }
        } else if (estado === 1) { // amarelo
            mensagemTravessia.style.color = "orange";
            mensagemTravessia.textContent = "Aguarde só mais um pouco";
        } else if (estado === 2) { // vermelho
            mensagemTravessia.style.color = "green";
            mensagemTravessia.textContent = "Você já pode atravessar";
        }
    });
});
