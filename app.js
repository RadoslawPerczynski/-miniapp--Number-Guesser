//UI
let guessInput = document.querySelector('#number-input'),
  minField = document.querySelector('.min'),
  maxField = document.querySelector('.max'),
  attemptsField = document.querySelector('.attempts')
  btn = document.querySelector('input[type="submit"]'),
  container = document.querySelector('.container'),
  messageParagraph = document.querySelector('.message');


  //game
  let min = 2,
    max = 8,
    winningNumber = getRandomNumber(min, max),
    numberOfAttempts = 3,
    userAttempts = [];

minField.textContent = min;
maxField.textContent = max;
attemptsField.textContent = numberOfAttempts;


btn.addEventListener('click', processTheGuess);
showIfGuessNumberDuplicated();


function showIfGuessNumberDuplicated() {
  guessInput.addEventListener('input', function() {

    let CurrentNumber = parseInt(guessInput.value);
    let CurrentAttempts = userAttempts;
    console.log(CurrentNumber);
    console.log(CurrentAttempts);
    console.log(CurrentAttempts.indexOf(CurrentNumber))

    if(CurrentAttempts.indexOf(CurrentNumber) === -1) {
      console.log('allowed')
    } else {
      console.log('not allowerd')
    }

   
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
    winNotification()
  }
  else {
    userAttempts.push(guessValue);
    goToNextAttempt();
  }

}

function winNotification() {
  setMessage(true, 'Congrats! ;) You won!')
  guessInput.disabled = true;
  playAgain()
}
function goToNextAttempt(e) {

  numberOfAttempts--;
  guessInput.value = "";
  guessInput.focus();
  setMessage(false, `Fail. ${numberOfAttempts} attempts left.`)
  if(numberOfAttempts === 0) {
    gameOver()

  }

}
function gameOver() {
  setMessage(false, `Game over. The correct number was ${winningNumber}. Your numbers: ${userAttempts.join(' | ')}`);
  guessInput.disabled = true;
  playAgain();
}

function setMessage(win, message) {

  win===true ? messageParagraph.style.color = 'green' : messageParagraph.style.color = 'red'
  win===true ? guessInput.style.borderColor = 'green' : guessInput.style.borderColor = 'red'
  messageParagraph.textContent = message;

}
function playAgain() {
  btn.value = 'Play again';
  const playAgainClass = 'play-again';

  btn.classList.add(playAgainClass);
  let playAgainButton = document.querySelector("."+playAgainClass);
  btn.removeEventListener('click', processTheGuess);

  playAgainButton.addEventListener('click', function() {
    window.location.reload();
  })

}
function getRandomNumber(min, max) {
  let randomNum = Math.random()*(max-min+1)+min;

  return Math.floor(randomNum);
}

    
