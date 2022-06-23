const baseUrl = "http://localhost:3001";

const createNewLiveStreamBtn = document.querySelector("#createNewLiveStream");
const viewAllLiveStreamsBtn = document.querySelector("#viewAllLiveStreams");

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
  fetch(`${baseUrl}/streams`)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

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
