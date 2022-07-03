A week a go, I set out on a journey to develop a web application that can help users manage livestreams. The application should allow the user to:

1. `Create` new livestream
1. `Fetch` livestream events
1. `Delete` livestream events
1. `Update` livestream events

Now, that definetely rings a bell, right? Oh yeah CRUD!

## Preparation

Since I did not want to build everything from scratch, I mean I still love sleeping, I did a deep and wide internet search (joking) for an API to kickstart my progress.

> API - An application programming interface, or API, enables companies to open up their applications' data and functionality to external third-party developers, business partners, and internal departments within their companies. This allows services and products to communicate with each other and leverage each other's data and functionality - IBM

The first place I landed is Google's Youtube Data API V3. I said, "YAAHS! This must be it!"

So I quickly unbound my programming tools, dusted them clean and off I started to gradually bite into the API internals.

## Did I succeed with the Youtube Data API V3?

Oh no! I did not! After 2 years, I mean 2 days of grinding the API Docs, I still could not be able to come up with an MVP. To say the least, the Docs are loaded with info each refering to another doc and then to another, to another, to another. On top of that, the API has some parts depricated. This was quite annoying especially with the Google Sign In and Authentication where you meet the dreaded gapi and gsi, at least in my opinion. If you are lucky to authenticate, you have to again load the client before being taken to the table of bounties, the Livestreaming itself. Well, I honestly read alot about the API but I couldn't just implement what was in the docs. Perhaps I need to re-sharpen my doc munching skills or it may be the case that the API is archaic and just poorly documented. Overall, it was a humbling experience.

## Do we give up?

No! I love sleeping but no we can't just give up at a first blow to the nose-bridge from a random stranger... I mean we can take a nap once in every few minutes but we have to reach our destiny.

## Help comes

Then when I was just about to wrap my tools for another long and undisturbed slumber, I stumbled upon LiveStream API!

Now, I can't claim that they have the best LiveStream API ever but their documentation is honey... I mean it is suprisingly clear, succint and well, easy to bite and chew.

## Execution

After my attempts to use the api on the front end failed, I decided to add NodeJS to appease the Lords and gods of programming.

## What I need?

Well, all I needed is to install axios, express, bordy-parser well let me just show how my project structure and then we can have a look at my package.json.

## Project structure

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/75ca0z0noexm2v4rbkw5.png)
Honestly, this is is not the best structure but it served the purpose. I am still working on that. You can share some tips on what you think is a good way to structure your project in the comments.

## Package.json

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xxtt89avaoy9ukzuwku0.png)
Ahaha I thought the list was longer than this but yeah... It seems LiveStream API is quite economical. It is a nice way to greet a great sleeper like me.

## Ahaha what is my backend like?

Well, as I menstioned before, I did not build everything from scratch. After importing the basic stuff as follows in my index.js file:

```js
const express = require("express");
const axios = require("axios").default;
const bodyParser = require("body-parser");
const path = require("path");
```

I started to create the main endpoints:

1. This endpoint should fetch and display the index.html. It is the only html file in the entire app.

```js
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});
```

2. This endpoint should create a new stream event and return an Object containing all the info about the livestream

```js
// Create a livestream
app.get("/create", (req, res) => {
  const options = {
    method: "POST",
    url: "https://api.liveapi.com/live_streams",
    headers: {
      Accept: "application/json",
      Authorization:{
        username: YOUR,
        password: YOUR
      }
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
```

3. This endpoint returns an array of objects containing all created streams.

```js
app.get("/streams", (req, res) => {
  const options = {
    method: "GET",

    url: "https://api.liveapi.com/live_streams",

    headers: {
      Accept: "application/json",
      Authorization:{
        username: YOUR,
        password: YOUR
      }
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

```

4. This endpoint returns an API whose `id` has been provided.

```js
app.get("/streams/:id", (req, res) => {
  let id = req.params.id;
  const options = {
    method: "GET",

    url: `https://api.liveapi.com/live_streams/${id}`,

    headers: {
      Accept: "application/json",
       Authorization:{
        username: YOUR,
        password: YOUR
      }
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

```

5. This endpoint allows the use to update an existing stream whose id has been provided.

```js
app.patch("/streams/:id", (req, res) => {
  let id = req.params.id;
  const options = {
    method: "PATCH",
    url: `https://api.liveapi.com/live_streams/${id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
       Accept: "application/json",
       Authorization:{
        username: YOUR,
        password: YOUR
      }
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
```

6. This endpoint deletes a stream whose id has been provided.

```js
app.delete("/streams/:id", (req, res) => {
  let id = req.params.id;
  const options = {
    method: "DELETE",
    url: `https://api.liveapi.com/live_streams/${id}`,
    headers: {
      Accept: "application/json",
       Authorization:{
        username: YOUR,
        password: YOUR
      }
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
```

Well I almost forgot to start the server...

``` js

app.listen(port, () => {
  console.log(`Server listeining at port ${port}`);
});
```

Done! By the grace of the programming gods, the backend should work nicely.

## Frontend

The app.js file basically makes `fetch` calls to the above endpoints. It then disassembles the data objects and injects the data to appropriate pieces of it to the to the index.html file.

## Landing Page Screenshot

![Youbified Home page](https://github.com/dev-to-uploads.s3.amazonaws.com/uploads/articles/)

## LiveStream Page Screenshot

![Youbified Home page](https://github.com/dev-to-uploads.s3.amazonaws.com/uploads/articles/)

## Github Repository

[Find the repo here](https://github.com/hermitex/youbified.git)

## Live Demo on Youtube

[You can see the live demo on Youtube](https://youtu.be/3Jqf2TfmNEE)

Sorry for the background no]ise... kids.

## Live Link

- Click this [link](https://youbified.herokuapp.com/) to view the live application.