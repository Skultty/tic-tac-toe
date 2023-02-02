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

