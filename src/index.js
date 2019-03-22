let result = [];
let sector_boundaries = [[0, 0, 2, 2], [0, 3, 2, 5], [0, 6, 2, 8], [3, 0, 5, 2], [3, 3, 5, 5], [3, 6, 5, 8], [6, 0, 8, 2], [6, 3, 8, 5], [6, 6, 8, 8]]; // [row_top, column_top, row_bottom, column_bottom]
let length_array = 9;

function getOptions(row, column, matrix){
  let objOccurence = {"0" : 0, "1" : 0, "2" : 0, "3" : 0, "4" : 0, "5" : 0, "6" : 0, "7" : 0, "8" : 0, "9" : 0};
  let options = [];
  let sector = 0;

  //search options in row
  matrix[row].forEach(function(element){
    objOccurence[element] = objOccurence[element] + 1;
    });
  
  //search options in column
  for (let row = 0; row < length_array; row++){
    let temp = matrix[row][column];
    objOccurence[temp] = objOccurence[temp] + 1;
  }

  //search options in sector
  if (Math.floor(row / 3) === 0) sector = Math.floor(column / 3) + 1;
    else if (Math.floor(row / 3) === 1) sector = Math.floor(column / 3) + 4;
    else if (Math.floor(row / 3) === 2) sector = Math.floor(column / 3) + 7;
  
  let scopeSector = sector_boundaries[sector-1]; 
  
    for (let row = scopeSector[0]; row <= scopeSector[2]; row++){
    for (let column = scopeSector[1]; column <= scopeSector[3]; column++){
      let temp = matrix[row][column];
      objOccurence[temp] = objOccurence[temp] + 1;  
    }
  }
  //remove unsuitable options

  Object.keys(objOccurence).forEach(function(element){
    if (objOccurence[element] === 0) options.push(Number.parseInt(element));
  });
  
  return options;
}

//Check cell
function cellCheck(matrix){
  let changes;
  do{
    changes = false;
    for (let row = 0; row < length_array; row++){
      for (let column = 0; column < length_array; column++){
        if (matrix[row][column] === 0){
          let options = getOptions(row, column, matrix);
          if (options.length === 0) return false;
          else if (options.length === 1){
            matrix[row][column] = options[0];
            changes = true;
            break;
          }
          else continue; 
        }
      }
    }
  } while (changes);

  return true;
}

function solution(matrix, row, column){
  //copying array
  var arrayBackUp = [];
  matrix.forEach(function(element){arrayBackUp.push(element.slice())});

  if (!(cellCheck(arrayBackUp))) return false;

  for (row; row < length_array; row++){
    for (column; column < length_array; column++){
      if (arrayBackUp[row][column] === 0){
        let options = getOptions(row, column, arrayBackUp);
        if (options.length === 0) return false;
        for (let i = 0; i < options.length; i++){
          arrayBackUp[row][column] = options[i];
          let result = solution(arrayBackUp, row, column);
          if (result) {
            return true;
          } else if (i === (options.length - 1)){
            return false;
          } else continue;
        }
      }
    }
    column = 0;
  }
  result = arrayBackUp;
  return true;
}

module.exports = function solveSudoku(matrix) {
  var bool = solution(matrix, 0, 0);
  if (!bool) return 0;
  else return result;
}