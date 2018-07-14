let restaurants = new Array()

function Restaurant(place, user) {
  this.place = place
  this.user = user
}

function parseSubmissions(tsv) {
  // Prep the misformed JSON string to be a TSV
  tsv = tsv.substring(1, tsv.length - 2);
  tsv = tsv.replace(/(?:\\[r]+)/g, "");
  tsv = tsv.replace(/(?:\\[t]+)/g, "\t");
  tsv = tsv.replace(/(?:\\[n]+)/g, "\n");

  // Let Papa do the heavy lifting <3
  let submissions = Papa.parse(tsv)
  console.log("Parsed submissions:\n")
  console.log(submissions)

  submissions = submissions.data

  // Parse into custom object
  for (var i = 1; i < submissions.length; i++) {
    // submission := [timestamp, email, restaurants]
    email = submissions[i][1]

    // Papi <333
    preferredPlaces = Papa.parse(submissions[i][2]).data

    // Papa parse assigns the values to the first
    // row of a matrix since it expects an entire csv
    preferredPlaces = preferredPlaces[0]

    // We want restaurants to map to users, not users to restaurants
    for (var j = 0; j < preferredPlaces.length; j++) {
      restaurant = new Restaurant(preferredPlaces[j], email)
      restaurants.push(restaurant)
    }

    console.log("Parsed input from user " + email)
  }

  restaurants = knuthShuffle(restaurants)

  console.log("Shuffled restaurants:")
  console.log(restaurants)
}
