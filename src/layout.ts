import {solveSudoku} from "./sudoku.ts";

const sudokuId: string = "sudoku-element-";
const lastColIndex: number = 8;
const emptyResultDiv = (): HTMLDivElement => document.querySelector<HTMLDivElement>('#empty-result')!;
const sudokuInputs = (): NodeListOf<HTMLInputElement> => document.querySelectorAll<HTMLInputElement>(`input[id^='${sudokuId}']`);

function generateSudoku(): void {

  const board = document.getElementById("sudoku-board");
  const cells: HTMLInputElement[] = [];

  for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.id = sudokuId + i;
    input.type = "text";
    input.maxLength = 1;
    input.classList.add("cell");
    input.setAttribute("autocomplete", "off");

    // for mobile
    input.inputMode = "numeric";

    input.addEventListener("keydown", function (event) {

      document.getElementById("empty-result").innerHTML= `eventKey ${event.key} - eventCode - ${event.code} - ${event.charCode}  - ${event.which}`
      if (/^[1-9]$/.test(event.key)) {

        this.value = event.key;
        event.preventDefault();
        return;
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
    sudokuInputs().forEach((input, index) => {

      if (index !== 0 && index % 9 === 0) {

        row++;
        col = 0;
      }

      sudoku[row] = sudoku[row] ?? [];
      sudoku[row][col] = input.value === "" ? 0 : Number(input.value);
      col++;
    })

    const isEmptySudoku = sudoku.every(values => values.every(value => value === 0));
    if (isEmptySudoku) {

      emptyResultDiv().innerText = "Please input your sudoku"
      return;
    }

    const result = solveSudoku(sudoku, 0, 0)
    if (result) {

      emptyResultDiv().innerText = "";
      result.forEach((values, resultRow) =>
          values.forEach((value, resultCol) => document.querySelector<HTMLInputElement>("#" + sudokuId + (resultRow * 9 + resultCol))!.value = String(value))
      )
      return;
    }

    emptyResultDiv().innerText = "Could not solve sudoku";
  });
}

function reset(element: HTMLButtonElement): void {

  element.addEventListener('click', () => {

    emptyResultDiv().innerText = "";
    sudokuInputs().forEach(input => input.value = "");
  })
}

export {generateSudoku, solve, reset}