const router = require("express").Router();
const yelp = require("yelp-fusion");
const { apiKey } = require("../../secret.js");

module.exports = router;

const searchRequest = {
  term: "restaurants",
  latitude: 40.779014,
  longitude: -73.945238,
};

const client = yelp.client(apiKey);

router.get("/", async (req, res, next) => {
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
