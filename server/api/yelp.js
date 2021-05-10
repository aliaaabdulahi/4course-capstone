const router = require("express").Router();
const yelp = require("yelp-fusion");
const { apiKey } = require("../../secret.js");

module.exports = router;

const client = yelp.client(apiKey);

router.post("/:lat/:long", async (req, res, next) => {
  console.log("Second Route Reached");
  console.log("req.body is", req.body);
  const searchRequest = {
    term: req.body.cuisine,
    latitude: req.params.lat,
    longitude: req.params.long,
    limit: 30,
  };
  client
    .search(searchRequest)
    .then((response) => {
      const results = response.jsonBody.businesses;
      const prettyJson = JSON.stringify(results, null, 4);
      res.send(prettyJson);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.get("/:lat/:long", async (req, res, next) => {
  console.log("First Route Reached");
  const searchRequest = {
    term: "bars",
    latitude: req.params.lat,
    longitude: req.params.long,
    limit: 30,
  };
  client
    .search(searchRequest)
    .then((response) => {
      const results = response.jsonBody.businesses;
      const prettyJson = JSON.stringify(results, null, 4);
      res.send(prettyJson);
    })
    .catch((e) => {
      console.log(e);
    });
});

/*
Blockers: 

-Number of search results [x]
-Restaurants and Nightlife?? []
-Have to wait for the coordinates to load at first []
-Move the markers on the map to represent new geolocation[]
-Search restaurant by name []

*/
