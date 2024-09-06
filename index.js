window.addEventListener('DOMContentLoaded', () => {
    const cell = Array.from(document.querySelectorAll('.cell'));
    const turn = document.querySelector('.display-player');
    const done = document.querySelector('.player');
    const restartGame = document.querySelector('#reset');
    const winner = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            done.style.display = 'none';
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes('')) {
            done.style.display = 'none';
            announce(TIE);
        }
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                winner.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                winner.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                winner.innerText = 'Tie';
        }
        winner.classList.remove('hide');
    };

    const isValidAction = (cell) => {
        if (cell.innerText === 'X' || cell.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        turn.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turn.innerText = currentPlayer;
        turn.classList.add(`player${currentPlayer}`);
    }

    const userAction = (cell, index) => {
        if(isValidAction(cell) && isGameActive) {
            cell.innerText = currentPlayer;
            cell.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        winner.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        cell.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('playerX');
            cell.classList.remove('playerO');
        });

        done.style.display = 'block';
    }

    cell.forEach( (cell, index) => {
        cell.addEventListener('click', () => userAction(cell, index));
    });

    restartGame.addEventListener('click', resetBoard);
});
