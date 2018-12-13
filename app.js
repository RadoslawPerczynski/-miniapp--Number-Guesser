//UI
let guessInput = document.querySelector('#number-input'),
  minField = document.querySelector('.min'),
  maxField = document.querySelector('.max'),
  attemptsField = document.querySelector('.attempts')
  btn = document.querySelector('input[type="submit"]'),
  container = document.querySelector('.container'),
  messageParagraph = document.querySelector('.message'),
  currentNumberField = document.querySelector('.current-number'),
  attemptIndex = document.querySelector('.attempt-index'),
  warning = document.querySelector('#warning');

//game
let min = 1,
  max = 15,
  winningNumber = getRandomNumber(min, max),
  numberOfAttempts = 6,
  userAttempts = [];

//showing instruction
minField.textContent = min;
maxField.textContent = max;
attemptsField.textContent = numberOfAttempts;

//start
btn.addEventListener('click', processTheGuess);
showWarningIfGuessNumberDuplicated();

function getRandomNumber(min, max) {
  let randomNum = Math.random()*(max-min+1)+min;

  return Math.floor(randomNum);
}

function showWarningIfGuessNumberDuplicated() {
  guessInput.addEventListener('input', function() {

    let currentNumber = parseInt(guessInput.value);
    currentNumberField.textContent = currentNumber;
    attemptIndex.textContent = userAttempts.indexOf(currentNumber)+1;
    userAttempts.indexOf(currentNumber) != -1 ? warning.style.opacity = "1" : warning.style.opacity = "0";
       
  })
}


function processTheGuess(e) {
  e.preventDefault();

  let guessValue = parseInt(guessInput.value);

  if(isNaN(guessValue) || guessValue > max || guessValue < min) {
    guessInput.focus();
    return setMessage(false, `Incorrect input. Your number must be between ${min} and ${max}`); 
  }

  if(guessValue === winningNumber) {
    setMessage(true, 'Congrats! ;) You won!')
    guessInput.disabled = true;
    prepareToPlayAgain()
  }
  else {
    userAttempts.push(guessValue);
    goToNextAttempt();
  }

}

function goToNextAttempt(e) {

  numberOfAttempts--;
  guessInput.value = "";
  guessInput.focus();
  setMessage(false, `Wrong guess. ${numberOfAttempts} attempts left.`)

  if(numberOfAttempts === 0) {
    gameOver()
  }

}
function gameOver() {

  setMessage(false, `Game over. The correct number was ${winningNumber}. Your numbers: ${userAttempts.join(' | ')}`);
  guessInput.disabled = true;
  prepareToPlayAgain();

}

function setMessage(win, message) {

  win===true ? messageParagraph.style.color = 'green' : messageParagraph.style.color = 'red'
  win===true ? guessInput.style.borderColor = 'green' : guessInput.style.borderColor = 'red'
  messageParagraph.textContent = message;

}
function prepareToPlayAgain() {
  btn.value = 'Play again';
  btn.removeEventListener('click', processTheGuess);

  btn.addEventListener('click', function() {
    window.location.reload();
  })

}



    
