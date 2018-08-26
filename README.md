# Restaurant Selector
This project is hosted at [garj4.github.io/restaurant](https://garj4.github.io/restaurant/).

It attempts to solve the age old question: 'Where should we eat?' and selects a restaurant based off of what places the group is in the mood for at that specific time.

## Usage
Each person in the group fills out a Google form in which they check the places they're ok with eating at at that time.
The Google form has a preset list of restaurants that we decided on earlier.

Once the form is filled out, the project created here will pull the data from Google sheets.
The user then clicks start, a 3 second countdown runs, and the program selects a restaurant based off of the users' entries.

Each time a user selects a restaurant on the Google form, one entry for that restaurant is added to the list to select from.
Users can also add other suggestions in the 'other' field on the Google form.
All of the chosen restaurants are then shuffled (with a Knuth shuffle).
This shuffled list is cycled through when choosing a place to eat.

The email of each user is recorded and displayed if one of their submissions is selected.

The Google form can be found [here](https://docs.google.com/forms/d/e/1FAIpQLSdZ-b8Flj8sAlHStgYjk1LJGkCD0PhUiAq3Jy_hA3mCcJF_bg/viewform?usp=sf_link).
