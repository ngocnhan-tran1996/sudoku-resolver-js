import './style.css'
import {generateSudoku, reset, solve} from './layout.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="sudoku-container" id="sudoku-board"></div>
  <div class="buttons">
    <button id="reset">RESET</button>
    <button id="solve">RESOLVE</button>
  </div>
  <div id="empty-result" style="text-align: center"></div>
`;

generateSudoku();

reset(document.querySelector<HTMLButtonElement>('#reset')!);
solve(document.querySelector<HTMLButtonElement>('#solve')!);
