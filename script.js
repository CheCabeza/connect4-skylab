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
    newPiece.classList.add('piece');
    newPiece.classList.add('hidden'); 
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







function checkWinner (row, column,color) {
  
  let matchesH = 1;
  let matchesV = 1;
  let matchesD1 = 1;
  let matchesD2 = 1;

  console.log(`${row} --- ${column} --- ${color}`);

  const checkLeft = (row, column, color) => {

    if (boardScore[row][column-1] !== color) return;
    matchesH++;
    return checkLeft(row, column-1, color);  
  }

  const checkRight = (row, column, color) => {
    if (boardScore[row][column+1] !== color) return;;
    matchesH++;
    console.log(`horizontal ${matchesH}`);
    return checkRight(row, column+1, color);  
  }
  
  const checkTopLeft = (row, column, color) => {

    if (boardScore[row+1][column+1] !== color) {return;}
    else {
    matchesD1++;
    console.log(`D1 ${matchesD1}`);
    return checkTopLeft(row-1, column-1, color);  
    }
  }

  const checkTopRight = (row, column, color) => {

    
    if (boardScore[row+1][column+1] !== color) {return;}
    else {

      matchesD2++;
      console.log(`D2 ${matchesD2}`);
      return checkTopRight(row-1, column+1, color);  

    }
  }

  const checkBelowLeft = (row, column, color) => {
    
     if (boardScore[row+1][column+1] !== color) {return;}
      else {

        matchesD2++;
        console.log(`D2 ${matchesD2}`);
        return checkBelowLeft(row+1, column-1, color);  

      }
  
  }

  const checkBelowRight = (row, column, color) => {
  
  
    if (boardScore[row+1][column+1] !== color) {return;}
    else {

      matchesD1++;
      console.log(`D1 ${matchesD1}`);
      return checkBelowRight(row+1, column+1, color);  

    }

  }

  const checkBelow = (row, column, color) => {
  
    if (boardScore[row+1][column+1] !== color) {return;}
    else {

      matchesV++;
      console.log(`V ${matchesV}`);
      return checkBelowRight(row+1, column, color);  

    }

}


  checkLeft (row, column, color)
  checkRight (row, column, color);
  checkBelow (row, column, color)
  checkTopRight (row, column, color)
  checkTopLeft (row, column, color)
  checkBelowLeft (row, column, color)
  checkBelowRight (row, column, color)


  if (matchesH >= 4 || matchesD1 >= 4 || matchesD2 >= 4 || matchesV >= 4) {console.log (`EL JUGADOR ${color} ganó!!!`)}

}

  

