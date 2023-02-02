const gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;
    const setBoard = (index, value) => {
        board[index] = value;
    };
    const checkBoard = () => {
        // Check rows
        for (let i = 0; i < 9; i += 3) {
            if (board[i] === board[i + 1] && board[i + 1] === board[i + 2] && board[i] !== "") {
                return true;
            }
        }
        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board[i] === board[i + 3] && board[i + 3] === board[i + 6] && board[i] !== "") {
                return true;
            }
        }
        // Check diagonals
        if (board[0] === board[4] && board[4] === board[8] && board[0] !== "") {
            return true;
        }
        if (board[2] === board[4] && board[4] === board[6] && board[2] !== "") {
            return true;
        }
        return false;
    };

    return { getBoard, setBoard, checkBoard};
})();

const displayController = (() => {
    const board = gameboard.getBoard();
    const squares = document.querySelectorAll('.square');
    const render = () => {
        squares.forEach((square, index) => {
            square.textContent = board[index];
        });
    };
    return { render };
})();

const player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return { getName, getSymbol };
};

const game = (() => {
    const player1 = player("Player 1", "X");
    const player2 = player("Player 2", "O");
    const board = gameboard.getBoard();
    const squares = document.querySelectorAll('.square');
    const render = () => displayController.render();
    let turn = 0;
    const start = () => {
        render();
        squares.forEach((square, index) => {
            square.addEventListener('click', () => {
                if (board[index] === "") {
                    if (turn % 2 === 0) {
                        gameboard.setBoard(index, player1.getSymbol());
                    } else {
                        gameboard.setBoard(index, player2.getSymbol());
                    }
                    turn++;
                    render();
                    if (gameboard.checkBoard()) {
                        if (turn % 2 === 0) {
                            alert(`${player2.getName()} wins!`);
                        } else {
                            alert(`${player1.getName()} wins!`);
                        }
                    }
                }
            });
        });
    };
    return { start };
})();

game.start();