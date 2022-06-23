const decodeJwtResponse = (credentials) => {
  var base64Url = credentials.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
let responsePayload;
function handleCredentialResponse(response) {
  responsePayload = decodeJwtResponse(response.credential);
  console.log("ID: " + responsePayload.sub);
  console.log("Full Name: " + responsePayload.name);
  console.log("Given Name: " + responsePayload.given_name);
  console.log("Family Name: " + responsePayload.family_name);
  console.log("Image URL: " + responsePayload.picture);
  console.log("Email: " + responsePayload.email);
}

function loadClient() {
  gapi.client.setApiKey("AIzaSyC4sIqO6MbIkFTzWdjDr-4ulv4DpVydH7s");
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

function execute() {
  gapi.client.load("plus", "v1", function () {
    var request = gapi.client.plus.people.get({
      userId: "AIzaSyC4sIqO6MbIkFTzWdjDr-4ulv4DpVydH7s",
    });

    request.execute(function (response) {
      console.log("Here ", response);
    });
  });
}
