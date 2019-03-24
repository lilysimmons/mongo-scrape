// var Article = require("../models/Article")
// var axios = require("axios")
// var cheerio = require("cheerio")
// // var db = require("./models")

// module.exports = function(app) {
    
//     app.get("/scrape", function(req, res) {
//     //   res.render("scrape", { layout: "main" });
//       console.log("Hello");

// // Routes

// // app.get("/scrape", function(req, res) {
//     // First, we grab the body of the html with axios
//     axios.get("https://www.theonion.com/").then(function(response) {
//       // Then, we load that into cheerio and save it to $ for a shorthand selector
//       var $ = cheerio.load(response.data);
  
//       // Now, we grab every headline title within an article tag, and do the following:
//       $("article").each(function(i, element) {
//         // .js_post-list .hfeed
//         // Save an empty result object
//         console.log("Hi")
        
        
//         var result = {};
//         var title = $(element).children("header").children("h1.headline").children("a").text()

//         var link = $(element).children("header").children("h1.headline").children("a").attr("href")

//         var summary = $(element).children(".item__content").children(".excerpt").children("p").text()
  
//         console.log("this is the result: " + result)
//         console.log("this is the title: "  + title)
//         console.log("this is the link: " + link)
//         console.log("this is the summary: " + summary)
  
//         result.title = title
//         result.link =link
//         result.summary =summary 
        
//         console.log(result)
//         // let newArticle = new Article(result)

//         // newArticle.save().then(()=>{
//         //     console.log('Saved!')
//         // })
//         // .catch(err=>{
//         //   console.log(err)
//         // })
//         //Create a new Article using the `result` object built from scraping
        
        
        
//         // Article.create(result)
//         //   .then(function(dbArticle) {
//         //     // View the added result in the console
//         //    res.render("index");
//         //   })
//         //   .catch(function(err) {
//         //     // If an error occurred, log it
//         //     console.log(err);
//         //   });
//       });
  
//       // Send a message to the client
//       res.send("Scrape Complete");
//     });
// //   });

//     });


//     }