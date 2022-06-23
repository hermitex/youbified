const express = require("express");
const axios = require("axios").default;
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(bodyParser.json());

// enable CORS without external module
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Create a livestream
app.get("/create", (req, res) => {
  const options = {
    method: "POST",
    url: "https://api.liveapi.com/live_streams",
    headers: {
      Accept: "application/json",
      Authorization:
        "Basic aGQxZ25OU2JkNzVnOmQ5M0ZEN3dTeEkzcjc5SnNtblQ3SWltRnllOUFERkw3a0FuNQ==",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      let data = response.data;
      res.send(data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("/streams", (req, res) => {
  const options = {
    method: "GET",

    url: "https://api.liveapi.com/live_streams",

    headers: {
      Accept: "application/json",

      Authorization:
        "Basic aGQxZ25OU2JkNzVnOmQ5M0ZEN3dTeEkzcjc5SnNtblQ3SWltRnllOUFERkw3a0FuNQ==",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("/streams/:id", (req, res) => {
  let id = req.params.id;
  const options = {
    method: "GET",

    url: `https://api.liveapi.com/live_streams/${id}`,

    headers: {
      Accept: "application/json",

      Authorization:
        "Basic aGQxZ25OU2JkNzVnOmQ5M0ZEN3dTeEkzcjc5SnNtblQ3SWltRnllOUFERkw3a0FuNQ==",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.patch("/streams/:id", (req, res) => {
  let id = req.params.id;
  const options = {
    method: "PATCH",

    url: `https://api.liveapi.com/live_streams/${id}`,

    headers: {
      Accept: "application/json",

      "Content-Type": "application/json",

      Authorization:
        "Basic aGQxZ25OU2JkNzVnOmQ5M0ZEN3dTeEkzcjc5SnNtblQ3SWltRnllOUFERkw3a0FuNQ==",
    },

    data: { enabled: true },
  };

  axios
    .request(options)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.delete("/streams/:id", (req, res) => {
  let id = req.params.id;
  const options = {
    method: "DELETE",

    url: `https://api.liveapi.com/live_streams/${id}`,

    headers: {
      Accept: "application/json",

      Authorization:
        "Basic aGQxZ25OU2JkNzVnOmQ5M0ZEN3dTeEkzcjc5SnNtblQ3SWltRnllOUFERkw3a0FuNQ==",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(port, () => {
  console.log(`Server listeining at port ${port}`);
});
