let currPlayer='X'; //who starts the game
let gameBoard=Array(9).fill(''); //represents the game board
let gameActive=true; //tracks if the game is ongoing
let gameMode='two-player'; //tracks the current game mode
let aiPlayer='O'; 
let humanPlayer='X'; 

const winningCombinations=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]; //all possible winning combinations


//sets the game mode
function setGameMode(mode){ 
    gameMode=mode;
    document.querySelectorAll('.mode-button').forEach(button=>{
        button.classList.remove('active');          //remove active class from all buttons
    });
    document.querySelector(`[onClick="setGameMode('${mode}')"]`).classList.add('active');      //add active class to the selected button
    resetGame();    // reset the game when mode changes
}


function updateStatus(){    
    const status=document.getElementById('status'); // get the status element
    if(checkWinner()){
        status.textContent=`${currPlayer} wins!`;   // display the winner
    }
    else if(gameBoard.every(cell=>cell!=='')){
        status.textContent="It's a draw!";  // display draw message
    }
    else{
        status.textContent=`${currPlayer}'s turn`;  // display the current player's turn
    }
}

// Handles the click event on a cell
function handleCellClick(event){
    const index=event.target.getAttribute('data-index');    // get the index of the clicked cell
    if(!gameActive || gameBoard[index]!=='') return;    // if the game is not active or the cell is already filled, do nothing
    makeMove(index);    // make the move    
    if(gameMode==='ai' && gameActive && currPlayer===aiPlayer){ // if AI mode is active and it's AI's turn
        setTimeout(makeAIMove,500); // make AI move after a short delay
    }   
}

// Makes a move by updating the game board and the UI
function makeMove(index){
    gameBoard[index]=currPlayer;  // update the game board with the current player's symbol  
    const cell=document.querySelector(`[data-index="${index}"]`);   // get the cell element
    cell.textContent=currPlayer;    // update the cell's text content
    cell.classList.add(currPlayer.toLowerCase());   // add the current player's class to the cell for styling

    if(checkWinner()){  // check if the current player has won
        gameActive=false;   // set the game as inactive
        highlightWinningCells();    
        updateStatus();
        return;
    }
    if(gameBoard.every(cell=>cell!=='')){   // check if the game is a draw
        updateStatus(); // update the status to show draw
        return;
    }
    currPlayer=currPlayer==='X'?'O':'X';    // switch to the other player
    updateStatus();
}

// Makes the AI move by finding the best move for the AI player
// It first checks if there is a winning move available for the AI
// If not, it checks if it needs to block the human player from winning
// If neither is available, it plays in the center if possible, then in a corner, and finally in any available cell
// The AI's move is made by calling makeMove with the chosen index
function makeAIMove(){
    const winningMove=findBestMove(aiPlayer);  
    if(winningMove!==-1){   
        makeMove(winningMove);  
        return;
    }
    const blockingMove=findBestMove(humanPlayer);   
    if(blockingMove!==-1){ 
        makeMove(blockingMove);
        return;
    }
    if(gameBoard[4]===''){
        makeMove(4);
        return;
    }
    const corners=[0,2,6,8];
    const availableCorners=corners.filter(i=>gameBoard[i]==='');    // filter available corners
    if(availableCorners.length>0){
        makeMove(availableCorners[Math.floor(Math.random() * availableCorners.length)]);    // choose a random corner
        return;
    }
    const availableMoves=gameBoard.map((cell,index)=>cell===''?index:null).filter(cell=>cell!==null);   // get all available moves
    if(availableMoves.length>0){
        makeMove(availableMoves[Math.floor(Math.random() * availableMoves.length)]);    // choose a random available move
    }

}

// Finds the best move for the given player
// It checks each winning combination to see if the player can win in the next move
// If it finds a combination where the player has two cells and one empty, it returns the index of the empty cell
// If no such move is found, it returns -1
function findBestMove(player){
    for(let combo of winningCombinations){
        const cells=combo.map(i=>gameBoard[i]);
        const playerCells=cells.filter(cell=>cell===player).length;
        const emptyCells=cells.filter(cell=>cell==='').length;

        if(playerCells===2 && emptyCells===1){
            return combo[cells.findIndex(cell=>cell==='')];
        }
    }
    return -1;
}

// Checks if the current player has won the game
// It iterates through all winning combinations and checks if all cells in any combination match the current player's symbol
// If a winning combination is found, it returns true; otherwise, it returns false
function checkWinner(){
    return winningCombinations.some(combo=>{
        return combo.every(index=>{
            return gameBoard[index]===currPlayer;
        });
    });
}

// Highlights the winning cells by adding a 'winner' class to them
// It iterates through all winning combinations and checks if the current player has won
// If a winning combination is found, it adds the 'winner' class to each cell in that combination
function highlightWinningCells(){
    winningCombinations.forEach(combo=>{
        if(combo.every(index=>gameBoard[index]===currPlayer)){
            combo.forEach(index=>{
                document.querySelector(`[data-index="${index}"]`).classList.add('winner');
            });
        }
    });
}

// Resets the game board and UI for a new game
// It clears the game board array, resets the current player to 'X', and sets the game as active
// It also updates the status text to indicate that it's 'X's turn
// Finally, it clears the text content of all cells and resets their classes
function resetGame() {
  gameBoard = Array(9).fill('');
  currPlayer = 'X';
  gameActive = true;
  document.getElementById('status').textContent = "X's turn";

  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell'; // reset all classes
  });
}
document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

