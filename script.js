var playerBlue="B";
var playerYellow="Y";
var currentPlayer=playerBlue;
var gameOver=false;
var board;
var rows=6;
var coloumns=7;
window.onload=function(){
    setGame();
}
function setGame(){
    board=[];
    currentColoumns=[5,5,5,5,5,5,5]
    for(let r=0;r<rows;r++){
        let row=[];
        for(let c=0;c<coloumns;c++){
            row.push(' ');
            let tile=document.createElement("div");
            tile.id=r.toString()+"-"+c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click",setPiece);
            document.getElementById("board").append(tile);

        }
        board.push(row);

    }
}
function setPiece(){
    if(gameOver){
        return;
    }
    let coords=this.id.split("-");
    let r=parseInt(coords[0]);
    let c=parseInt(coords[1]);

    r=currentColoumns[c];
    
    if(r<0){
        return;
    }

    board[r][c]=currentPlayer;
    let tile=document.getElementById(r.toString()+"-"+c.toString());
    if(currentPlayer==playerBlue){
        tile.classList.add("blue-piece");
       currentPlayer=playerYellow;
    }
    else{
        tile.classList.add("yellow-piece");
        currentPlayer=playerBlue;
    }
    r-=1;
    currentColoumns[c]=r;
    checkWinner();

}

function checkWinner(){
    //horizontally
    for(let r=0;r<rows;r++){
        for(let c=0;c<coloumns-3;c++){
            if(board[r][c]!=' '){
                if(board[r][c]==board[r][c+1]&&board[r][c+1]==board[r][c+2]&&board[r][c+2]==board[r][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
    //vertically
    for(let c=0;c<coloumns;c++){
        for(let r=0;r<rows-3;r++){
            if(board[r][c]!=' '){
                if(board[r][c]==board[r+1][c]&&board[r+1][c]==board[r+2][c]&&board[r+2][c]==board[r+3][c]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
    //anti diagonal
    for(let r=0;r<rows-3;r++){
        for(let c=0;c<coloumns-3;c++){
            if(board[r][c]!=' '){
                if(board[r][c]==board[r+1][c+1]&&board[r+1][c+1]==board[r+2][c+2]&&board[r+2][c+2]==board[r+3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
    //diagonally
    for(let r=3;r<rows;r++){
        for(let c=0;c<coloumns-3;c++){
            if(board[r][c]!=' '){
                if(board[r][c]==board[r-1][c+1]&&board[r-1][c+1]==board[r-2][c+2]&&board[r-2][c+2]==board[r-3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
}
function setWinner(r,c){
    let winner=document.getElementById("winner");
    if(board[r][c]==playerBlue){
        winner.innerText="Blue Wins";

    }else{
        winner.innerText="Yellow wins";   
     }
     gameOver=true;
}