var sports=["Hockey","Basketball","Baseball", "Soccer","Football"];

function displayGiphy(){
	$("#giphy").empty();
	var sport= $(this).attr("data-name");
	console.log(sport);
	var queryURL= "https://api.giphy.com/v1/gifs/search?q="+sport+"&api_key=b78326db36a84c5c8fba95bd52d52e50&limit=15";
	$.ajax({
		url: queryURL,
		type: "GET",
	})
	.done(function(response){
		var results=response.data;
		console.log(response);
			for (var j =0; j<results.length; j++){
				var sportDiv= $("<div class=modify>");
				$("#giphy").append(sportDiv);
				var rating= results[j].rating;
				var displayRating=$("<p>").text("Rated:"+ rating);
				sportDiv.append(displayRating);
				var poster= results[j].images.downsized_still.url;
				var posterAnimate= results[j].images.preview_gif.url;
				var displayPoster= $("<img>");
				displayPoster.attr("src", poster);
				var posterStill= results[j].images.downsized_still.url;
				displayPoster.attr("data-state", "still");
				displayPoster.attr("data-animate", posterAnimate);
				displayPoster.attr("data-still", posterStill);
				sportDiv.append(displayPoster);
				displayPoster.on("click", function() {
	      			var state = $(this).attr("data-state");			
      				if (state === "still") {
        				var animateURL=$(this).attr("data-animate")
        				$(this).attr("src", animateURL);
        				console.log(animateURL);
        				$(this).attr("data-state", "animate");
     				 } 
     				else {
        				var stillURL=$(this).attr("data-still")
        				$(this).attr("src", stillURL);
        				$(this).attr("data-state", "still");
     				 }
	    		});
			}
		
	});
}
function buttonGen(){
	$("#array").empty();
	
	for (var i=0; i<sports.length; i++){
		var button= $("<button>");
		button.addClass("sport");
		button.attr("data-name", sports[i]);
		button.text(sports[i]);
		$("#array").append(button);
		console.log(sports[i]);
	}
}
$("#add-sport").on("click", function(event){
	event.preventDefault();
	var sport= $("#sport-input").val().trim();
	sports.push(sport);
	buttonGen();
});
$(document).on("click", ".sport", displayGiphy);
buttonGen();
