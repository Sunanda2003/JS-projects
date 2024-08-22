let randomNumber = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');
const p = document.createElement('p');
//array -> for same guess value

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
  //avaible for game playing

  submit.addEventListener('click', function (e) {
    e.preventDefault(); //for keeping the value
    const guess = parseInt(userInput.value); // number displayed
    console.log(guess);
    validateGuess(guess); //passing to next
  });
}
function validateGuess(guess) {
  // 1-100
  if (isNaN(guess)) {
    alert('please enter a valid number');
  } else if (guess < 1) {
    alert('please enter a number more than 1');
  } else if (guess > 100) {
    alert('please enter a number less than 100');
  } else {
    prevGuess.push(guess); //array te push

    //last attempt/ gameover -> global scope so guess will increase
    if (numGuess === 11) {
      displayGuess(guess);
      displayMessage(`game Over. Random number was ${randomNumber}`); //bcoz global can check random number
      endGame();
    } else {
      displayGuess(guess); //guess list display
      checkGuess(guess); //check the guess (value is higher or lower)
    }
  }
}

function checkGuess(guess) {
  // random numeber equal ? high low
  if (guess === randomNumber) {
    displayMessage(`You guessed it right`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`number is tooo LOW`);
  } else if (guess > randomNumber) {
    displayMessage(`Number is Too HIGH`);
  }
}

function displayGuess(guess) {
  // value clean + update
  userInput.value = ''; //value cleanup
  guessSlot.innerHTML += `${guess},  `;
  numGuess++; //starting from 1 have to increase through cleanup
  remaining.innerHTML = `${11 - numGuess}`; // 11-num guesses ->printed
}

function displayMessage(message) {
  // message print
  lowOrHi.innerHTML = `<h2> ${message} </h2>`;
}

function endGame() {
  userInput.value = ''; //value clean
  userInput.setAttribute('disabled', ''); //No more values can be added
  p.classList.add('button'); //behave like button
  p.innerHTML = `<h2 id ="newGame"> Start new Game </h2>`;
  startOver.appendChild(p); //result p-> global scope
  playGame = false; //after 0 remaining
  newGame();
}

function newGame() {
  //
  const newgameButton = document.querySelector('#newGame');
  newgameButton.addEventListener('click', function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${11 - numGuess}`;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);

    playGame = true;
  });
}
