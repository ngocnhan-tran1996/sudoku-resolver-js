import './style.css'
import {generateSudoku, reset, solve} from './layout.ts'

document.getElementById("app")!.innerHTML = `
  <div id="empty-result" style="text-align: center;text-transform: uppercase"></div>
  <div class="sudoku-container" id="sudoku-board"></div>
  <div class="buttons">
    <button id="reset">RESET</button>
    <button id="solve">RESOLVE</button>
  </div>
`;

generateSudoku();

reset(<HTMLButtonElement>document.getElementById("reset")!);
solve(<HTMLButtonElement>document.getElementById("solve")!);
