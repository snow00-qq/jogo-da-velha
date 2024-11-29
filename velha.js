var tabuleiro;
var board;
var aviso;
var jogador;
var lin, col;
var currentPlayerSpan;
var winningCells = []; // Para armazenar as células vencedoras

function inicia() {
    tabuleiro = new Array(3);
    board = document.getElementById('board');
    aviso = document.getElementById('aviso');
    currentPlayerSpan = document.getElementById('current-player');
    jogador = 1;
    winningCells = []; // Limpa as células vencedoras ao iniciar o jogo

    // Inicializando o tabuleiro com 0
    for (let i = 0; i < 3; i++) {
        tabuleiro[i] = new Array(3);
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            tabuleiro[i][j] = 0; // 0 significa que o campo está vazio
        }
    }
    exibe();
}

function exibe() {
    let HTML = '<table cellpadding="10" border="1">';
    
    // Desenhando o tabuleiro
    for (let i = 0; i < 3; i++) {
        HTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            if (tabuleiro[i][j] == 0)
                HTML += `<td onclick="marcar(${i}, ${j})"> </td>`;
            else if (tabuleiro[i][j] == 1)
                HTML += `<td class="player-x">X</td>`;
            else
                HTML += `<td class="player-o">O</td>`;
        }
        HTML += '</tr>';
    }
    HTML += '</table><br />';
    board.innerHTML = HTML;
    
    // Aplica a animação nas células vencedoras
    for (let cell of winningCells) {
        let td = document.querySelector(`tr:nth-child(${cell[0] + 1}) td:nth-child(${cell[1] + 1})`);
        td.classList.add('winning-cell');
    }
}

function jogar() {
    lin = parseInt(document.getElementById("lin").value) - 1;
    col = parseInt(document.getElementById("col").value) - 1;

    if (tabuleiro[lin][col] === 0) {
        if (jogador % 2 === 1) {
            tabuleiro[lin][col] = 1; // Jogador 1 (X)
            currentPlayerSpan.innerText = '2 (O)';
        } else {
            tabuleiro[lin][col] = -1; // Jogador 2 (O)
            currentPlayerSpan.innerText = '1 (X)';
        }
    } else {
        aviso.innerHTML = 'Campo já foi marcado!';
        return;
    }

    jogador++; // Alterna o jogador
    exibe(); // Atualiza o tabuleiro
    checa(); // Verifica se há vencedor
}

function checa() {
    var soma;

    // Verifica as linhas
    for (let i = 0; i < 3; i++) {
        soma = tabuleiro[i][0] + tabuleiro[i][1] + tabuleiro[i][2];
        if (soma === 3 || soma === -3) {
            winningCells = [[i, 0], [i, 1], [i, 2]]; // Linha vencedora
            aviso.innerHTML = "Jogador " + (jogador % 2 + 1) + " ganhou! Linha " + (i + 1) + " preenchida!";
            return;
        }
    }

    // Verifica as colunas
    for (let i = 0; i < 3; i++) {
        soma = tabuleiro[0][i] + tabuleiro[1][i] + tabuleiro[2][i];
        if (soma === 3 || soma === -3) {
            winningCells = [[0, i], [1, i], [2, i]]; // Coluna vencedora
            aviso.innerHTML = "Jogador " + (jogador % 2 + 1) + " ganhou! Coluna " + (i + 1) + " preenchida!";
            return;
        }
    }

    // Verifica as diagonais
    soma = tabuleiro[0][0] + tabuleiro[1][1] + tabuleiro[2][2];
    if (soma === 3 || soma === -3) {
        winningCells = [[0, 0], [1, 1], [2, 2]]; // Diagonal principal
        aviso.innerHTML = "Jogador " + (jogador % 2 + 1) + " ganhou! Diagonal principal!";
        return;
    }

    soma = tabuleiro[0][2] + tabuleiro[1][1] + tabuleiro[2][0];
    if (soma === 3 || soma === -3) {
        winningCells = [[0, 2], [1, 1], [2, 0]]; // Diagonal secundária
        aviso.innerHTML = "Jogador " + (jogador % 2 + 1) + " ganhou! Diagonal secundária!";
        return;
    }
}

function marcar(lin, col) {
    if (tabuleiro[lin][col] === 0) {
        tabuleiro[lin][col] = jogador % 2 === 1 ? 1 : -1;
        jogador++;
        exibe();
        checa();
    }
}
