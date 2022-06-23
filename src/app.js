// const baseUrl = "http://localhost:3001";
const baseUrl = "https://youbified.herokuapp.com";

const createNewLiveStreamBtn = document.querySelector(
  "#create-new-live-stream"
);
const viewAllLiveStreamsBtn = document.querySelector("#view-all-live-streams");
const streamList = document.querySelector("#stream-list");
const deleteStreamBtn = document.querySelector("#delete-stream");

const inputDateCreated = document.querySelector("#input-date-created");
const inputLiveStreamLink = document.querySelector("#input-live-stream-link");
const inputServerLink = document.querySelector("#input-server-link");
const inputServerKey = document.querySelector("#input-server-key");
const inputBroadcastStatus = document.querySelector("#input-broadcast-status");

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
        let tr = document.createElement("tr");
        tr.id = stream._id;
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn");
        deleteBtn.classList.add("btn-danger");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", deleteStream);
        let attendBtn = document.createElement("button");
        attendBtn.classList.add("btn");
        attendBtn.classList.add("btn-info");
        attendBtn.textContent = "Attend";
        attendBtn.addEventListener("click", attendEvent);

        let deleteBtnTd = document.createElement("td");
        let attendBtnTd = document.createElement("td");

        deleteBtnTd.appendChild(deleteBtn);
        attendBtnTd.appendChild(attendBtn);

        let selectTd = document.createElement("td");
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.addEventListener("change", handlecheckEvent);
        selectTd.appendChild(checkbox);

        let dateTd = document.createElement("td");
        dateTd.textContent = formatDate(stream.creation_time);

        let input = document.createElement("input");
        input.addEventListener("click", copyLink);
        input.type = "text";
        input.value = stream.playback.embed_url;
        input.readOnly = true;
        let linkTd = document.createElement("td");
        linkTd.appendChild(input);

        let statusTd = document.createElement("td");
        statusTd.textContent = stream.broadcasting_status;

        tr.appendChild(selectTd);
        tr.appendChild(dateTd);
        tr.appendChild(linkTd);
        tr.appendChild(statusTd);
        tr.appendChild(attendBtnTd);
        tr.appendChild(deleteBtnTd);

        streamList.appendChild(tr);
      });
    })
    .catch((err) => console.error(err));
};

// viewAllLiveStreams();

const formatDate = (stream) => {
  if (
    Date().split(" ").splice(1, 3).join(" ") ===
    Date(stream.creation_time).split(" ").splice(1, 3).join(" ")
  ) {
    return "Today";
  }
  return Date(stream.creation_time).split(" ").splice(1, 3).join(" ");
};

const getLiveStremById = async (id) => {
  let response = await fetch(`${baseUrl}/streams/${id}`);
  try {
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const upDateLiveStremById = (id) => {
  fetch(`${baseUrl}/streams/${id}`)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

const deleteLiveStremById = async (id) => {
  try {
    let response = await fetch(`${baseUrl}/streams/${id}`);
    let data = response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const deleteStream = (stream) => {
  if (`Are you sure you want to delete all live streams?`) {
    let isSuccess = deleteLiveStremById(
      stream.target.parentNode.parentNode.id
    ).then((response) => response.json());
    alert(isSuccess);
    if (isSuccess) {
      alert("Stream deleted successfully");
    } else {
      alert("Problem deleting stream: " + stream.target.parentNode.id);
    }
  }
};

const attendEvent = (stream) => {
  console.log(getLiveStremById(stream.target.parentNode.parentNode.id));
};

const copyLink = (stream) => {
  let link = stream.target.value;
  navigator.clipboard.writeText(link).then(
    function () {
      alert("Copying to clipboard was successful!");
    },
    function (err) {
      alert("Could not copy link: ", err);
    }
  );
};

const displayStreamDetails = (stream) => {
  document.getElementById("displayStreamDetailsForm").reset();
  setTimeout(() => {
    inputDateCreated.value = formatDate(stream.creation_time);
    inputLiveStreamLink.value = stream.playback.embed_url;
    inputServerLink.value = stream.ingest.server;
    inputServerKey.value = stream.ingest.key;
    inputBroadcastStatus.value = stream.broadcasting_status;
  }, 350);
};

const handlecheckEvent = async (event) => {
  if (event.target.checked) {
    let id = event.target.parentNode.parentNode.id;
    let stream = await getLiveStremById(id).then((response) => response);
    displayStreamDetails(stream);
  }
};

createNewLiveStreamBtn.addEventListener("click", createNewLiveStream);
viewAllLiveStreamsBtn.addEventListener("click", viewAllLiveStreams);
