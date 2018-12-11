//UI
let guessInput = document.querySelector('#number-input'),
  minField = document.querySelector('.min'),
  maxField = document.querySelector('.max'),
  btn = document.querySelector('input[type="submit"]'),
  container = document.querySelector('.container'),
  messageParagraph = document.querySelector('.message');


  //game

  let min = 2,
  max = 11,
  btnText = btn.value,
  winningNumber = 3,
  numberOfAttempts = 3;

minField.textContent = min;
maxField.textContent = max;

btn.addEventListener('click', processTheGuess);

function processTheGuess(e) {
  e.preventDefault();
  let guessValue = parseInt(guessInput.value);

  if(isNaN(guessValue) || guessValue > max || guessValue < min) {
    return setMessage(false, `Incorrect input. Your number must be between ${min} and ${max}`)
  }


  if(guessValue === winningNumber) {
    winNotification()
  }
  else {
    processAttempt();


    if(numberOfAttempts === 0) {
      gameOver();
      
    }
  }

}

function winNotification() {
  setMessage(true, 'Congrats! ;) You won!')
  btn.disabled = true;
  guessInput.disabled = true;
  playAgain()
}
function processAttempt() {
  numberOfAttempts--;
  setMessage(false, `Fail. ${numberOfAttempts} attempts left.`)

  if(numberOfAttempts === 0) {
    gameOver()

  }

}
function gameOver() {
  setMessage(false, `Game over. The correct number was ${winningNumber}`);

  playAgain();
}

function setMessage(win, message) {

  win===true ? messageParagraph.style.color = 'green' : messageParagraph.style.color = 'red'

  win===true ? guessInput.style.borderColor = 'green' : guessInput.style.borderColor = 'red'

  messageParagraph.textContent = message;

}
function playAgain() {
  
}


    
