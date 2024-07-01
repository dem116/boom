
const userInput = document.getElementById('userInput');
const countdownDisplay = document.getElementById('countdown');
const resultDisplay = document.getElementById('result');
const restartButton = document.getElementById('restart');

let userNumber;
let randomNum;

function startGame() {
  userNumber = Number(userInput.value);

  countdownDisplay.textContent = "5";
  resultDisplay.textContent = "";

  const countdownPromise = new Promise((resolve) => {
    let countdown = 5;
    const countdownInterval = setInterval(() => {
      countdown -= 1;
      countdownDisplay.textContent = countdown;
      if (countdown === 0) {
        clearInterval(countdownInterval);
        resolve();
      }
    }, 5000); //---> son mas de 5seg en ambos (????)
  });

  countdownPromise.then(() => {
    randomNum = Math.floor(Math.random() * 3) + 1;
    return checkResult();
  });
}

function checkResult() { //---> compara los numeros 
  return new Promise((resolve) => {
    setTimeout(() => {
      if (userNumber === randomNum) {
        resultDisplay.textContent = `¡Has salvado el mundo! Número elegido: ${userNumber}, Número correcto: ${randomNum}`;
      } else {
        resultDisplay.textContent = `¡Boom! La bomba ha estallado. Número elegido: ${userNumber}, Número correcto: ${randomNum}`;
      }
      resolve();
    }, 5000);
  });
}

function restartGame() {
  userInput.value = '';
  countdownDisplay.textContent = '5';
  resultDisplay.textContent = '';
  randomNum = null;
  userNumber = null;
}

userInput.addEventListener('change', startGame); //--->evento que inicia todo al hacer cambio en el input (el num de usuario)

restartButton.addEventListener('click', restartGame); ///el evento para click en el boton reiniciar y su funcion de borrar todo
