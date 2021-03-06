let restaurants = [];

function Restaurant(place, user) {
  this.place = place;
  this.user = user;
}

function parseSubmissions(tsv) { // eslint-disable-line no-unused-vars
  // Prep the misformed JSON string to be a TSV
  tsv = tsv.substring(1, tsv.length - 1);
  tsv = tsv.replace(/(?:\\[r])/g, '');
  tsv = tsv.replace(/(?:\\[t])/g, '\t');
  tsv = tsv.replace(/(?:\\[n])/g, '\n');

  // Let Papa do the heavy lifting <3
  let submissions = Papa.parse(tsv);
  console.log('Parsed submissions:\n');
  console.log(submissions);

  submissions = submissions.data;

  const allRestaurants = {};
  const dislikes = {};

  // Parse into custom object
  for (let i = 1; i < submissions.length; i++) {
    // submission := [timestamp, email, restaurants, dislikes, superlike, superdislike]
    [, email, newRestaurants, newDislikes, superlike, superdislike] = submissions[i];

    if (newDislikes) {
      const parsedDislikes = Papa.parse(newDislikes).data[0];
      for (let j = 0; j < parsedDislikes.length; j++) {
        dislikePlace(parsedDislikes[j].trim(), dislikes);
      }
    }

    // Papi <333
    preferredPlaces = Papa.parse(newRestaurants).data;

    // Papa parse assigns the values to the first
    // row of a matrix since it expects an entire csv
    preferredPlaces = preferredPlaces[0]; // eslint-disable-line prefer-destructuring

    if (superlike) {
      for (let j = 0; j < 3; j++) {
        preferredPlaces.push(superlike);
      }
    }

    if (superdislike) {
      for (let j = 0; j < 3; j++) {
        dislikePlace(superdislike, dislikes);
      }
    }

    // We want restaurants to map to users, not users to restaurants
    for (let j = 0; j < preferredPlaces.length; j++) {
      const restaurant = preferredPlaces[j].trim();
      if (restaurant in allRestaurants) {
        allRestaurants[restaurant].push(email);
      } else {
        allRestaurants[restaurant] = [email];
      }
    }

    console.log(`Parsed input from user ${email}`);
  }

  console.log('Initial restaurant parsing:');
  console.log(allRestaurants);
  console.log('Dislikes:');
  console.log(dislikes);
  // Remove disliked restaurants
  Object.keys(dislikes).forEach((dislikedPlace) => {
    if (dislikedPlace in allRestaurants) {
      if (allRestaurants[dislikedPlace].length <= dislikes[dislikedPlace]) {
        allRestaurants[dislikedPlace] = [];
      } else {
        // Remove elements equal to the number of dislikes
        allRestaurants[dislikedPlace].splice(0, dislikes[dislikedPlace]);
      }
    }
  });

  // Parse the restaurants
  Object.keys(allRestaurants).forEach((restaurantName) => {
    const emails = allRestaurants[restaurantName];
    for (let i = 0; i < emails.length; i++) {
      restaurants.push(new Restaurant(restaurantName, emails[i]));
    }
  });

  restaurants = knuthShuffle(restaurants);

  console.log('Shuffled restaurants:');
  console.log(restaurants);
}

function dislikePlace(newDislike, dislikes) {
  if (newDislike in dislikes) {
    dislikes[newDislike] += 1;
  } else {
    dislikes[newDislike] = 1;
  }
}
