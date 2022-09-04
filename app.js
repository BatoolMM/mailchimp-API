const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

//use express
const app = express();
app.use(express.static("public"))

//use bodyParser
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})


app.post("/", function(req, res) {
  const firstName = req.body.fname
  const lastName = req.body.lname
  const email = req.body.email

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const jasonData = JSON.stringify(data);
  const url = "https://us6.api.mailchimp.com/3.0/lists/2cff70da6e";
  const options = {
    method: "POST",
    auth: "batool1:c9c1c32c7e0636d7ba937c88bf9da8ab-us6"
  }
  const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
      console.log(JSON.parse(data))
    })
  });

  request.write(jasonData);
  request.end()

  if (res.statusCode === 200) {
    res.sendFile(__dirname + "/failure.html")
  } else {
    res.sendFile(__dirname + "/success.html")
  }

})

app.post("/failure.html", function(req, res) {
  res.redirect("/")
})

app.listen(3000, function() {
  console.log("The server is running on Port 3000");
})


// API: e34e9202d18544262f23e9323c309d6b-us6
//
// List id : 2cff70da6e
