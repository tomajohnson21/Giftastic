var buttons = [];

function renderButtons() {

    if(buttons.length === 0){
        $("#button-container").hide()
    } else

    $("#buttons-view").empty(); 

    for (var i = 0; i < buttons.length; i++) {

        var newButton = $("<button>");
        
        newButton.addClass("btn btn-primary gif-button");
        
        newButton.attr({"data-name": buttons[i], "data-number": i + 1});
        
        newButton.text(buttons[i]);

        $("#buttons-view").append(newButton);
    }
}

$(document).on("click", ".gif-button", function() {

    var gifQuery = $(this).attr("data-name");
    var limit = $("#limit-select").val();
    var APIKey = "F4AXTpFDRkN69Uak0hQ3SZhEvy4XNcpm";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      gifQuery + "&api_key=" + APIKey + "&limit=" + limit;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        $("#gif-view").empty();
        $("#gif-container").show();
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");
          
          gifDiv.addClass("gif");

          var rating = results[i].rating;

          rating = rating.toUpperCase();

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
    var label = $("#user-input").val().trim();
    buttons.push(label);
    renderButtons();

    if(buttons.length > 0){
        $("#button-container").show();
    }
});

$("#gif-container").hide();
renderButtons();