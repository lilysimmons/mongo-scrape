

$("#scrapeButton").on("click", function() {
    $.ajax({
      method: "GET",
      url: "/scrape",
    })
    .then (function(data) {
      window.location="/";
    })
  });


//Whenever someone clicks a leave comment button
$(document).on("click", ".leaveComment", function() {
    // Empty the notes from the note section
    console.log("leave comment clicked")
    // $("#messageForm").show();
    // $("#noteSection").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#noteSection").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#noteSection").append("<input id='titleinput' name='title'>");
        // A textarea to add a new note body
        $("#noteSection").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#noteSection").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
       // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
          
        }
      });
  });


// //  // Whenever someone clicks a save article button
// $(document).on("click", ".saveArticle", function() {
//     // Empty the notes from the note section
//     console.log("save article clicked")
//     // $("#messageForm").show();
//     // $("#noteSection").empty();
//     // Save the id from the p tag
//     var thisId = $(this).attr("data-id");
//     console.log(thisId)
//     // Now make an ajax call for the Article
//     $.ajax({
//       method: "POST",
//       url: "/articles/" + thisId,
  
//     })
//       // With that done, add the note information to the page
//       .then(function(data) {
//         console.log(data);
        
//       })
//     })
      
 
  
// Clear button
$("#clearButton").on("click", function () {
  $.ajax({
    method: "DELETE",
    url: "/articles",
  })
    .then(function () {
      window.location = "/";
    })
});
   
  
  
  //When you click the savenote button
$(document).on("click", "#savenote", function() {
  
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#noteSection").empty();
      });
  
});
    

