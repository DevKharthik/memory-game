const cardsArray = [
    { name: 'A', id: 1 },
    { name: 'A', id: 2 },
    { name: 'B', id: 3 },
    { name: 'B', id: 4 },
    { name: 'C', id: 5 },
    { name: 'C', id: 6 },
    { name: 'D', id: 7 },
    { name: 'D', id: 8 },
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    const shuffledCards = shuffle(cardsArray.concat(cardsArray)); // Double the cards for pairs

    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;

        const frontFace = document.createElement('div');
        frontFace.classList.add('front');
        frontFace.innerText = card.name;

        const backFace = document.createElement('div');
        backFace.classList.add('back');
        backFace.innerText = '?';

        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);
        gameBoard.appendChild(cardElement);

        cardElement.addEventListener('click', flipCard);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
    matches++;

    if (matches === cardsArray.length) {
        setTimeout(() => alert('You Won!'), 500);
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

createBoard();
