const selectionTime = 3000;
const restaurantChangeTime = 100;
const resetTime = 500;

let currentRestaurantIndex = 0;
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

function startSelection() { // eslint-disable-line no-unused-vars
  console.log('Selecting a restaurant...');

  // Hide the button that was just clicked
  const selectorElement = document.getElementById('selector-button');
  selectorElement.style.display = 'none';

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
  const textElement = document.getElementById('selector-text');
  textElement.innerText = restaurants[currentRestaurantIndex].place;
  currentRestaurantIndex++;

  if (currentRestaurantIndex >= restaurants.length) {
    currentRestaurantIndex = 0;
  }
}

function endSelection() {
  console.log('In end selection.');
  clearInterval(restaurantChangeInterval);

  const restartButton = document.getElementById('restart-button');
  restartButton.style.display = 'block';
  restartButton.style.textAlign = 'center';
}

function restartSelection() {
  console.log('Resetting selection...');

  const restartButton = document.getElementById('restart-button');
  restartButton.style.display = 'none';

  // Shrink the text back down
  const textElement = document.getElementById('selector-text');
  textElement.classList.remove('grow');
  textElement.classList.add('shrink');

  document.body.classList.remove('green');
  document.body.classList.add('red');

  setTimeout(startSelection, resetTime)
}
