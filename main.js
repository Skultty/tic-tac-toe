const gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;
    const setBoard = (index, value) => {
        board[index] = value;
    };
    return { getBoard, setBoard };
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
    const start = () => {
        render();
        squares.forEach((square, index) => {
            square.addEventListener('click', () => {
                if (board[index] === "") {
                    gameboard.setBoard(index, player1.getSymbol());
                    render();
                } 
            });
        });
    };
    return { start };
})();

game.start();