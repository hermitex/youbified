// const baseUrl = "http://localhost:3001";
const baseUrl = "https://youbified.herokuapp.com";

const createNewLiveStreamBtn = document.querySelector("#createNewLiveStream");
const viewAllLiveStreamsBtn = document.querySelector("#viewAllLiveStreams");
const streamList = document.querySelector("#stream-list");

/**
 * @createNewLiveStream
 * Creates a new live stream
 * Returns a promise that is resolved when the stream is created successfully
 * The successfully resolved promise is an object with information about the live stream
 */
const createNewLiveStream = () => {
  fetch(`${baseUrl}/create`)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

/**
 * @viewAllLiveStreams
 * Returns a promise that is resolved when the list of streams is returned successfully
 * The successfully resolved promise is an object with a list of streams
 */
const viewAllLiveStreams = () => {
  streamList.innerHTML = "";
  fetch(`${baseUrl}/streams`)
    .then((response) => response.json())
    .then((response) => {
      response.docs.forEach((stream) => {
        streamList.innerHTML += `
        <tr>
        <td> <input type="checkbox" class="cotrol active" name="stream" value="${
          stream.id
        }" /></td>
        <td>${Date(stream.creation_time).split(" ").splice(1, 3).join(" ")}</td>
        <td><input type="text" value="${stream.playback.embed_url}"></td>       
        <td>${stream.broadcasting_status}</td>
       
        <td>
        <button type="button" class="btn btn-info" onclick="attendStream(streamList.checked)">Attend</button>
        </td>
        <td>
        <button type="button" class="btn btn-danger" onclick="deleteStream(streamList.checked)">Delete</button>
        </td>
       
        </tr>
        `;
      });
    })
    .catch((err) => console.error(err));
};

viewAllLiveStreams();

const getLiveStremById = (id) => {
  fetch(`${baseUrl}/streams/${id}`)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

const upDateLiveStremById = (id) => {
  fetch(`${baseUrl}/streams/${id}`)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

const deleteLiveStremById = (id) => {
  fetch(`${baseUrl}/streams/${id}`)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

createNewLiveStreamBtn.addEventListener("click", createNewLiveStream);
viewAllLiveStreamsBtn.addEventListener("click", viewAllLiveStreams);
