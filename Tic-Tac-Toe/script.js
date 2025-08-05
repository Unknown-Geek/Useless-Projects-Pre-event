let currPlayer='X';
let gameBoard=Array(9).fill('');
let gameActive=true;
let gameMode='two-player';
let aiPlayer='O';
let humanPlayer='X';

const winningCombinations=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function setGameMode(mode){
    gameMode=mode;
    document.querySelectorAll('.mode-button').forEach(button=>{
        button.classList.remove('active');
    });
    document.querySelector(`[onClick="setGameMode('${mode}')"]`).classList.add('active');
    resetGame();
}
function createBoard(){
    const board=document.getElementById('board');
    board.innerHTML='';
    for(let i=0;i<9;i++){
        const cell=document.createElement('div');
        cell.className='cell';
        cell.setAttribute('data-index',i);
        cell.addEventListener('click',handleCellClick);
        board.appendChild(cell);
    }
}

function updateStatus(){
    const status=document.getElementById('status');
    if(checkWinner()){
        status.textContent=`${currPlayer} wins!`;
    }
    else if(gameBoard.every(cell=>cell!=='')){
        status.textContent="It's a draw!";
    }
    else{
        status.textContent=`${currPlayer}'s turn`;
    }
}

function handleCellClick(event){
    const index=event.target.getAttribute('data-index');
    if(!gameActive || gameBoard[index]!=='') return;
    makeMove(index);
    if(gameMode==='ai' && gameActive && currPlayer===aiPlayer){
        setTimeout(makeAIMove,500);
    }   
}

function makeMove(index){
    gameBoard[index]=currPlayer;
    const cell=document.querySelector(`[data-index="${index}"]`);
    cell.textContent=currPlayer;
    cell.classList.add(currPlayer.toLowerCase());

    if(checkWinner()){
        gameActive=false;
        highlightWinningCells();
        updateStatus();
        return;
    }
    if(gameBoard.every(cell=>cell!=='')){
        updateStatus();
        return;
    }
    currPlayer=currPlayer==='X'?'O':'X';
    updateStatus();
}

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
    const availableCorners=corners.filter(i=>gameBoard[i]==='');
    if(availableCorners.length>0){
        makeMove(availableCorners[Math.floor(Math.random() * availableCorners.length)]);
        return;
    }
    const availableMoves=gameBoard.map((cell,index)=>cell===''?index:null).filter(cell=>cell!==null);
    if(availableMoves.length>0){
        makeMove(availableMoves[Math.floor(Math.random() * availableMoves.length)]);
    }

}
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
function checkWinner(){
    return winningCombinations.some(combo=>{
        return combo.every(index=>{
            return gameBoard[index]===currPlayer;
        });
    });
}

function highlightWinningCells(){
    winningCombinations.forEach(combo=>{
        if(combo.every(index=>gameBoard[index]===currPlayer)){
            combo.forEach(index=>{
                document.querySelector(`[data-index="${index}"]`).classList.add('winner');
            });
        }
    });
}

function resetGame(){
    gameBoard=Array(9).fill('');
    currPlayer='X';
    gameActive=true;
    document.getElementById('status').textContent="X's turn";
    const board=document.getElementById('board');
    board.innerHTML='';
    createBoard();
}
createBoard();

