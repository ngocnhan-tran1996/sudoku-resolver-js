import './style.css'
import {generateSudoku, hideNotification, reset, solve} from './layout.ts'

document.getElementById("app")!.innerHTML = `
  <div class="notification" id="notification">
    <span id="notification-text"></span>
    <button class="close-btn">✖</button>
  </div>
  <div class="sudoku-container" id="sudoku-board"></div>
  <div class="buttons">
    <button id="reset">RESET</button>
    <button id="solve">RESOLVE</button>
  </div>
`;

generateSudoku();

reset(<HTMLButtonElement>document.getElementById("reset")!);
solve(<HTMLButtonElement>document.getElementById("solve")!);
hideNotification(<HTMLButtonElement>document.getElementById("notification")!)
