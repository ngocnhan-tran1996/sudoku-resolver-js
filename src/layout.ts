import {hasSameArray, solveSudoku} from "./sudoku.ts";

const sudokuId: string = "sudoku-element-";
const lastColIndex: number = 8;
const sudokuInputs = (): NodeListOf<HTMLInputElement> => document.querySelectorAll<HTMLInputElement>(`input[id^='${sudokuId}']`);
const onlyDigitValidator = (value: string) => /^[1-9]$/.test(value);

function generateSudoku(): void {

  const board = document.getElementById("sudoku-board");
  const cells: HTMLInputElement[] = [];

  for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.id = sudokuId + i;
    input.type = "text";
    input.maxLength = 1;
    input.autocomplete = "off";
    input.classList.add("cell");

    // for mobile
    input.inputMode = "numeric";

    input.addEventListener("input", function (this: HTMLInputElement & { oldValue: string }) {

      if (onlyDigitValidator(this.value)) {

        this.oldValue = this.value;
        return;
      }

      if (this.hasOwnProperty("oldValue")) {

        this.value = this.oldValue;
        return;
      }

      this.value = "";
    });

    input.addEventListener("keydown", function (event) {

      if (/^[1-9]$/.test(event.key)) {

        this.value = event.key;
        this.classList.add("filled");
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
          this.classList.remove("filled");
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

    for (const [index, input] of sudokuInputs().entries()) {

      if (index !== 0 && index % 9 === 0) {

        row++;
        col = 0;
      }

      sudoku[row] = sudoku[row] ?? [];

      if (input.value !== "" && !onlyDigitValidator(input.value)) {

        displayNotification("Sudoku chỉ chứa toàn số");
        return;
      }

      sudoku[row][col] = input.value === "" ? 0 : Number(input.value);
      col++;
    }

    const isEmptySudoku = sudoku.every(values => values.every(value => value === 0));
    if (isEmptySudoku) {

      displayNotification("Hãy nhập vài số");
      return;
    }

    const backupSudoku = structuredClone(sudoku);
    const start = performance.now();
    const result = solveSudoku(sudoku, 0, 0)
    const end = performance.now();
    if (!hasSameArray(sudoku, backupSudoku)) {

      displayNotification(`Thời gian: ${(end - start).toFixed(2)} mili giây`);
      sudoku.forEach((values, resultRow) =>
          values.forEach((value, resultCol) => {

            if (value !== 0) {

              const input = <HTMLInputElement>document.getElementById(sudokuId + (resultRow * 9 + resultCol))!;
              input.value = String(value);
              input.disabled = true;
            }
          })
      )
      return;
    }

    if (result) {

      displayNotification(result);
    }
  });
}

function reset(element: HTMLButtonElement): void {

  element.addEventListener('click', () => {

    sudokuInputs().forEach(input => {

      input.value = ""
      input.classList.remove("filled");
      input.disabled = false;
    });
  })
}

function hideNotification(element: HTMLButtonElement): void {

  element.addEventListener('click', () => {

    const notification = <HTMLDivElement>document.getElementById("notification");
    notification.style.display = "none";
  });
}

function displayNotification(content: string) {

  document.getElementById("notification-text")!.innerText = content;
  const notification = <HTMLDivElement>document.getElementById("notification");
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

export {generateSudoku, solve, reset, hideNotification}