$( document ).ready(function() {
    console.log("ready!");
});

// Inital array of tropical theme topics
var tropicTitle = ["Palms", "Tropics", "Macaws", "Monkeys", "Amazonia", "Bananas", "Rainforest"];
var currentGif; 
var pausedGif; 
var animatedGif; 
var stillGif;


// Creates theme or topic buttons from current array
function createButtons(){
	$('#tropicButtons').empty();
	for(var i = 0; i < tropicTitle.length; i++){
		var showBtn = $('<button>').text(tropicTitle[i]).addClass('showBtn').attr({'data-name': tropicTitle[i]});
		$('#tropicButtons').append(showBtn);
	}

	// Displays gifs on tropicTitle button click event
	$('.showBtn').on('click', function(){
		$('.display').empty();

        var thisTheme = $(this).data('name');
        // api call limited to 10 returns and a rating of y
		var giphyURL = "https://api.giphy.com/v1/gifs/search?&q=" + thisTheme + "&api_key=gEngaE1q51U3TQe1gnAPECsj3z8zLMqJ&limit=10&rating=g";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif = value.images.original.url;
				pausedGif = value.images.original_still.url;
                var thisRating = value.rating;
                
				// gifs with blank ratings will get 'unrated' text
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+ thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}


// Animates and pauses gif on hover
$(document).on('mouseover','.playOnHover', function(){
    $(this).attr('src', $(this).data('animated'));
    });
    $(document).on('mouseleave','.playOnHover', function(){
    $(this).attr('src', $(this).data('paused'));
});

// Creates a button from value that user inputs - will create a new theme button as well
$('#addTheme').on('click', function(){
    var newTheme = $('#newThemeInput').val().trim();
    tropicTitle.push(newTheme);
    createButtons();
    return false;
});

createButtons();
