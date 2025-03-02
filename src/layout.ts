import {solveSudoku} from "./sudoku.ts";

const sudokuId = "sudoku-element-";
const lastColIndex = 8;

function generateSudoku(): void {

  const board = document.getElementById("sudoku-board");
  const cells: HTMLInputElement[] = [];

  for (let i = 0; i < 81; i++) {
    let input = document.createElement("input");
    input.id = sudokuId + i;
    input.type = "text";
    input.maxLength = 1;
    input.classList.add("cell");
    input.setAttribute("autocomplete", "off");

    // for mobile
    input.inputMode = "numeric";

    input.addEventListener("keydown", function (event) {

      if (/^[1-9]$/.test(event.key)) {

        this.value = event.key;
        event.preventDefault();
      }

      const index = cells.indexOf(this);
      switch (event.key) {

        case "ArrowRight":

          if (index % 9 < lastColIndex) {

            cells[index + 1].focus();
            break;
          }

          cells[index - lastColIndex].focus();
          break;

        case "ArrowLeft":

          if (index % 9 > 0) {

            cells[index - 1].focus();
            break;
          }

          cells[index + lastColIndex].focus();
          break;

        case "ArrowDown":

          if (index < 72) {

            cells[index + 9].focus();
            break;
          }

          cells[index - 72].focus();
          break;

        case "ArrowUp":

          if (index > lastColIndex) {

            cells[index - 9].focus();
            break;
          }

          cells[index + 72].focus();
          break;

        case "Backspace":
        case "Delete":
          this.value = "";
          break;

        case "Tab":
          cells[index].focus();
          break;

        default:
          this.value = "";
          event.preventDefault();
          break;
      }
    });

    board!.appendChild(input);
    cells.push(input);
  }
}

function solve(element: HTMLButtonElement): void {

  element.addEventListener('click', () => {

    let row = 0;
    let col = 0;
    const sudoku: number[][] = [];
    document.querySelectorAll<HTMLInputElement>(`input[id^='${sudokuId}']`).forEach((input, index) => {

      if (sudoku[row]?.length === 9) {

        row++;
      }

      if (index % 9 === 0) {

        sudoku[row] = [];
        col = 0;
      }

      sudoku[row][col] = input.value === "" ? 0 : Number(input.value);
      col++;
    })

    const isEmptySudoku = sudoku.every(values => values.every(value => value === 0));
    if (isEmptySudoku) {

      document.getElementById("empty-result")!.innerHTML = "<div>Please input your sudoku</div>"
      return;
    }

    solveSudoku(sudoku, 0, 0)?.forEach((values, resultRow) =>
        values.forEach((value, resultCol) => document.querySelector<HTMLInputElement>("#" + sudokuId + (resultRow * 9 + resultCol))!.value = String(value))
    )

    document.querySelector<HTMLDivElement>('#empty-result')!.innerHTML = "";
  });
}

function reset(element: HTMLButtonElement): void {

  element.addEventListener('click', () => {
    document.querySelectorAll<HTMLInputElement>(`input[id^='${sudokuId}']`).forEach(input => input.value = '');
    document.querySelector<HTMLDivElement>('#empty-result')!.innerHTML = "";
  })
}

export {generateSudoku, solve, reset}