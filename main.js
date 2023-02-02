const gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;
    const setBoard = (index, value) => {
        board[index] = value;
    };
    return { getBoard, setBoard };
})();

