var topics = ['Aziz Ansari', 'Carol Burnett', 'Bill Burr', 'George Carlin', 'Dave Chappelle', 'Janeane Garofalo', 'Sam Kinison', 'Steve Martin', 'Eddie Murphy', 'Chris Rock', 'Jon Stewart', 'Robin Williams', 'Ali Wong']

// create buttons
function createButtons() {
    $('#buttonSpace').empty();
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $('<button>');
        newBtn.addClass;
        newBtn.attr('data-name', topics[i]);
        newBtn.text(topics[i]);
        $('#buttonSpace').append(newBtn);
    }
}
// add another comedian button
$("#add-comic").on("click", function (event) {
    event.preventDefault();
    var comic = $("#input").val().trim();
    topics.push(comic);
    createButtons();
    getGifs();
});
// update page
createButtons();
getGifs();

function getGifs() {
    var apiKey = ;
    $("button").on("click", function () {
        var comedian = $(this).attr("data-name");
        var gifRequest = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + comedian + "&limit=10";
        console.log(gifRequest);
        $.ajax({
            url: gifRequest,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        var title = results[i].title;
                        title = title.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                            return letter.toUpperCase();
                        });
                        console.log(title);
                        var gifDiv = $("<div class='item'>");
                        var rating = results[i].rating;
                        var p = $("<p>").html("<br>" + title + " - Rating: " + rating);
                        var newImg = $("<img>");
                        newImg.attr("src", results[i].images.fixed_height_still.url);
                        newImg.attr("data-still", results[i].images.fixed_height_still.url);
                        newImg.attr("data-animate", results[i].images.fixed_height.url);
                        newImg.attr("data-state", "still");
                        newImg.addClass("gif");
                        gifDiv.append(p);
                        gifDiv.append(newImg);
                        $("#displayArea").prepend(gifDiv);
                    }
                }

                $(".gif").on("click", function () {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });


    });
}