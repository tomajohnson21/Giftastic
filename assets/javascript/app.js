var buttons = [];
function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < buttons.length; i++) {

        var newButton = $("<button>");
        
        newButton.addClass("gif-button");
        
        newButton.attr({"data-name": buttons[i], "data-number": i + 1});
        
        newButton.text(buttons[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(newButton);
    }
}

$(document).on("click", ".gif-button", function() {
    var gifQuery = $(this).attr("data-name");
    var APIKey = "F4AXTpFDRkN69Uak0hQ3SZhEvy4XNcpm";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      gifQuery + "&api_key=" + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var ratingHTML = $("<p>").text("Rating: " + rating);

          var gif = $("<img>");
          gif.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(ratingHTML);
          gifDiv.prepend(gif);

          $("#gif-view").prepend(gifDiv);
        }
    });
});

$("#add-category").on("click", function(event) {
    
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var label = $("#user-input").val().trim();

    // The movie from the textbox is then added to our array
    buttons.push(label);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

  });