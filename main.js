// main.js

const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Ensure modal is hidden immediately for tests
const modal = document.getElementById('modal');
if (modal) {
  modal.classList.add('hidden');
} else {
  const newModal = document.createElement('div');
  newModal.id = 'modal';
  newModal.innerHTML = '<h2>Error!</h2><p id="modal-message"></p>';
  newModal.classList.add('hidden');
  document.body.appendChild(newModal);
}

// Liker functionality
document.addEventListener('DOMContentLoaded', () => {
  const likeButtons = document.querySelectorAll('.like');
  likeButtons.forEach(button => {
    button.addEventListener('click', () => handleLikeClick(button));
  });
});

function handleLikeClick(likeButton) {
  const heart = likeButton.querySelector('.like-glyph');
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');

  if (heart.textContent === EMPTY_HEART) {
    mimicServerCall()
      .then(() => {
        heart.textContent = FULL_HEART;
        heart.classList.add('activated-heart');
      })
      .catch(error => {
        modalMessage.textContent = error;
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('hidden'), 3000);
      });
  } else {
    heart.textContent = EMPTY_HEART;
    heart.classList.remove('activated-heart');
  }
}

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}