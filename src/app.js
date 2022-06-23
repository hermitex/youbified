const decodeJwtResponse=(credentials)=>{
  var base64Url = credentials.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};
let  responsePayload;
function handleCredentialResponse(response) {
  responsePayload = decodeJwtResponse(response.credential);
  console.log("ID: " + responsePayload.sub);
  console.log("Full Name: " + responsePayload.name);
  console.log("Given Name: " + responsePayload.given_name);
  console.log("Family Name: " + responsePayload.family_name);
  console.log("Image URL: " + responsePayload.picture);
  console.log("Email: " + responsePayload.email);
}

function execute() {
  
  gapi.client.load('plus', 'v1', function() {

    var request = gapi.client.plus.people.get({
        'userId': "AIzaSyDh5GjniJociXMPX2C8cghEwd0wejtQYJc"
    });

    request.execute(function(response) {
        console.log(response);   
    });
});
}