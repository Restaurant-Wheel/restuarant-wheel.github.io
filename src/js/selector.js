const selectionTime = 3000;
const restaurantChangeTime = 100;
const resetTime = 500;

let restaurantIndex = 0;
let countdownNum = 3;
let restaurantChangeInterval;

function setupSelector() { // eslint-disable-line no-unused-vars
  console.log('Setting up selector.');
  // Hide the sign in element
  const initElement = document.getElementById('init');
  initElement.style.display = 'none';

  // Display the selector element
  const selectorElement = document.getElementById('selector');
  selectorElement.style.display = 'block';
}

function countdown() {
  console.log('Beginning Countdown...');

  // Hide the button that was just clicked
  const selectorButton = document.getElementById('selector-button');
  selectorButton.style.display = 'none';

  const countdownElement = document.getElementById('countdown');
  countdownNum = 3;
  countdownElement.innerText = countdownNum;
  countdownElement.style.display = 'block';

  changeNum = setInterval(() => {
    console.log('In change num.');
    countdownNum--;
    countdownElement.innerText = countdownNum;

    if (countdownNum <= 0) {
      countdownElement.style.display = 'none';
      clearInterval(changeNum);
      startSelection();
    }
  }, 1000);
}

function startSelection() { // eslint-disable-line no-unused-vars
  console.log('Selecting a restaurant...');
  const textElement = document.getElementById('selector-text');

  // The shrink class is added when you reset the selector
  if (textElement.classList.contains('shrink')) {
    textElement.classList.remove('shrink');
  }

  textElement.classList.add('grow');

  document.body.classList.remove('red');
  document.body.classList.add('green');

  // Set up the first restaurant
  cycleRestaurant();

  restaurantChangeInterval = setInterval(cycleRestaurant, restaurantChangeTime);
  setTimeout(endSelection, selectionTime);
}

function cycleRestaurant() {
  console.log('In cycle restaurant.');
  restaurantIndex++;

  if (restaurantIndex >= restaurants.length) {
    restaurantIndex = 0;
  }

  const textElement = document.getElementById('selector-text');
  if (restaurants.length === 0) {
    textElement.innerText = 'No restaurants....';
  } else {
    textElement.innerText = restaurants[restaurantIndex].place;
  }
}

function endSelection() {
  console.log('In end selection.');
  clearInterval(restaurantChangeInterval);

  const restartButton = document.getElementById('restart-button');
  restartButton.style.display = 'block';

  const userElement = document.getElementById('user');
  userElement.style.display = 'block';
  userElement.innerText = restaurants[restaurantIndex].user;
}

function restartSelection() { // eslint-disable-line no-unused-vars
  console.log('Resetting selection...');

  const restartButton = document.getElementById('restart-button');
  restartButton.style.display = 'none';

  const userElement = document.getElementById('user');
  userElement.style.display = 'none';

  // Shrink the text back down
  const textElement = document.getElementById('selector-text');
  textElement.classList.remove('grow');
  textElement.classList.add('shrink');

  document.body.classList.remove('green');
  document.body.classList.add('red');

  setTimeout(countdown, resetTime);
}
