const router = require("express").Router();
const yelp = require("yelp-fusion");
const { gmailPass } = require("../../secret.js");
const nodemailer = require("nodemailer");
// const { apiKey } = require("../../secret.js");
let apiKey;
if (process.env.NODE_ENV === "production") {
  apiKey = process.env.yelpKey;
} else {
  const obj = require("../../secret.js");
  apiKey = obj.apiKey;
}

module.exports = router;

//https://api.yelp.com/v3/businesses/search?location=nyc&term=restaurants
//https://api.yelp.com/v3/businesses/search?latitude=40.7425&longitude=-74.0060&term=restaurants
//https://api.yelp.com/v3/businesses/search?latitude=40.7425&longitude=-74.0060&term=restaurants&radius=1000

const client = yelp.client(apiKey);

router.post("/locations", async (req, res, next) => {
  const searchRequest = {
    term: "restaurants",
    location: req.body.location,
    limit: 50,
    radius: 1000,
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
router.post("/pricing/:lat/:long", async (req, res, next) => {
  console.log("third route reached");
  console.log("req.body is", req.body);
  const searchRequest = {
    term: "restaurants",
    latitude: req.params.lat,
    longitude: req.params.long,
    limit: 30,
    radius: 5000,
    price: req.body.price,
  };
  client
    .search(searchRequest)
    .then((response) => {
      const results = response.jsonBody.businesses;
      const prettyJson = JSON.stringify(results, null, 4);
      res.send(prettyJson);
    })
    .catch((e) => {
      ß;
      console.log(e);
    });
});
*/

router.post("/cuisine/:lat/:long", async (req, res, next) => {
  console.log("Second Route Reached");
  console.log("req.body is", req.body);
  const searchRequest = {
    term: req.body.cuisine,
    latitude: req.params.lat,
    longitude: req.params.long,
    limit: 30,
    radius: 1000,
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
    term: "restaurants",
    latitude: req.params.lat,
    longitude: req.params.long,
    limit: 50,
    radius: 1000,
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

// full route is /api/yelp/email

router.post("/email", async (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      requireTLS: true,
      auth: {
        user: "4coursecapstone@gmail.com",
        pass: gmailPass, // defined in secret.js file
      },
    });
    const { toEmails } = req.body;
    toEmails.forEach((toEmail) => {
      const mailOptions = {
        from: "4coursecapstone@gmail.com",
        to: toEmail,
        subject: "You got invited to a 4Course challenge!",
        text: "Hello there! Ezgi is inviting you to join the 4Course challenge. Here is the link: ",
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          throw error;
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });
    res.send(`Email sent to: ${toEmails}`);
  } catch (err) {
    next(err);
  }
});
