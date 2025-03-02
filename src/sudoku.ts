const square = [...Array(3).keys()];
const numbers = Array.from({length: 9}, (_, i) => i + 1);

export function solveSudoku(sudoku: number[][], row: number, col: number): number[][] | null {

  const lastRow = sudoku.length - 1;
  const lastCol = sudoku.length;
  if (row === lastRow && col === lastCol) {

    return sudoku;
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

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);

  square.forEach(i => square.forEach(j => addIgnoreZero(existedNumbers, sudoku[startRow + i][startCol + j])));
  const solved = numbers.filter(i => !existedNumbers.has(i)).some(number => {

    sudoku[row][col] = number;
    if (solveSudoku(sudoku, row, col + 1)) {
      return true;
    }

    // reset value
    sudoku[row][col] = 0;
  });

  return solved ? sudoku : null;
}

function addIgnoreZero(collection: Set<number>, element: number): void {

  if (element !== 0) {

    collection.add(element)
  }

}