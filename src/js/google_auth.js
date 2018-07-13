// Client ID and API key from the Developer Console
const CLIENT_ID = '1091611837858-sbt44ue42qsqtuf975kd5548nodal0sf';
const API_KEY = 'AIzaSyDzC_2TZeWjkzrzFg3ZtSRP-kT8cB3LsvU';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// Authorization scopes required by the API
const SCOPES = 'profile https://www.googleapis.com/auth/drive.readonly';

function startApp() {
    console.log("Starting app...");
    gapi.load('client:auth2:picker', function () {
        initClient();
        initAuth2();
    });
};

/**
 * Used to ping the sheets API
 */
function initClient() {
    console.log("Initializing client...");
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS
    });
}

/**
 * Auth2 is needed for a specialized sign in button
 */
function initAuth2() {
    console.log("Initializing auth2...");
    // Used for the specialized sign in button
    gapi.auth2.init({
        client_id: CLIENT_ID + '.apps.googleusercontent.com',
        scope: SCOPES
    });
    attachSignin(document.getElementById('signInButton'));
}

/**
 * Sets up a custom Google sign in button
 * @param {The page element to turn into a google sign in button} element
 */
function attachSignin(element) {
    console.log("Attaching Google sign in to " + element.id + "...");
    var auth = gapi.auth2.getAuthInstance();
    // $("#signInButton").click(() => {
    //     $("#signInButton").text("Authorizing...").attr("disabled", "true");
    //     setTimeout(() => {
    //         $("#signInButton").text("Login with Google").attr("disabled", null);
    //     }, 6000)
    // });
    auth.attachClickHandler(element, {},
        function (googleUser) {
            console.log("Signed in: " + googleUser.getBasicProfile().getName());
            createPicker(googleUser);
        },
        function (error) {
            alert(JSON.stringify(error, undefined, 2));
        });
}

/**
 * Create and render a Picker object for picking the google spreadsheet to parse
 * @param {Contains data on the user logged in to Google} googleUser
 */
function createPicker(googleUser) {
    console.log("Creating file picker...");
    new google.picker.PickerBuilder()
        .addView(google.picker.ViewId.SPREADSHEETS)
        .setOAuthToken(googleUser.getAuthResponse().access_token)
        .setDeveloperKey(API_KEY)
        .setCallback(pickerCallback)
        .build()
        .setVisible(true);
}

/**
 * Run after the user picks a spreadsheets in the file picker
 * @param {The file picked} data
 */
function pickerCallback(data) {
    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
        var doc = data[google.picker.Response.DOCUMENTS][0];
        console.log("Selected document with name: " + doc.name);
        getFile(doc.id);
    }
}

/**
 * Imports the csv contents of the Google spreadsheet
 * @param {The drive id of the file to retreive} id
 */
function getFile(id) {
    console.log("Retreiving file with ID: " + id);
    // $("#signInButton").text("Importing...");
    gapi.client.drive.files.export({
            fileId: id,
            mimeType: "text/tab-separated-values"
        }).then(function (response) {
            console.log("File imported:\n" + JSON.stringify(response.body));
            parseSubmissions(JSON.stringify(response.body))
        })
        .catch(err => console.log(err));
}
