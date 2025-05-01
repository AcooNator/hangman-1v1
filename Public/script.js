const socket = io();
const wordDisplay = document.getElementById('wordDisplay');
const keyboard = document.getElementById('keyboard');
const message = document.getElementById('message');

let guessedLetters = [];

socket.on('updateWord', (displayWord) => {
  wordDisplay.textContent = displayWord;
});

socket.on('gameOver', (msg) => {
  message.textContent = msg;
  keyboard.innerHTML = '';
});

function createKeyboard() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  letters.split('').forEach(letter => {
    const btn = document.createElement('button');
    btn.textContent = letter;
    btn.addEventListener('click', () => {
      socket.emit('guess', letter);
      btn.disabled = true;
    });
    keyboard.appendChild(btn);
  });
}

createKeyboard();
