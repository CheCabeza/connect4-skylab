column = document.querySelectorAll(".column").forEach(item => {
    item.addEventListener("mouseover", changePieceColor)
    item.addEventListener("mouseleave", defaultPieceColor)
    item.addEventListener('click', fallFunction)
  });

  let turn = 0;

let boardScore =[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];


function fallFunction () {

  let foundFlag = false;


    for (i = 5; i >=0 ; i--) {

      
      if (boardScore[i][this.id] === 0 && foundFlag === false) {
  
        this.childNodes[1].classList.add(`fall${i + 1}`);
        
        if (turn % 2 === 1) {

          this.childNodes[1].classList.add("green")
          boardScore[i][this.id] = 2;
          checkWinner (i, parseInt(this.id), 2);
        }

        if (turn % 2 === 0) {
          
          this.childNodes[1].classList.add("red")
          boardScore[i][this.id] = 1;
          checkWinner (i, parseInt(this.id), 1);
        }  
        
        foundFlag = true;

      }


    }

    let newPiece = document.createElement("div");
    newPiece.classList.add('piece','hidden'); 
    if (turn % 2 === 1) {newPiece.classList.add('red')}
    if (turn % 2 === 0) {newPiece.classList.add('green')}
    this.insertBefore(newPiece, this.childNodes[1])
    setTimeout(() => {newPiece.classList.remove('hidden')}, 500); // hidden class until the animation finishes
    
    turn++;
}

function changePieceColor () {

  if (turn % 2 === 1) {
    this.childNodes[1].classList.add('green');
  }
  if (turn % 2 === 0) {
    this.childNodes[1].classList.add('red');
  }

}

function defaultPieceColor () {

  this.childNodes[1].classList.remove('red');
  this.childNodes[1].classList.remove('green');
  
}

function checkWinner (row, column, color) {
  
  let matchesH = 1;
  let matchesV = 1;
  let matchesD1 = 1;
  let matchesD2 = 1;
  
  const checkPieces = (row, column, color, matches, direction) => {

    if (Array.isArray(boardScore[row])) {

      if (boardScore[row][column] !== color) {return true}

      else { 

        switch (matches) {
          
          case "H": 
            matchesH += 1; 
          break;
          case "V": 
            matchesV += 1; 
          break;
          case "D2": 
            matchesD2 += 1; 
          break;
          case "D1": 
            matchesD1 += 1; 
          break;
          
        }

        
        switch (direction) {
          
          case "L": return checkPieces (row, column-1, color, "H", "L"); 
          case "R": return checkPieces (row, column+1, color, "H", "R");
          case "B": return checkPieces (row+1, column, color, "V", "B");
          case "TR": return checkPieces (row-1, column+1, color, "D2", "TR");
          case "TL": return checkPieces (row-1, column-1, color, "D1", "TL");
          case "BL": return checkPieces (row+1, column-1, color, "D2", "BL");
          case "BR": return checkPieces (row+1, column+1, color, "D1", "BR");
          
        }
        
      }
      
    } 
  }
  
  
  checkPieces (row, column-1, color, "H", "L"); //check pieces to the left
  checkPieces (row, column+1, color, "H", "R"); //check pieces to the right
  checkPieces (row+1, column, color, "V", "B"); //check pieces below
  checkPieces (row-1, column+1, color, "D2", "TR"); //check pieces to the top right
  checkPieces (row-1, column-1, color, "D1", "TL"); //check pieces to the top left
  checkPieces (row+1, column-1, color, "D2", "BL"); //check pieces below left
  checkPieces (row+1, column+1, color, "D1", "BR"); //check pieces below right
  
  if (matchesH >= 4 ||matchesV >= 4 ||matchesD2 >= 4 ||matchesD1 >= 4) {console.log (`EL JUGADOR ${color} ganó!!!`)}
  
}

  

