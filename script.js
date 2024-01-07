function Gameboard() {   
    const gameBoard = [];
    const rows = 3;
    const cols = 3;
    const getBoard = () => gameBoard;
    const setBoard = () => {
        for(let i = 0; i < rows; i++) {
            gameBoard[i] = [];
            for(let j = 0; j < cols; j++) {
                gameBoard[i].push(0);
            }
        }
    }
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
                eventControl.removeTokenListener();
            }
            row++;
        }

        // //check cols
        let col = 0;
        for(let i=0; i<3; i++) {
            const column = board.getBoard().map(element => element[col]);
            if(column.every(isTrue)) {
                game.announceWinner();
                eventControl.removeTokenListener();
            }
            col++;
        }
        
        // //check diag back
        let diagIncrement = 0;
        const diagBack = board.getBoard().map((element) => element[diagIncrement++]);
        if(diagBack.every(isTrue)){
            game.announceWinner();
            eventControl.removeTokenListener();
        } 
        
        //check diag forward
        let diagDecrement = 2;
        const diagForward = board.getBoard().map((element) => element[diagDecrement--]);
        if(diagForward.every(isTrue)) {
            game.announceWinner();
            eventControl.removeTokenListener();
        } 
    }
    return { getBoard, setBoard, dropToken, displayBoard, checkWinner }
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
    //add default Next token to display
    
        
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
    
    const nextToken = () => {
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
        const selectResult = document.getElementById('result');
        // const selectToken = document.getElementById('token');
        getPlayers().map(player => {
            if(player.token === game.nextToken()) {
                selectResult.innerText = `The winner is: ${player.name}`;
            }
        })
    }

    const cleanup = () => {
        board.setBoard();
        displayControl.nextToken();
        displayControl.setCells('');
        eventControl.addTokenToDisplay();
        displayControl.result()
    }
    
    return { startup, getPlayers, getPlayerOne, getPlayerTwo, switchTurn, nextToken, announceWinner, playTurn, cleanup }
}

function displayController() {
    const nextToken = () => {
        const selectToken = document.getElementById('token');
        game.getPlayers().map(player => {
            if(player.token !== game.nextToken()) {
                selectToken.innerText = `Next token: ${player.token}`;    
            }
        })
    }


    const setCells = (value) => {
        const selectCells = document.querySelectorAll('.cell');
        selectCells.forEach(cell => cell.innerText = value)
    }

    const result = () => {
        const selectResult = document.getElementById('result');
        selectResult.innerText = 'Game in progress';
    }

    return { nextToken, setCells, result }
}

function eventController() {
    const selectCells = document.querySelectorAll('.cell');
    const listenerFunc = function() {
        game.playTurn(this.id);
            if(this.innerText === '' || this.innerText === game.nextToken()){
                this.innerText = game.nextToken();
                displayControl.nextToken(); 
            }
    }
    const addTokenToDisplay = () => {    
        selectCells.forEach(cell => {
            cell.addEventListener('click', listenerFunc);
        })
    }
    const removeTokenListener = () => {
        selectCells.forEach(cell => {
            cell.removeEventListener('click', listenerFunc);
        })
    }

    const addRestartBtnListener = () => {
        const selectBtn = document.getElementById('start');
        selectBtn.addEventListener('click', () => {
            game.cleanup();
        })
    }
    
    return { addTokenToDisplay, removeTokenListener, addRestartBtnListener }
}

const board = Gameboard();
const game = Game();
board.setBoard()
const eventControl = eventController();
const displayControl = displayController();
displayControl.nextToken();
eventControl.addTokenToDisplay();
eventControl.addRestartBtnListener()








