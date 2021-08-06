const choiceArray = ['rock', 'scissors', 'paper'];
const emojiArray = ['✊🏼', '✌🏼', '🖐🏼'];
const userChoiceArray = document.querySelectorAll('.game__item');
const resfreshGame = document.querySelector('.game__refresh span');

const userItem = document.querySelector('.user-item');
const computerItem = document.querySelector('.computer-item');
const resultMessage = document.querySelector('.result-message');

const determineWinner = (userChoice, computerChoice) => {
  if (computerChoice === 'rock') {
    if (userChoice === 'rock') {
      return 'Tie!';
    } else if (userChoice === 'scissors') {
      return 'You lose';
    } else if (userChoice === 'paper') {
      return 'You win!';
    }
  } else if (computerChoice === 'scissors') {
    if (userChoice === 'rock') {
      return 'You win!';
    } else if (userChoice === 'scissors') {
      return 'Tie!';
    } else if (userChoice === 'paper') {
      return 'You lose';
    }
  } else if (computerChoice === 'paper') {
    if (userChoice === 'rock') {
      return 'You lose';
    } else if (userChoice === 'scissors') {
      return 'You win!';
    } else if (userChoice === 'paper') {
      return 'Tie!';
    }
  }
};

const showGameResult = (e) => {
  const randomNumber = Math.floor(Math.random() * choiceArray.length);
  const computerChoice = choiceArray[randomNumber];

  const userChoiceEmoji = e.target.innerText;
  const userChoice = choiceArray[emojiArray.indexOf(userChoiceEmoji)];

  userItem.innerText = userChoiceEmoji;
  computerItem.innerText = emojiArray[randomNumber];

  const result = determineWinner(userChoice, computerChoice);
  resultMessage.innerHTML = `<p>${result}</p>`;
};

for (const choice of userChoiceArray) {
  choice.addEventListener('click', showGameResult);
}

const refreshGame = () => {
  userItem.innerText = '';
  computerItem.innerText = '';
  resultMessage.innerHTML = '';
};

resfreshGame.addEventListener('click', refreshGame);
