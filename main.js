const gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const setBoard = (index, value) => {
    board[index] = value;
  };
  const checkBoard = () => {
    // Check rows
    for (let i = 0; i < 9; i += 3) {
      if (
        board[i] === board[i + 1] &&
        board[i + 1] === board[i + 2] &&
        board[i] !== ""
      ) {
        return true;
      }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[i] === board[i + 3] &&
        board[i + 3] === board[i + 6] &&
        board[i] !== ""
      ) {
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

  const resetBoard = () => {
    for (let i = 0; i < 9; i++) {
      board[i] = "";
    }
  };
  return { getBoard, setBoard, checkBoard, resetBoard };
})();

const displayController = (() => {
  const board = gameboard.getBoard();
  const squares = document.querySelectorAll(".square");
  const render = () => {
    squares.forEach((square, index) => {
      square.textContent = board[index];
      square.classList.add("full");
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
  const squares = document.querySelectorAll(".square");
  const render = () => displayController.render();
  let turn = 0;
  let gameover = false;
  const start = () => {
    render();
    squares.forEach((square, index) => {
      square.addEventListener("click", () => {
        if (board[index] === "" && !gameover) {
          if (turn % 2 === 0) {
            gameboard.setBoard(index, player1.getSymbol());
          } else {
            gameboard.setBoard(index, player2.getSymbol());
          }
          turn++;
          render();
          if (gameboard.checkBoard()) {
            if (turn % 2 === 0) {
              document.querySelector("#winnerModal").classList.add("show");
              let p = document.createElement("p");
              p.textContent = player2.getName() + " wins!";
              document.querySelector("#winnerModal").appendChild(p);
            } else {
              document.querySelector("#winnerModal").classList.add("show");
              let p = document.createElement("p");
              p.textContent = player1.getName() + " wins!";
              document.querySelector("#winnerModal").appendChild(p);
            }
            gameover = true;
          }
          if (turn === 9 && !gameover) {
            document.querySelector("#winnerModal").classList.add("show");
            let p = document.createElement("p");
            p.textContent = "It's a tie!";
            document.querySelector("#winnerModal").appendChild(p);
            gameover = true;
          }
        }
      });
    });
  };
  const reset = () => {
    gameboard.resetBoard();
    turn = 0;
    gameover = false; 
    document.querySelector("#winnerModal").classList.remove("show");
    document.querySelector("#winnerModal").innerHTML = "";
    render();
  };
  return { start, reset };
})();

game.start();

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
  game.reset();
});
