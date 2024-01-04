function Gameboard() {   
    const gameBoard = [];
    const rows = 3;
    const cols = 3;
    for(let i = 0; i < rows; i++) {
        gameBoard[i] = [];
        for(let j = 0; j < cols; j++) {
            gameBoard[i].push(0);
        }
    }
    const getBoard = () => gameBoard;
    const dropToken = (cellValue) => {
        let incrementor = 0;
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                if(incrementor === cellValue) {
                    //check available cells
                    if(gameBoard[i][j] === 0) {
                        gameBoard[i][j] = game.nextToken();
                    }
                    else {
                        console.log('bruh');
                        game.switchTurn();
                    }
                }
                incrementor++;
            }
        }
    }
    const displayBoard = () => console.log(gameBoard)
    return { getBoard, dropToken, displayBoard }
}

function Player(name, token, nextTurn) { 
    const play = (cellNumber) => {      
        board.dropToken(cellNumber);
        game.checkWinner();
        game.switchTurn();    
    }
    return { name, token, nextTurn, play }
}

function Game() {   
    const playerOne = Player('this guy', 'o', true);
    const playerTwo = Player('that guy', 'x', false);
    const displayPlayers = () => console.log(playerOne, playerTwo);
    const getPlayerOne = () => playerOne;
    const getPlayerTwo = () => playerTwo;
    const switchTurn = () => {
        playerOne.nextTurn = !playerOne.nextTurn;
        playerTwo.nextTurn = !playerTwo.nextTurn;
    }
    const nextToken = function() {
        if(playerOne.nextTurn === true) {
            return playerOne.token;
        }
        return playerTwo.token;
    }
    const checkWinner = () => {
        const isTrue = (element) => element === game.nextToken();
        //check rows
        // let row = 0;
        // for(let i=0; i<3; i++){
        //     if(board.getBoard()[row].every(isTrue)){
        //         console.log('win');
        //     }
        //     row++;
        // }   
        // //check cols
        // let col = 0;
        // for(let i=0; i<3; i++) {
        //     const column = board.getBoard().map(element => element[col]);
        //     if(column.every(isTrue)) {
        //         console.log('win');
        //     }
        //     col++;
        // }
        
        // //check diag back
        let diag = 0;
        const diagBack = board.getBoard().map((element) => {
            element[diag];
            diag++;
        });
        // diag++;
        console.log(diagBack)
        
        // diag = 2;
        // board.getBoard().map(element => {
        //     console.log(element[diag]);
        //     diag--;
        // })
    }
    const announceWinner = () => {
        //
    }
    board.displayBoard();
    return { getPlayerOne, getPlayerTwo, switchTurn, displayPlayers, nextToken, checkWinner, announceWinner }
}

const board = Gameboard();
const game = Game();

game.getPlayerOne().play(0);
game.getPlayerOne().play(1);
game.getPlayerOne().play(4);
game.getPlayerOne().play(5);
game.getPlayerOne().play(8);
// game.getPlayerOne().play(5);
// game.getPlayerOne().play(6);
// game.getPlayerOne().play(7);
// game.getPlayerOne().play(8);









