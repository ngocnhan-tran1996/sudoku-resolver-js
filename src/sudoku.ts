const SIZE = 9;

function solveSudoku(sudoku: number[][]): boolean {

  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (sudoku[row][col] === 0) {

        return findNumber(sudoku, row, col);
      }
    }
  }

  return true;
}

function findNumber(sudoku: number[][], row: number, col: number): boolean {

  const existedNumbers: boolean[] = [];
  for (let i = 0; i < SIZE; i++) {

    if (sudoku[row][i] !== 0) {

      existedNumbers[sudoku[row][i]] = true;
    }

    if (sudoku[i][col] !== 0) {

      existedNumbers[sudoku[i][col]] = true;
    }

    const startRow: number = Math.trunc(row / 3) * 3 + Math.trunc(i / 3);
    const startCol: number = Math.trunc(col / 3) * 3 + Math.trunc(i % 3);
    if (sudoku[startRow][startCol] !== 0) {

      existedNumbers[sudoku[startRow][startCol]] = true;
    }
  }

  for (let number = 1; number <= SIZE; number++) {

    if (existedNumbers[number]) {

      continue;
    }

    sudoku[row][col] = number; // Place number

    if (solveSudoku(sudoku)) {

      return true; // Solved
    }

    sudoku[row][col] = 0; // Backtrack
  }

  return false;
}

function validate(sudoku: number[][]): boolean {

  return checkRows(sudoku) && checkColumns(sudoku) && checkSquares(sudoku);
}

function checkRows(sudoku: number[][]): boolean {

  for (const values of sudoku) {

    const seen: boolean[] = [];
    for (const value of values) {

      if (value === 0) {

        continue;
      }

      if (seen[value]) {

        return false;
      }

      seen[value] = true;
    }
  }

  return true
}

function checkColumns(sudoku: number[][]): boolean {

  for (let col = 0; col < SIZE; col++) {

    const seen: boolean[] = [];
    for (let row = 0; row < SIZE; row++) {

      const number = sudoku[row][col];
      if (number !== 0) {

        if (seen[number]) {

          return false;
        }

        seen[number] = true;
      }
    }
  }

  return true;
}

function checkSquares(sudoku: number[][]): boolean {

  for (let block = 0; block < SIZE; block++) {

    const seen: boolean[] = [];
    const startRow = Math.trunc(block / 3) * 3;
    const startCol = Math.trunc(block % 3) * 3;
    for (let i = 0; i < SIZE; i++) {

      const row = startRow + Math.trunc(i / 3);
      const col = startCol + Math.trunc(i % 3);

      const number = sudoku[row][col];
      if (number !== 0) {

        if (seen[number]) {

          return false;
        }

        seen[number] = true;
      }
    }
  }

  return true;
}

function hasSameArray(a: number[][], b: number[][]): boolean {

  if (a.length === b.length) {

    return a.length === b.length && a.every((elements, i) => elements.every((element, j) => element === b[i][j]))
  }

  return false;
}

export {validate, solveSudoku, hasSameArray}