var topics = ["Tired", "Excited", "Happy", "Sleepy"];

// Function for adding the JSON content for each button into the div
function displayEmotionGif() {

  var emotion = $(this).attr("data");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&limit=10&apikey=BbN6iUvg9LPXnhDYL3vkdE27Dt6fOLn4";
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
      $("#emotion-gifs").empty();
      console.log(response);
      
      var results = response.data;
      console.log("results", results);

    for (var i = 0; i<10; i++) {

      // this is to get the pause to work 
      var image = $("<img>");
      console.log("this is image: ", image);
      image.attr("src", results[i].images.fixed_height.url);
      image.attr("data-still", results[i].images.fixed_height_still.url);
      image.attr("data-animate", results[i].images.fixed_height.url);
      image.attr("data-still","data-animate");
      
      var rating = results[i].rating;

      // Creating a paragraph tag with the result item's rating
      var ratingView = $("<h2>").text("rating: " + rating);

      $("#emotion-gifs").append(image, ratingView);
    }
  });
}

// Original buttons on screen 
// Function for displaying emotion data
function renderButtons() {
  // Deleting the buttons prior to adding new topics
  $("#buttons-view").empty();
  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {

    // Button for each emotion in the array
    var emotionButtons = $("<button>");
    // Adding a class of emotion to our button
    emotionButtons.addClass("emotion");
    // Adding a data-attribute and the loop
    emotionButtons.attr("data", topics[i]);
    // Button text
    emotionButtons.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(emotionButtons);
  }
}

// This is to add a new button
$("#add-emotion").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var emotion = $("#emotion-input").val().trim();

  // Adding the emotion from the textbox to our array
  topics.push(emotion);
  console.log(topics)

  renderButtons();
});

// Function for displaying the emotion info
$(document).on("click", ".emotion", displayEmotionGif);

// Calling the renderButtons function to display the intial buttons
renderButtons();


// // Click to pause and start
// // toggle jquery method 
// $(".gif").on("click", function() {
//   var state = $(this).attr("data-state");
//   // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//   // Then, set the image's data-state to animate
//   // Else set src to the data-still value
//   if (state === "still") {
//     $(this).attr("src", $(this).attr("data-animate"));
//     $(this).attr("data-state", "animate");
//   } else {
//     $(this).attr("src", $(this).attr("data-still"));
//     $(this).attr("data-state", "still");
//   }
// }); 
