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
    const checkWinner = () => {
        const isTrue = (element) => element === game.nextToken();
        //check rows
        let row = 0;
        for(let i=0; i<3; i++){
            if(board.getBoard()[row].every(isTrue)){
                game.announceWinner();
            }
            row++;
        }

        // //check cols
        let col = 0;
        for(let i=0; i<3; i++) {
            const column = board.getBoard().map(element => element[col]);
            if(column.every(isTrue)) {
                game.announceWinner();
            }
            col++;
        }
        
        // //check diag back
        let diagIncrement = 0;
        const diagBack = board.getBoard().map((element) => element[diagIncrement++]);
        if(diagBack.every(isTrue)) game.announceWinner();
        
        //check diag forward
        let diagDecrement = 2;
        const diagForward = board.getBoard().map((element) => element[diagDecrement--]);
        if(diagForward.every(isTrue)) game.announceWinner();
    }
    return { getBoard, dropToken, displayBoard, checkWinner }
}

function Player(name, token, nextTurn) { 
    const play = (cellNumber) => {
        board.dropToken(cellNumber);
        board.checkWinner();
        game.switchTurn();
    }
    
    return { name, token, nextTurn, play }
}

function Game() {
    const playerOne = Player('this guy', 'o', true);
    const playerTwo = Player('that guy', 'x', false);
    
    const startup = () => {
        eventControl.addTokenToDisplay();
    }

    const getPlayers = () => {
        return [playerOne, playerTwo];
    }
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

    const playTurn = (cellNumber) => {
        if(playerOne.nextTurn === true) {
            game.getPlayerOne().play(Number(cellNumber));
        }
        else {
            game.getPlayerTwo().play(Number(cellNumber));
        }
    }
    const announceWinner = () => {
        getPlayers().map(player => {
            if(player.token === game.nextToken()) {
                console.log(`and the winner is: ${player.name}`);
            }
        })
    }

    const cleanup = () => {
        eventControl.removeTokenListener();
    }

    
    return { startup, getPlayers, getPlayerOne, getPlayerTwo, switchTurn, nextToken, announceWinner, playTurn, cleanup }
}

function eventController() {
    const selectCells = document.querySelectorAll('.cell');
    const listenerFunc = function() {
        game.playTurn(this.id);
            console.log(this.innerText)
            if(this.innerText === '' || this.innerText === game.nextToken()){
                this.innerText = game.nextToken(); 
            }
    }
    const addTokenToDisplay = () => {    
        selectCells.forEach(cell => {
            cell.addEventListener('click', listenerFunc)
        })
    }
    const removeTokenListener = () => {
        selectCells.forEach(cell => {
            cell.removeEventListener('click', listenerFunc);
        })
    }
    return { addTokenToDisplay, removeTokenListener }
}


const board = Gameboard();
const game = Game();
const eventControl = eventController();
eventControl.addTokenToDisplay();









