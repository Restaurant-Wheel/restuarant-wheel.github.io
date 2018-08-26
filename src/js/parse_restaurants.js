let restaurants = [];

function Restaurant(place, user) {
  this.place = place;
  this.user = user;
}

function parseSubmissions(tsv) { // eslint-disable-line no-unused-vars
  // Prep the misformed JSON string to be a TSV
  tsv = tsv.substring(1, tsv.length - 1);
  tsv = tsv.replace(/(?:\\[r]+)/g, '');
  tsv = tsv.replace(/(?:\\[t]+)/g, '\t');
  tsv = tsv.replace(/(?:\\[n]+)/g, '\n');

  // Let Papa do the heavy lifting <3
  let submissions = Papa.parse(tsv);
  console.log('Parsed submissions:\n');
  console.log(submissions);

  submissions = submissions.data;

  // Parse into custom object
  for (let i = 1; i < submissions.length; i++) {
    // submission := [timestamp, email, restaurants]
    [, email, submittedRestaurants] = submissions[i];

    // Papi <333
    preferredPlaces = Papa.parse(submittedRestaurants).data;

    // Papa parse assigns the values to the first
    // row of a matrix since it expects an entire csv
    preferredPlaces = preferredPlaces[0]; // eslint-disable-line prefer-destructuring

    // We want restaurants to map to users, not users to restaurants
    for (let j = 0; j < preferredPlaces.length; j++) {
      restaurant = new Restaurant(preferredPlaces[j], email);
      restaurants.push(restaurant);
    }

    console.log(`Parsed input from user ${email}`);
  }

  restaurants = knuthShuffle(restaurants);

  console.log('Shuffled restaurants:');
  console.log(restaurants);
}
