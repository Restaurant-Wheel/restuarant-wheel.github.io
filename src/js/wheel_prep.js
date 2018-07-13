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
    // timestamp, email, restaurants
    email = submissions[i][1]

    // Papi <333
    preferred_places = Papa.parse(submissions[i][2]).data

    // We want restaurants to map to users, not users to restaurants
    for (var j = 0; j < preferred_places.length; j++) {
      restaurant = new Restaurant(preferred_places[j], email)
      restaurants.push(restaurant)
    }

    console.log("Parsed input from user " + email)
    console.log(preferred_places)
  }
}
