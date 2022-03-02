let deckId;
let computerScoreboard = 0;
let myScoreboard = 0;
const cards = document.getElementById('cards');
const newDeck = document.getElementById('new-deck');
const drawCards = document.getElementById('draw-card');
const header = document.getElementById('header');
const remainingCards = document.getElementById('number-of-cards');
const computerScore = document.getElementById('computerScore');
const myScore = document.getElementById('myScore');
const reset = document.getElementById('reset');

function newDeckHandler() {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      drawCards.disabled = false;
      header.style.display = 'block';
      drawCards.style.display = 'block';
      newDeck.style.display = 'none';
      remainingCards.textContent = `Remaining: ${data.remaining}`;
    });
}

newDeck.addEventListener('click', newDeckHandler);

function drawCardHandler() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      cards.children[0].innerHTML = `<img src =${data.cards[0].image}>`;
      cards.children[1].innerHTML = `<img src= ${data.cards[1].image}>`;
      const changeHeaderText = cardWinner(data.cards[0], data.cards[1]);
      header.textContent = changeHeaderText;
      remainingCards.textContent = `Remaining: ${data.remaining}`;
      computerScore.textContent = `Computer Score: ${computerScoreboard}`;
      myScore.textContent = `My Score: ${myScoreboard}`;
      if (data.remaining === 0) {
        drawCards.disabled = true;
        reset.style.display = 'block';
        if (computerScoreboard > myScoreboard) {
          header.textContent = 'Computer wins war!';
        } else if (computerScoreboard < myScoreboard) {
          header.textContent = 'You win war!';
        } else {
          header.textContent = "It's a tie game!";
        }
      }
    });
}

drawCards.addEventListener('click', drawCardHandler);

function cardWinner(card1, card2) {
  const cardValue = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'JACK',
    'QUEEN',
    'KING',
    'ACE',
  ];
  const card1Index = cardValue.indexOf(card1.value);
  const card2Index = cardValue.indexOf(card2.value);
  if (card1Index > card2Index) {
    computerScoreboard++;
    return 'Computer Wins!';
  } else if (card2Index > card1Index) {
    myScoreboard++;
    return 'You Win!';
  } else {
    return 'War!';
  }
}

function resetGameHandler() {
  deckId;
  computerScoreboard = 0;
  myScoreboard = 0;
  remainingCards.textContent = '';
  cards.children[0].innerHTML = '';
  cards.children[1].innerHTML = '';
  computerScore.textContent = '';
  myScore.textContent = '';
  drawCards.style.display = 'none';
  reset.style.display = 'none';
  newDeck.style.display = 'block';
  header.style.display = 'none';
}

reset.addEventListener('click', resetGameHandler);
