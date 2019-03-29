// Dependencies
var Note = require("./models/Note");
var Article = require("./models/Article");
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");




// Initialize Express
var app = express();

app.use(express.static("public"));

var PORT = process.env.PORT || 8000;

mongoose.connect("mongodb://localhost/article", { useNewUrlParser: true });

// Use express with the app
app.use(express.urlencoded({
  extended: false
}));



// Initialize Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/article";

mongoose.connect(MONGODB_URI).catch(err => {
  console.log(JSON.stringify(err))

})


// Routes

app.get("/scrape", function (req, res) {

  console.log("Hello");

  axios.get("https://loudwire.com/").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every headline title within an article tag, and do the following:
    $("article").each(function (i, element) {
      var result = {};
      var title = $(element).children("div").children("a").attr("title")
      var link = $(element).children("div").children("a").attr("href")
      var summary = $(element).children("div").children("div.excerpt").html()


      result.title = title
      result.link = link
      result.summary = summary

      console.log(result)
      let newArticle = new Article(result)

      newArticle.save().then(() => {
        console.log('Saved!')
      })
        .catch(err => {
          console.log(err)
        })

    });

    // Send a message to the client
    res.send("Scrape Complete");

  });


});

app.get("/", function (req, res) {

  Article.find({})
    .then(function (results) {


      var articleObject = {
        article: results
      }

      res.render("index", articleObject);

    })
    .catch(function (err) {
      res.json(err);
    });
});



//shows articles as json and show a note id if there is a note
app.get("/articles", function (req, res) {

  Article.find({})
    .then(function (results) {
      console.log(results);

      res.json(results);

    })
    .catch(function (err) {
      res.json(err);
    });
});

//shows all notes as json
app.get("/notes", function (req, res) {

  Note.find({})
    .then(function (results) {
      console.log(results);

      res.json(results);

    })
    .catch(function (err) {
      res.json(err);
    });
});


// Route to clear the articles
app.delete("/articles", function (req, res) {
  Article.remove({})
    .then(function () {
      console.log("Deleted articles");
      window.location = "/";
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});


app.get("/articles/:id", function (req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function (results) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(results);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});



// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function (req, res) {
  // Create a new note and pass the req.body to the entry
  Note.create(req.body)
    .then(function (newNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return Article.findOneAndUpdate({ _id: req.params.id }, { note: newNote._id }, { new: true });
    })
    .then(function (results) {
      // If we were able to successfully update an Article, send it back to the client

      res.json(results);
    })

    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});


app.get("/articles/:id"), function (req, res) {
  Note.find({ _Id: req.params.id }).then(function (savedNote) {
    res.json(savedNote);
  })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
}


// Listen on port 8000

app.listen(PORT, function () {
  console.log("App running on port 8000!");
});

