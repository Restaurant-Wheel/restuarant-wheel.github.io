const selectionTime = 3000;

let currentRestaurantIndex = 0;
const restaurantChangeTime = 100;
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
}
