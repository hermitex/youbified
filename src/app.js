// const decodeJwtResponse=(credentials)=>credentials;
// function handleCredentialResponse(response) {
//   console.log(response.credential);
//   const responsePayload = decodeJwtResponse(response.credential);
//   console.log("ID: " + responsePayload.sub);
//   console.log("Full Name: " + responsePayload.name);
//   console.log("Given Name: " + responsePayload.given_name);
//   console.log("Family Name: " + responsePayload.family_name);
//   console.log("Image URL: " + responsePayload.picture);
//   console.log("Email: " + responsePayload.email);
// }

/**
 * Sample JavaScript code for youtube.liveBroadcasts.insert
 * See instructions for running APIs Explorer code samples locally:
 * https://developers.google.com/explorer-help/code-samples#javascript
 */

function authenticate() {
  return gapi.auth2
    .getAuthInstance()
    .signIn({
      scope: "https://www.googleapis.com/auth/youtube.force-ssl",
      plugin_name:'Youbified'
    })
    .then(
      function () {
        alert("Sign-in successful");
      }
    //   function (err) {
    //     alert("Error signing in", err.message);
    //   }
    );
}

function loadClient() {
  gapi.client.setApiKey("AIzaSyDh5GjniJociXMPX2C8cghEwd0wejtQYJc");
  return gapi.client
    .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(
      function () {
        console.log("GAPI client loaded for API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.youtube.liveBroadcasts
    .insert({
      resource: {},
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}
gapi.load("client:auth2", function () {
  gapi.auth2.init({
    client_id:
      "542407401873-ibaetrs6gh4cu749u7hvg2vagr238psh.apps.googleusercontent.com",
  });
});
