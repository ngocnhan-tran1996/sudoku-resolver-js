const square = [...Array(3).keys()];
const numbers = [...Array(9).keys()].map(i => i + 1);

function solveSudoku(sudoku: number[][], row: number, col: number): string | null {

  // valid sudoku
  const horizontalSudoku: number[][] = [];
  sudoku.forEach((values, row) => values.forEach((value, col) => {

    horizontalSudoku[col] = horizontalSudoku[col] ?? [];
    horizontalSudoku[col][row] = value
  }));
  if (validate(sudoku) || validate(horizontalSudoku) || validateSquare(sudoku)) {

    return "Trùng số ở hàng hoặc cột hoặc ô";
  }

  const lastRow = sudoku.length - 1;
  const lastCol = sudoku.length;
  if (row === lastRow && col === lastCol) {

    return null;
  }

  // If last column of the row go to the next row
  if (col === lastCol) {

    row++;
    col = 0;
  }

  if (sudoku[row][col] !== 0) {

    return solveSudoku(sudoku, row, col + 1);
  }

  const existedNumbers = new Set<number>();
  sudoku.forEach(
      (values, key) => {

        if (row === key) {

          values.forEach(value => addIgnoreZero(existedNumbers, value));
          return;
        }

        addIgnoreZero(existedNumbers, sudoku[key][col]);
      }
  )

  const startRow = row - (row % square.length);
  const startCol = col - (col % square.length);

  square.forEach(i => square.forEach(j => addIgnoreZero(existedNumbers, sudoku[startRow + i][startCol + j])));
  const solved = numbers.filter(i => !existedNumbers.has(i)).some(number => {

    sudoku[row][col] = number;
    if (solveSudoku(sudoku, row, col + 1)) {

      // reset value
      sudoku[row][col] = 0;
      return;
    }

    return true;
  });

  return solved ? null : "Không thể giải";
}

function addIgnoreZero(collection: Set<number>, element: number): void {

  if (element !== 0) {

    collection.add(element)
  }

}

function validate(sudoku: number[][]): boolean {

  return sudoku.some(values => {

    const rowNumbers = values.filter(value => value !== 0);
    return new Set<number>(rowNumbers).size < rowNumbers.length;
  });
}

function validateSquare(sudoku: number[][]): boolean {

  for (let row = 0; row < 3; row++) {

    const startRow = row * 3;
    for (let col = 0; col < 3; col++) {

      const existedNumbers: number[] = [];
      const startCol = col * 3;
      square.forEach(i => square.forEach(j => existedNumbers.push(sudoku[startRow + i][startCol + j])));

      // prevent duplicate value
      const rowNumbers = existedNumbers.filter(value => value !== 0);
      if (new Set(rowNumbers).size < rowNumbers.length) {

        return true;
      }
    }
  }

  return false;
}

function hasSameArray(a: number[][], b: number[][]): boolean {

  if (a.length === b.length) {

    return a.length === b.length && a.every((elements, i) => elements.every((element, j) => element === b[i][j]))
  }

  return false;
}

export {solveSudoku, hasSameArray}