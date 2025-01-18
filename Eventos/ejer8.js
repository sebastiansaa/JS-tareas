import { shuffleArray } from '../utils/utils';
import Box from './Box';

class Game {
  #rows; // atr privados
  #cols;
  #idElement; // Es el div donde vamos a hacer el juego
  #boxes;
  element;

  constructor(rows, cols, idElement = "game") {
    this.#rows = rows; // Inicializamos atr privados
    this.#cols = cols;
    this.#idElement = idElement;
    this.element = document.getElementById(idElement);
    this.#boxes = [];
    this.createBoxes(); // función para crear las cajas
    this.paintBoxes(); // función para dar color a las boxes

    this.element.addEventListener("click", (event) => {
      this.checkOpenBoxes();
    });
  }

  get cols() { // getter para obtener n° de col
    return this.#cols; // nos da el n° de col
  }

  get rows() { // getter para obtener n° de rows
    return this.#rows; // nos da el n° de row
  }

  checkOpenBoxes() { // ver si las cajas están abiertas
    let nOpenBoxes = this.#boxes.filter((box) => box.open && box.free);
    if (nOpenBoxes.length === 2) {
      if (nOpenBoxes[0].color === nOpenBoxes[1].color) { // si los colores son iguales
        nOpenBoxes.forEach((box) => {
          box.free = false;
          // Acciones adicionales con box.element si es necesario
        });
      } else {
        setTimeout(() => {
          nOpenBoxes.forEach((box) => {
            box.resetColor();
          });
        }, 500);
      }
    }
  }

  createRandomColors() {
    let randomColors = [];
    for (let index = 0; index < (this.#cols * this.#rows / 2); index++) { // 15 colores
      let red = Math.floor(Math.random() * 256);
      let blue = Math.floor(Math.random() * 256);
      let green = Math.floor(Math.random() * 256);
      let color = `rgb(${red}, ${green}, ${blue})`;
      randomColors.push(color); // añadir color al array de colores
    }
    randomColors = [...randomColors, ...randomColors]; // duplicar el array
    shuffleArray(randomColors); // barajar el array
    return randomColors;
  }

  createBoxes() {
    let randomColors = this.createRandomColors();
    for (let row = 0; row < this.#rows; row++) {
      for (let col = 0; col < this.#cols; col++) {
        let color = randomColors.shift(); // obtener el primer color del array
        let newBox = new Box(row, col, color); // creamos una nueva box
        this.#boxes.push(newBox); // añadir la nueva box al array boxes
      }
    }
  }

  setSCCboxTemplates() { // setear el grid
    this.element.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
    this.element.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
  }

  paintBoxes() {
    this.setSCCboxTemplates();
    this.#boxes.forEach((box) => {
      let newBoxDiv = document.createElement("div"); // Crear DIV
      newBoxDiv.classList.add("box"); // dar clase "box"
      newBoxDiv.dataset.col = box.col; // dar atributos data
      newBoxDiv.dataset.row = box.row; // dar atributos data
      box.element = newBoxDiv; // set elemento de la box
      box.addEventClick(); // añadir evento click a la box
      this.element.appendChild(newBoxDiv); // añadir el div al tablero
    });
  }

  static getRowsCols() { // función estática, no necesita instanciarse
    let rows, cols;
    if (localStorage.getItem("rows") !== null && localStorage.getItem("cols") !== null) {
      rows = parseInt(localStorage.getItem("rows")); // sacar los datos del localStorage
      cols = parseInt(localStorage.getItem("cols"));
    } else {
      rows = parseInt(prompt("Introduce el número de filas"));
      cols = parseInt(prompt("Introduce el número de columnas"));
      while ((rows * cols) % 2 !== 0) {
        alert("El n° de filas y columnas debe ser par");
        rows = parseInt(prompt("Introduce el n° de filas"));
        cols = parseInt(prompt("Introduce el n° de columnas"));
      }
      localStorage.setItem("rows", rows); // guardarlas en el localStorage
      localStorage.setItem("cols", cols);
    }
    return {
      rows: rows,
      cols: cols
    };
  }
}

export default Game; // exportamos la class Game
