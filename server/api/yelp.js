const router = require("express").Router();
const yelp = require("yelp-fusion");
const { apiKey } = require("../../secret.js");

module.exports = router;

const client = yelp.client(apiKey);

router.get("/:lat/:long", async (req, res, next) => {
  const searchRequest = {
    term: "restaurants",
    latitude: req.params.lat,
    longitude: req.params.long,
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

//
//imageUrl
//Url
//coordinates Lat
//coordinates Long
//is_closed
//name
//categories.title
//location
//phone
